using Microsoft.EntityFrameworkCore;
using ImpolarInsight.Models;
using ImpolarInsight.Models.Workflow;
using ImpolarInsight.Models.Workflow.NodeTypes;
using ImpolarInsight.Services;

namespace ImpolarInsight.Data;

public class ImpolarInsightContext : DbContext {

    private readonly IServiceScope serviceScope;
    private readonly IUserService userService;

    public ImpolarInsightContext(
        DbContextOptions<ImpolarInsightContext> options,
        IServiceScopeFactory serviceScopeFactory
    ) : base(options) {
        this.serviceScope = serviceScopeFactory.CreateScope();
        this.userService = this.serviceScope.ServiceProvider.GetRequiredService<IUserService>();
    }

    public DbSet<Project> Projects { get; set; }
    
    // Workflow-related tables
    public DbSet<Workflow> Workflows { get; set; }
    public DbSet<Node> Nodes { get; set; }
    public DbSet<Edge> Edges { get; set; }
    public DbSet<WorkflowExecution> WorkflowExecutions { get; set; }
    public DbSet<NodeExecution> NodeExecutions { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder) {
        // Apply tenant filter to all entity types that inherit from Entity
        foreach (var entityType in modelBuilder.Model.GetEntityTypes()
                 .Where(e => typeof(Entity).IsAssignableFrom(e.ClrType))) {
            var parameter = Expression.Parameter(entityType.ClrType, "e");
            var propertyMethod = typeof(EF).GetMethod(nameof(EF.Property))?.MakeGenericMethod(typeof(string));
            
            if (propertyMethod != null) {
                var tenantProperty = Expression.Call(
                    propertyMethod,
                    Expression.Constant("Tenant"),
                    parameter);
                    
                var tenantFilter = Expression.Lambda(
                    Expression.Equal(
                        tenantProperty,
                        Expression.Constant(userService.Tenant)),
                    parameter);
                    
                modelBuilder.Entity(entityType.ClrType).HasQueryFilter(tenantFilter);
            }
        }
        
        // Configure node type inheritance using TPH
        modelBuilder.Entity<Node>()
            .HasDiscriminator<string>("Type")
            .HasValue<TimeTriggerNode>("TimeTriggerNode")
            .HasValue<DelayNode>("DelayNode")
            .HasValue<HttpRequestNode>("HttpRequestNode");
            
        // Configure relationships
        modelBuilder.Entity<Workflow>()
            .HasMany(w => w.Nodes)
            .WithOne(n => n.Workflow)
            .HasForeignKey(n => n.WorkflowId)
            .OnDelete(DeleteBehavior.Cascade);
            
        modelBuilder.Entity<Workflow>()
            .HasMany(w => w.Edges)
            .WithOne(e => e.Workflow)
            .HasForeignKey(e => e.WorkflowId)
            .OnDelete(DeleteBehavior.Cascade);
            
        modelBuilder.Entity<WorkflowExecution>()
            .HasMany(we => we.NodeExecutions)
            .WithOne(ne => ne.WorkflowExecution)
            .HasForeignKey(ne => ne.WorkflowExecutionId)
            .OnDelete(DeleteBehavior.Cascade);
    }

    public override void Dispose() {
        base.Dispose();
        this.serviceScope.Dispose();

        GC.SuppressFinalize(this);
    }
}