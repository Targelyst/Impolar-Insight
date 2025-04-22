using Microsoft.EntityFrameworkCore;
using ImpolarInsight.Data;
using ImpolarInsight.Models;
using ImpolarInsight.Services;
using HotChocolate;
using HotChocolate.Authorization;
using System.Security.Cryptography;
using System.Text;

namespace ImpolarInsight.Queries;

// Board Mutations
[ExtendObjectType(OperationTypeNames.Mutation)]
public class BoardMutations
{
    [Authorize(Policy = "admin")]
    public async Task<Board> CreateBoard(
        CreateBoardInput input,
        ImpolarInsightContext db,
        IUserService userService)
    {
        var tenant = await userService.GetTenant();
        
        var board = new Board
        {
            Id = Guid.NewGuid(),
            Name = input.Name,
            Url = input.Url,
            Color = input.Color,
            Display = input.Display,
            ViewVoters = input.ViewVoters,
            TenantId = tenant.Id
        };
        
        db.Boards.Add(board);
        await db.SaveChangesAsync();
        
        return board;
    }
    
    [Authorize(Policy = "admin")]
    public async Task<Board> UpdateBoard(
        UpdateBoardInput input,
        ImpolarInsightContext db)
    {
        var board = await db.Boards.FindAsync(input.Id);
        
        if (board == null)
            throw new Exception($"Board with ID {input.Id} not found.");
        
        board.Name = input.Name ?? board.Name;
        board.Url = input.Url ?? board.Url;
        board.Color = input.Color ?? board.Color;
        
        if (input.Display.HasValue)
            board.Display = input.Display.Value;
        
        if (input.ViewVoters.HasValue)
            board.ViewVoters = input.ViewVoters.Value;
        
        await db.SaveChangesAsync();
        
        return board;
    }
    
    [Authorize(Policy = "admin")]
    public async Task<bool> DeleteBoard(
        Guid id,
        ImpolarInsightContext db)
    {
        var board = await db.Boards.FindAsync(id);
        
        if (board == null)
            return false;
            
        db.Boards.Remove(board);
        await db.SaveChangesAsync();
        
        return true;
    }
}

public record CreateBoardInput(
    string Name,
    string Url,
    string Color,
    bool Display = false,
    bool ViewVoters = true);

public record UpdateBoardInput(
    Guid Id,
    string? Name = null,
    string? Url = null,
    string? Color = null,
    bool? Display = null,
    bool? ViewVoters = null);

// Post Mutations
[ExtendObjectType(OperationTypeNames.Mutation)]
public class PostMutations
{
    [Authorize(Policy = "user")]
    public async Task<Post> CreatePost(
        CreatePostInput input,
        ImpolarInsightContext db,
        IUserService userService)
    {
        var tenant = await userService.GetTenant();
        
        // Generate a unique SlugId
        var slugId = Guid.NewGuid().ToString().Substring(0, 8);
        
        var post = new Post
        {
            Id = Guid.NewGuid(),
            Title = input.Title,
            Slug = input.Slug,
            SlugId = slugId,
            ContentMarkdown = input.ContentMarkdown,
            UserId = input.UserId,
            BoardId = input.BoardId,
            RoadmapId = input.RoadmapId,
            TenantId = tenant.Id
        };
        
        db.Posts.Add(post);
        await db.SaveChangesAsync();
        
        return post;
    }
    
    [Authorize(Policy = "user")]
    public async Task<Post> UpdatePost(
        UpdatePostInput input,
        ImpolarInsightContext db)
    {
        var post = await db.Posts.FindAsync(input.Id);
        
        if (post == null)
            throw new Exception($"Post with ID {input.Id} not found.");
        
        post.Title = input.Title ?? post.Title;
        post.Slug = input.Slug ?? post.Slug;
        post.ContentMarkdown = input.ContentMarkdown ?? post.ContentMarkdown;
        
        if (input.BoardId.HasValue)
            post.BoardId = input.BoardId;
            
        if (input.RoadmapId.HasValue)
            post.RoadmapId = input.RoadmapId;
        
        await db.SaveChangesAsync();
        
        return post;
    }
    
    [Authorize(Policy = "admin")]
    public async Task<bool> DeletePost(
        Guid id,
        ImpolarInsightContext db)
    {
        var post = await db.Posts.FindAsync(id);
        
        if (post == null)
            return false;
            
        db.Posts.Remove(post);
        await db.SaveChangesAsync();
        
        return true;
    }
}

public record CreatePostInput(
    string Title,
    string Slug,
    string? ContentMarkdown,
    Guid UserId,
    Guid? BoardId,
    Guid? RoadmapId);

public record UpdatePostInput(
    Guid Id,
    string? Title = null,
    string? Slug = null,
    string? ContentMarkdown = null,
    Guid? BoardId = null,
    Guid? RoadmapId = null);

// Vote Mutations
[ExtendObjectType(OperationTypeNames.Mutation)]
public class VoteMutations
{
    [Authorize(Policy = "user")]
    public async Task<Vote> CreateVote(
        CreateVoteInput input,
        ImpolarInsightContext db,
        IUserService userService)
    {
        var tenant = await userService.GetTenant();
        
        // Check if the user already voted for this post
        var existingVote = await db.Votes
            .FirstOrDefaultAsync(v => v.UserId == input.UserId && v.PostId == input.PostId);
            
        if (existingVote != null)
            return existingVote;
        
        var vote = new Vote
        {
            Id = Guid.NewGuid(),
            UserId = input.UserId,
            PostId = input.PostId,
            TenantId = tenant.Id
        };
        
        db.Votes.Add(vote);
        await db.SaveChangesAsync();
        
        return vote;
    }
    
    [Authorize(Policy = "user")]
    public async Task<bool> DeleteVote(
        Guid id,
        ImpolarInsightContext db)
    {
        var vote = await db.Votes.FindAsync(id);
        
        if (vote == null)
            return false;
            
        db.Votes.Remove(vote);
        await db.SaveChangesAsync();
        
        return true;
    }
    
    [Authorize(Policy = "user")]
    public async Task<bool> DeleteVoteByUserAndPost(
        Guid userId,
        Guid postId,
        ImpolarInsightContext db)
    {
        var vote = await db.Votes
            .FirstOrDefaultAsync(v => v.UserId == userId && v.PostId == postId);
            
        if (vote == null)
            return false;
            
        db.Votes.Remove(vote);
        await db.SaveChangesAsync();
        
        return true;
    }
}

public record CreateVoteInput(
    Guid UserId,
    Guid PostId);

// Roadmap Mutations
[ExtendObjectType(OperationTypeNames.Mutation)]
public class RoadmapMutations
{
    [Authorize(Policy = "admin")]
    public async Task<Roadmap> CreateRoadmap(
        CreateRoadmapInput input,
        ImpolarInsightContext db,
        IUserService userService)
    {
        var tenant = await userService.GetTenant();
        
        var roadmap = new Roadmap
        {
            Id = Guid.NewGuid(),
            Name = input.Name,
            Url = input.Url,
            Color = input.Color,
            Index = input.Index,
            Display = input.Display,
            RoadmapCollectionId = input.RoadmapCollectionId,
            TenantId = tenant.Id
        };
        
        db.Roadmaps.Add(roadmap);
        await db.SaveChangesAsync();
        
        return roadmap;
    }
    
    [Authorize(Policy = "admin")]
    public async Task<Roadmap> UpdateRoadmap(
        UpdateRoadmapInput input,
        ImpolarInsightContext db)
    {
        var roadmap = await db.Roadmaps.FindAsync(input.Id);
        
        if (roadmap == null)
            throw new Exception($"Roadmap with ID {input.Id} not found.");
        
        roadmap.Name = input.Name ?? roadmap.Name;
        roadmap.Url = input.Url ?? roadmap.Url;
        roadmap.Color = input.Color ?? roadmap.Color;
        
        if (input.Index.HasValue)
            roadmap.Index = input.Index.Value;
            
        if (input.Display.HasValue)
            roadmap.Display = input.Display.Value;
            
        if (input.RoadmapCollectionId.HasValue)
            roadmap.RoadmapCollectionId = input.RoadmapCollectionId;
        
        await db.SaveChangesAsync();
        
        return roadmap;
    }
    
    [Authorize(Policy = "admin")]
    public async Task<bool> DeleteRoadmap(
        Guid id,
        ImpolarInsightContext db)
    {
        var roadmap = await db.Roadmaps.FindAsync(id);
        
        if (roadmap == null)
            return false;
            
        db.Roadmaps.Remove(roadmap);
        await db.SaveChangesAsync();
        
        return true;
    }
}

public record CreateRoadmapInput(
    string Name,
    string Url,
    string Color,
    int Index,
    bool Display = false,
    Guid? RoadmapCollectionId = null);

public record UpdateRoadmapInput(
    Guid Id,
    string? Name = null,
    string? Url = null,
    string? Color = null,
    int? Index = null,
    bool? Display = null,
    Guid? RoadmapCollectionId = null);

// RoadmapCollection Mutations
[ExtendObjectType(OperationTypeNames.Mutation)]
public class RoadmapCollectionMutations
{
    [Authorize(Policy = "admin")]
    public async Task<RoadmapCollection> CreateRoadmapCollection(
        CreateRoadmapCollectionInput input,
        ImpolarInsightContext db,
        IUserService userService)
    {
        var tenant = await userService.GetTenant();
        
        var collection = new RoadmapCollection
        {
            Id = Guid.NewGuid(),
            Name = input.Name,
            Description = input.Description,
            Display = input.Display,
            Index = input.Index,
            isPublic = input.IsPublic,
            TenantId = tenant.Id
        };
        
        db.RoadmapCollections.Add(collection);
        await db.SaveChangesAsync();
        
        return collection;
    }
    
    [Authorize(Policy = "admin")]
    public async Task<RoadmapCollection> UpdateRoadmapCollection(
        UpdateRoadmapCollectionInput input,
        ImpolarInsightContext db)
    {
        var collection = await db.RoadmapCollections.FindAsync(input.Id);
        
        if (collection == null)
            throw new Exception($"RoadmapCollection with ID {input.Id} not found.");
        
        collection.Name = input.Name ?? collection.Name;
        collection.Description = input.Description ?? collection.Description;
        
        if (input.Display.HasValue)
            collection.Display = input.Display.Value;
            
        if (input.Index.HasValue)
            collection.Index = input.Index.Value;
            
        if (input.IsPublic.HasValue)
            collection.isPublic = input.IsPublic.Value;
        
        await db.SaveChangesAsync();
        
        return collection;
    }
    
    [Authorize(Policy = "admin")]
    public async Task<bool> DeleteRoadmapCollection(
        Guid id,
        ImpolarInsightContext db)
    {
        var collection = await db.RoadmapCollections.FindAsync(id);
        
        if (collection == null)
            return false;
            
        db.RoadmapCollections.Remove(collection);
        await db.SaveChangesAsync();
        
        return true;
    }
}

public record CreateRoadmapCollectionInput(
    string Name,
    string? Description,
    bool Display = true,
    int Index = 0,
    bool IsPublic = true);

public record UpdateRoadmapCollectionInput(
    Guid Id,
    string? Name = null,
    string? Description = null,
    bool? Display = null,
    int? Index = null,
    bool? IsPublic = null);

// User Mutations
[ExtendObjectType(OperationTypeNames.Mutation)]
public class UserMutations
{
    private static string HashPassword(string password)
    {
        using (var sha256 = SHA256.Create())
        {
            byte[] hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            return Convert.ToBase64String(hashedBytes);
        }
    }
    
    [Authorize(Policy = "admin")]
    public async Task<User> CreateUser(
        CreateUserInput input,
        ImpolarInsightContext db,
        IUserService userService)
    {
        var tenant = await userService.GetTenant();
        
        // Check if user with same email or username exists
        var existingUser = await db.Users
            .FirstOrDefaultAsync(u => u.Email == input.Email || u.Username == input.Username);
            
        if (existingUser != null)
        {
            if (existingUser.Email == input.Email)
                throw new Exception($"User with email {input.Email} already exists.");
            else
                throw new Exception($"User with username {input.Username} already exists.");
        }
        
        var user = new User
        {
            Id = Guid.NewGuid(),
            Name = input.Name,
            Email = input.Email,
            Username = input.Username,
            Password = HashPassword(input.Password),
            Avatar = input.Avatar,
            IsVerified = input.IsVerified,
            IsOwner = input.IsOwner,
            IsBlocked = input.IsBlocked,
            Notes = input.Notes,
            TenantId = tenant.Id
        };
        
        db.Users.Add(user);
        await db.SaveChangesAsync();
        
        return user;
    }
    
    [Authorize(Policy = "admin")]
    public async Task<User> UpdateUser(
        UpdateUserInput input,
        ImpolarInsightContext db)
    {
        var user = await db.Users.FindAsync(input.Id);
        
        if (user == null)
            throw new Exception($"User with ID {input.Id} not found.");
        
        // Check if email or username is being changed to one that already exists
        if (input.Email != null && input.Email != user.Email)
        {
            var existingUserWithEmail = await db.Users
                .FirstOrDefaultAsync(u => u.Email == input.Email && u.Id != input.Id);
                
            if (existingUserWithEmail != null)
                throw new Exception($"User with email {input.Email} already exists.");
        }
        
        if (input.Username != null && input.Username != user.Username)
        {
            var existingUserWithUsername = await db.Users
                .FirstOrDefaultAsync(u => u.Username == input.Username && u.Id != input.Id);
                
            if (existingUserWithUsername != null)
                throw new Exception($"User with username {input.Username} already exists.");
        }
        
        user.Name = input.Name ?? user.Name;
        user.Email = input.Email ?? user.Email;
        user.Username = input.Username ?? user.Username;
        user.Avatar = input.Avatar ?? user.Avatar;
        user.Notes = input.Notes ?? user.Notes;
        
        if (input.Password != null)
            user.Password = HashPassword(input.Password);
            
        if (input.IsVerified.HasValue)
            user.IsVerified = input.IsVerified.Value;
            
        if (input.IsOwner.HasValue)
            user.IsOwner = input.IsOwner.Value;
            
        if (input.IsBlocked.HasValue)
            user.IsBlocked = input.IsBlocked.Value;
        
        await db.SaveChangesAsync();
        
        return user;
    }
    
    [Authorize(Policy = "admin")]
    public async Task<bool> DeleteUser(
        Guid id,
        ImpolarInsightContext db)
    {
        var user = await db.Users.FindAsync(id);
        
        if (user == null)
            return false;
            
        db.Users.Remove(user);
        await db.SaveChangesAsync();
        
        return true;
    }
}

public record CreateUserInput(
    string Email,
    string Username,
    string Password,
    string? Name = null,
    string? Avatar = null,
    bool IsVerified = false,
    bool IsOwner = false,
    bool IsBlocked = false,
    string? Notes = null);

public record UpdateUserInput(
    Guid Id,
    string? Name = null,
    string? Email = null,
    string? Username = null,
    string? Password = null,
    string? Avatar = null,
    bool? IsVerified = null,
    bool? IsOwner = null,
    bool? IsBlocked = null,
    string? Notes = null);

// Comment Mutations
[ExtendObjectType(OperationTypeNames.Mutation)]
public class CommentMutations
{
    [Authorize(Policy = "user")]
    public async Task<Comment> CreateComment(
        CreateCommentInput input,
        ImpolarInsightContext db,
        IUserService userService)
    {
        var tenant = await userService.GetTenant();
        
        // Create a new activity first
        var activity = new PostActivity
        {
            Id = Guid.NewGuid(),
            Type = "comment",
            PostId = input.PostId,
            AuthorId = input.AuthorId,
            TenantId = tenant.Id
        };
        
        db.PostActivities.Add(activity);
        await db.SaveChangesAsync();
        
        // Now create the comment
        var comment = new Comment
        {
            Id = Guid.NewGuid(),
            Body = input.Body,
            ParentId = input.ParentId,
            IsInternal = input.IsInternal,
            ActivityId = activity.Id,
            TenantId = tenant.Id
        };
        
        db.Comments.Add(comment);
        
        // Set the comment ID on the activity
        activity.CommentId = comment.Id;
        
        await db.SaveChangesAsync();
        
        return comment;
    }
    
    [Authorize(Policy = "user")]
    public async Task<Comment> UpdateComment(
        UpdateCommentInput input,
        ImpolarInsightContext db)
    {
        var comment = await db.Comments.FindAsync(input.Id);
        
        if (comment == null)
            throw new Exception($"Comment with ID {input.Id} not found.");
        
        comment.Body = input.Body ?? comment.Body;
        comment.IsEdited = true;
        
        if (input.IsSpam.HasValue)
            comment.IsSpam = input.IsSpam.Value;
            
        if (input.IsInternal.HasValue)
            comment.IsInternal = input.IsInternal.Value;
        
        await db.SaveChangesAsync();
        
        return comment;
    }
    
    [Authorize(Policy = "admin")]
    public async Task<bool> DeleteComment(
        Guid id,
        ImpolarInsightContext db)
    {
        var comment = await db.Comments.FindAsync(id);
        
        if (comment == null)
            return false;
            
        // Also remove the associated activity
        var activity = await db.PostActivities.FindAsync(comment.ActivityId);
        if (activity != null)
        {
            db.PostActivities.Remove(activity);
        }
        
        db.Comments.Remove(comment);
        await db.SaveChangesAsync();
        
        return true;
    }
}

public record CreateCommentInput(
    string Body,
    Guid PostId,
    Guid AuthorId,
    Guid? ParentId = null,
    bool IsInternal = false);

public record UpdateCommentInput(
    Guid Id,
    string? Body = null,
    bool? IsSpam = null,
    bool? IsInternal = null);

// PostActivity Mutations
[ExtendObjectType(OperationTypeNames.Mutation)]
public class PostActivityMutations
{
    [Authorize(Policy = "admin")]
    public async Task<PostActivity> CreatePostActivity(
        CreatePostActivityInput input,
        ImpolarInsightContext db,
        IUserService userService)
    {
        var tenant = await userService.GetTenant();
        
        var activity = new PostActivity
        {
            Id = Guid.NewGuid(),
            Type = input.Type,
            PostId = input.PostId,
            AuthorId = input.AuthorId,
            TenantId = tenant.Id
        };
        
        db.PostActivities.Add(activity);
        await db.SaveChangesAsync();
        
        return activity;
    }
    
    [Authorize(Policy = "admin")]
    public async Task<bool> DeletePostActivity(
        Guid id,
        ImpolarInsightContext db)
    {
        var activity = await db.PostActivities.FindAsync(id);
        
        if (activity == null)
            return false;
            
        // If it's a comment activity, also remove the comment
        if (activity.Type == "comment" && activity.CommentId.HasValue)
        {
            var comment = await db.Comments.FindAsync(activity.CommentId.Value);
            if (comment != null)
            {
                db.Comments.Remove(comment);
            }
        }
        
        db.PostActivities.Remove(activity);
        await db.SaveChangesAsync();
        
        return true;
    }
}

public record CreatePostActivityInput(
    string Type,
    Guid PostId,
    Guid AuthorId);

// SiteSettings Mutations
[ExtendObjectType(OperationTypeNames.Mutation)]
public class SiteSettingsMutations
{
    [Authorize(Policy = "admin")]
    public async Task<SiteSettings> CreateSiteSettings(
        CreateSiteSettingsInput input,
        ImpolarInsightContext db,
        IUserService userService)
    {
        var tenant = await userService.GetTenant();
        
        // Check if settings already exist for this tenant
        var existingSettings = await db.SiteSettings
            .FirstOrDefaultAsync();
            
        if (existingSettings != null)
            throw new Exception("Site settings already exist. Use update instead.");
            
        var settings = new SiteSettings
        {
            Id = Guid.NewGuid(),
            Title = input.Title,
            Description = input.Description,
            Logo = input.Logo,
            Icon = input.Icon,
            AccentColor = input.AccentColor,
            GoogleAnalyticsId = input.GoogleAnalyticsId,
            IsPoweredBy = input.IsPoweredBy,
            AllowSignup = input.AllowSignup,
            DeveloperMode = input.DeveloperMode,
            Labs = input.Labs ?? "{}",
            TenantId = tenant.Id,
            Theme = input.Theme ?? "{}"
        };
        
        db.SiteSettings.Add(settings);
        await db.SaveChangesAsync();
        
        return settings;
    }
    
    [Authorize(Policy = "admin")]
    public async Task<SiteSettings> UpdateSiteSettings(
        UpdateSiteSettingsInput input,
        ImpolarInsightContext db)
    {
        var settings = await db.SiteSettings.FirstOrDefaultAsync();
        
        if (settings == null)
            throw new Exception("Site settings not found. Create settings first.");
        
        settings.Title = input.Title ?? settings.Title;
        settings.Description = input.Description ?? settings.Description;
        settings.Logo = input.Logo ?? settings.Logo;
        settings.Icon = input.Icon ?? settings.Icon;
        settings.AccentColor = input.AccentColor ?? settings.AccentColor;
        settings.GoogleAnalyticsId = input.GoogleAnalyticsId ?? settings.GoogleAnalyticsId;
        settings.Labs = input.Labs ?? settings.Labs;
        settings.Theme = input.Theme ?? settings.Theme;
        
        if (input.IsPoweredBy.HasValue)
            settings.IsPoweredBy = input.IsPoweredBy.Value;
            
        if (input.AllowSignup.HasValue)
            settings.AllowSignup = input.AllowSignup.Value;
            
        if (input.DeveloperMode.HasValue)
            settings.DeveloperMode = input.DeveloperMode.Value;
        
        await db.SaveChangesAsync();
        
        return settings;
    }
}

public record CreateSiteSettingsInput(
    string? Title = null,
    string? Description = null,
    string? Logo = null,
    string? Icon = null,
    string? AccentColor = null,
    string? GoogleAnalyticsId = null,
    bool IsPoweredBy = true,
    bool AllowSignup = true,
    bool DeveloperMode = false,
    string? Labs = null,
    string? Theme = null);

public record UpdateSiteSettingsInput(
    string? Title = null,
    string? Description = null,
    string? Logo = null,
    string? Icon = null,
    string? AccentColor = null,
    string? GoogleAnalyticsId = null,
    bool? IsPoweredBy = null,
    bool? AllowSignup = null,
    bool? DeveloperMode = null,
    string? Labs = null,
    string? Theme = null);

// Tenant Mutations
[ExtendObjectType(OperationTypeNames.Mutation)]
public class TenantMutations
{
    [Authorize(Policy = "admin")]
    public async Task<Tenant> CreateTenant(
        CreateTenantInput input,
        ImpolarInsightContext db)
    {
        // Check if tenant with same domain already exists
        var existingTenant = await db.Tenants
            .IgnoreQueryFilters()
            .FirstOrDefaultAsync(t => t.Domain == input.Domain);
            
        if (existingTenant != null)
            throw new Exception($"Tenant with domain {input.Domain} already exists.");
            
        var tenant = new Tenant
        {
            Id = Guid.NewGuid(),
            Domain = input.Domain
        };
        
        db.Tenants.Add(tenant);
        await db.SaveChangesAsync();
        
        return tenant;
    }
    
    [Authorize(Policy = "admin")]
    public async Task<Tenant> UpdateTenant(
        UpdateTenantInput input,
        ImpolarInsightContext db)
    {
        var tenant = await db.Tenants.FindAsync(input.Id);
        
        if (tenant == null)
            throw new Exception($"Tenant with ID {input.Id} not found.");
        
        // Check if domain is being changed to one that already exists
        if (input.Domain != null && input.Domain != tenant.Domain)
        {
            var existingTenantWithDomain = await db.Tenants
                .IgnoreQueryFilters()
                .FirstOrDefaultAsync(t => t.Domain == input.Domain && t.Id != input.Id);
                
            if (existingTenantWithDomain != null)
                throw new Exception($"Tenant with domain {input.Domain} already exists.");
        }
        
        tenant.Domain = input.Domain ?? tenant.Domain;
        
        await db.SaveChangesAsync();
        
        return tenant;
    }
    
    [Authorize(Policy = "admin")]
    public async Task<bool> DeleteTenant(
        Guid id,
        ImpolarInsightContext db)
    {
        var tenant = await db.Tenants.FindAsync(id);
        
        if (tenant == null)
            return false;
            
        db.Tenants.Remove(tenant);
        await db.SaveChangesAsync();
        
        return true;
    }
}

public record CreateTenantInput(
    string Domain);

public record UpdateTenantInput(
    Guid Id,
    string? Domain = null);