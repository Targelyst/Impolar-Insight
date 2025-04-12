using Microsoft.EntityFrameworkCore;
using ImpolarInsight.Models;
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

    protected override void OnModelCreating(ModelBuilder modelBuilder) {

        modelBuilder.Entity<Project>().HasQueryFilter(e => e.Tenant == userService.Tenant);
    }

    public override void Dispose() {
        base.Dispose();
        this.serviceScope.Dispose();

        GC.SuppressFinalize(this);
    }

}