using Microsoft.EntityFrameworkCore;
using ImpolarInsight.Models;
using ImpolarInsight.Services;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Aufy.EntityFrameworkCore;
using Aufy.Core;

namespace ImpolarInsight.Data;

public class ImpolarInsightContext : IdentityDbContext<User>, IAufyDbContext<User> {

    private readonly IServiceScope serviceScope;
    private readonly IUserService userService;

    public ImpolarInsightContext(
        DbContextOptions<ImpolarInsightContext> options,
        IServiceScopeFactory serviceScopeFactory
    ) : base(options) {
        this.serviceScope = serviceScopeFactory.CreateScope();
        this.userService = this.serviceScope.ServiceProvider.GetRequiredService<IUserService>();
    }

    // Required for auth
    public DbSet<AufyRefreshToken> RefreshTokens { get; set; } = null!;

    // Feedback management models
    public DbSet<Board> Boards { get; set; } = null!;
    public DbSet<Post> Posts { get; set; } = null!;
    public DbSet<Vote> Votes { get; set; } = null!;
    public DbSet<Roadmap> Roadmaps { get; set; } = null!;
    public DbSet<Comment> Comments { get; set; } = null!;
    public DbSet<PostActivity> PostActivities { get; set; } = null!;
    public DbSet<SiteSettings> SiteSettings { get; set; } = null!;
    public DbSet<Tenant> Tenants { get; set; } = null!;
    public DbSet<RoadmapCollection> RoadmapCollections { get; set; } = null!;

    // New entities
    public DbSet<PostRoadmapHistory> PostRoadmapHistory { get; set; } = null!;
    public DbSet<ChangelogItem> ChangelogItems { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder) {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyAufyModel();

        // Apply tenant filter to all entities derived from Entity
        modelBuilder.Entity<Board>().HasQueryFilter(e => e.Tenant.Domain == userService.TenantDomain);
        modelBuilder.Entity<Post>().HasQueryFilter(e => e.Tenant.Domain == userService.TenantDomain);
        modelBuilder.Entity<Vote>().HasQueryFilter(e => e.Tenant.Domain == userService.TenantDomain);
        modelBuilder.Entity<Roadmap>().HasQueryFilter(e => e.Tenant.Domain == userService.TenantDomain);
        // modelBuilder.Entity<User>().HasQueryFilter(e => e.Tenant.Domain == userService.TenantDomain);
        modelBuilder.Entity<Comment>().HasQueryFilter(e => e.Tenant.Domain == userService.TenantDomain);
        modelBuilder.Entity<PostActivity>().HasQueryFilter(e => e.Tenant.Domain == userService.TenantDomain);
        modelBuilder.Entity<SiteSettings>().HasQueryFilter(e => e.Tenant.Domain == userService.TenantDomain);
        modelBuilder.Entity<Tenant>().HasQueryFilter(e => e.Domain == userService.TenantDomain);
        modelBuilder.Entity<RoadmapCollection>().HasQueryFilter(e => e.Tenant.Domain == userService.TenantDomain);

        // New entities tenant filters
        modelBuilder.Entity<PostRoadmapHistory>().HasQueryFilter(e => e.Tenant.Domain == userService.TenantDomain);
        modelBuilder.Entity<ChangelogItem>().HasQueryFilter(e => e.Tenant.Domain == userService.TenantDomain);

        modelBuilder.Entity<Roadmap>()
            .HasOne(r => r.RoadmapCollection)
            .WithMany(rc => rc.Roadmaps)
            .HasForeignKey(r => r.RoadmapCollectionId)
            .OnDelete(DeleteBehavior.SetNull);

        // Configure Board parent-child relationship
        modelBuilder.Entity<Board>()
            .HasOne(b => b.ParentBoard)
            .WithMany(b => b.SubBoards)
            .HasForeignKey(b => b.ParentBoardId)
            .OnDelete(DeleteBehavior.Restrict);

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

        // Configure PostRoadmapHistory relationships
        modelBuilder.Entity<PostRoadmapHistory>()
            .HasOne(prh => prh.Post)
            .WithMany(p => p.RoadmapHistory)
            .HasForeignKey(prh => prh.PostId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<PostRoadmapHistory>()
            .HasOne(prh => prh.FromRoadmap)
            .WithMany()
            .HasForeignKey(prh => prh.FromRoadmapId)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<PostRoadmapHistory>()
            .HasOne(prh => prh.ToRoadmap)
            .WithMany(r => r.PostHistory)
            .HasForeignKey(prh => prh.ToRoadmapId)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<PostRoadmapHistory>()
            .HasOne(prh => prh.MovedByUser)
            .WithMany()
            .HasForeignKey(prh => prh.MovedByUserId)
            .OnDelete(DeleteBehavior.SetNull);

        // Configure Changelog relationships
        modelBuilder.Entity<ChangelogItem>()
            .HasMany(c => c.RelatedPosts)
            .WithMany(p => p.RelatedChangelogs)
            .UsingEntity(j => j.ToTable("ChangelogItemPost"));
    }

    public override void Dispose() {
        base.Dispose();
        this.serviceScope.Dispose();

        GC.SuppressFinalize(this);
    }
}