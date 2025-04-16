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

    // Feedback management models
    public DbSet<Board> Boards { get; set; }
    public DbSet<Post> Posts { get; set; }
    public DbSet<Vote> Votes { get; set; }
    public DbSet<Roadmap> Roadmaps { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<Comment> Comments { get; set; }
    public DbSet<PostActivity> PostActivities { get; set; }
    public DbSet<SiteSettings> SiteSettings { get; set; }
    public DbSet<Tenant> Tenants { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder) {
        // Apply tenant filter to all entities derived from Entity
        modelBuilder.Entity<Board>().HasQueryFilter(e => e.Tenant.Domain == userService.TenantDomain);
        modelBuilder.Entity<Post>().HasQueryFilter(e => e.Tenant.Domain == userService.TenantDomain);
        modelBuilder.Entity<Vote>().HasQueryFilter(e => e.Tenant.Domain == userService.TenantDomain);
        modelBuilder.Entity<Roadmap>().HasQueryFilter(e => e.Tenant.Domain == userService.TenantDomain);
        modelBuilder.Entity<User>().HasQueryFilter(e => e.Tenant.Domain == userService.TenantDomain);
        modelBuilder.Entity<Comment>().HasQueryFilter(e => e.Tenant.Domain == userService.TenantDomain);
        modelBuilder.Entity<PostActivity>().HasQueryFilter(e => e.Tenant.Domain == userService.TenantDomain);
        modelBuilder.Entity<SiteSettings>().HasQueryFilter(e => e.Tenant.Domain == userService.TenantDomain);
        modelBuilder.Entity<Tenant>().HasQueryFilter(e => e.Domain == userService.TenantDomain);

        // Configure relationships
        modelBuilder.Entity<Post>()
            .HasOne(p => p.Board)
            .WithMany(b => b.Posts)
            .HasForeignKey(p => p.BoardId)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<Post>()
            .HasOne(p => p.Roadmap)
            .WithMany(r => r.Posts)
            .HasForeignKey(p => p.RoadmapId)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<Post>()
            .HasOne(p => p.User)
            .WithMany(u => u.Posts)
            .HasForeignKey(p => p.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Vote>()
            .HasOne(v => v.User)
            .WithMany(u => u.Votes)
            .HasForeignKey(v => v.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Vote>()
            .HasOne(v => v.Post)
            .WithMany(p => p.Votes)
            .HasForeignKey(v => v.PostId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Comment>()
            .HasOne(c => c.Parent)
            .WithMany()
            .HasForeignKey(c => c.ParentId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Comment>()
            .HasOne(c => c.Activity)
            .WithOne(a => a.Comment)
            .HasForeignKey<Comment>(c => c.ActivityId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<PostActivity>()
            .HasOne(pa => pa.Post)
            .WithMany(p => p.Activities)
            .HasForeignKey(pa => pa.PostId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<PostActivity>()
            .HasOne(pa => pa.Author)
            .WithMany()
            .HasForeignKey(pa => pa.AuthorId)
            .OnDelete(DeleteBehavior.Cascade);
    }

    public override void Dispose() {
        base.Dispose();
        this.serviceScope.Dispose();

        GC.SuppressFinalize(this);
    }
}