using Microsoft.EntityFrameworkCore;
using ImpolarInsight.Data;
using ImpolarInsight.Models;
using ImpolarInsight.Services;
using System.Security.Cryptography;
using System.Text;

namespace ImpolarInsight.Queries;

[MutationType]
public static class ProjectMutations {
    public static async Task<Project> CreateProject(
        string name,
        ImpolarInsightContext db,
        IUserService userService
    ) {
        var project = new Project {
            Id = Guid.NewGuid(),
            Name = name,
           TenantId = userService.Tenant
        };

        db.Projects.Add(project);
        await db.SaveChangesAsync();

        return project;
    }

    public static async Task<Project> UpdateProject(
        Guid id,
        string name,
        ImpolarInsightContext db
    ) {
        var project = await db.Projects.FirstOrDefaultAsync(p => p.Id == id)
            ?? throw new Exception($"Project with id {id} not found");

        project.Name = name;
        await db.SaveChangesAsync();

        return project;
    }

    public static async Task<bool> DeleteProject(
        Guid id,
        ImpolarInsightContext db
    ) {
        var project = await db.Projects.FirstOrDefaultAsync(p => p.Id == id);
        
        if (project == null) {
            return false;
        }

        db.Projects.Remove(project);
        await db.SaveChangesAsync();

        return true;
    }
}

[MutationType]
public static class BoardMutations {
    public static async Task<Board> CreateBoard(
        string name,
        string url,
        string color,
        bool display,
        bool viewVoters,
        ImpolarInsightContext db,
        IUserService userService
    ) {
        var board = new Board {
            Id = Guid.NewGuid(),
            Name = name,
            Url = url,
            Color = color,
            Display = display,
            ViewVoters = viewVoters,
           TenantId = userService.Tenant
        };

        db.Boards.Add(board);
        await db.SaveChangesAsync();

        return board;
    }

    public static async Task<Board> UpdateBoard(
        Guid id,
        string name,
        string url,
        string color,
        bool display,
        bool viewVoters,
        ImpolarInsightContext db
    ) {
        var board = await db.Boards.FirstOrDefaultAsync(b => b.Id == id)
            ?? throw new Exception($"Board with id {id} not found");

        board.Name = name;
        board.Url = url;
        board.Color = color;
        board.Display = display;
        board.ViewVoters = viewVoters;
        
        await db.SaveChangesAsync();

        return board;
    }

    public static async Task<bool> DeleteBoard(
        Guid id,
        ImpolarInsightContext db
    ) {
        var board = await db.Boards.FirstOrDefaultAsync(b => b.Id == id);
        
        if (board == null) {
            return false;
        }

        db.Boards.Remove(board);
        await db.SaveChangesAsync();

        return true;
    }
}

[MutationType]
public static class PostMutations {
    public static async Task<Post> CreatePost(
        string title,
        string? contentMarkdown,
        Guid? boardId,
        Guid userId,
        ImpolarInsightContext db,
        IUserService userService
    ) {
        // Create slug from title
        string slug = title.ToLower()
            .Replace(" ", "-")
            .Replace(".", "")
            .Replace(",", "")
            .Replace(":", "")
            .Replace(";", "")
            .Replace("!", "")
            .Replace("?", "");
            
        string slugId = Guid.NewGuid().ToString().Substring(0, 8);

        var post = new Post {
            Id = Guid.NewGuid(),
            Title = title,
            Slug = slug,
            SlugId = slugId,
            ContentMarkdown = contentMarkdown,
            UserId = userId,
            BoardId = boardId,
           TenantId = userService.Tenant
        };

        db.Posts.Add(post);
        await db.SaveChangesAsync();

        return post;
    }

    public static async Task<Post> UpdatePost(
        Guid id,
        string title,
        string? contentMarkdown,
        Guid? boardId,
        Guid? roadmapId,
        ImpolarInsightContext db
    ) {
        var post = await db.Posts.FirstOrDefaultAsync(p => p.Id == id)
            ?? throw new Exception($"Post with id {id} not found");

        post.Title = title;
        post.ContentMarkdown = contentMarkdown;
        post.BoardId = boardId;
        post.RoadmapId = roadmapId;
        
        await db.SaveChangesAsync();

        return post;
    }

    public static async Task<Post> UpdatePostRoadmap(
        Guid id,
        Guid? roadmapId,
        Guid authorId,
        ImpolarInsightContext db,
        IUserService userService
    ) {
        var post = await db.Posts.FirstOrDefaultAsync(p => p.Id == id)
            ?? throw new Exception($"Post with id {id} not found");

        post.RoadmapId = roadmapId;

        // Create a status change activity
        var activity = new PostActivity {
            Id = Guid.NewGuid(),
            Type = "status_change",
            PostId = post.Id,
            AuthorId = authorId,
           TenantId = userService.Tenant
        };
        
        db.PostActivities.Add(activity);
        await db.SaveChangesAsync();

        return post;
    }

    public static async Task<bool> DeletePost(
        Guid id,
        ImpolarInsightContext db
    ) {
        var post = await db.Posts.FirstOrDefaultAsync(p => p.Id == id);
        
        if (post == null) {
            return false;
        }

        db.Posts.Remove(post);
        await db.SaveChangesAsync();

        return true;
    }
}

[MutationType]
public static class VoteMutations {
    public static async Task<Vote> AddVote(
        Guid postId,
        Guid userId,
        ImpolarInsightContext db,
        IUserService userService
    ) {
        // Check if vote already exists
        var existingVote = await db.Votes
            .FirstOrDefaultAsync(v => v.PostId == postId && v.UserId == userId);
            
        if (existingVote != null) {
            return existingVote;
        }

        var vote = new Vote {
            Id = Guid.NewGuid(),
            PostId = postId,
            UserId = userId,
           TenantId = userService.Tenant
        };

        db.Votes.Add(vote);
        await db.SaveChangesAsync();

        return vote;
    }

    public static async Task<bool> RemoveVote(
        Guid postId,
        Guid userId,
        ImpolarInsightContext db
    ) {
        var vote = await db.Votes
            .FirstOrDefaultAsync(v => v.PostId == postId && v.UserId == userId);
            
        if (vote == null) {
            return false;
        }

        db.Votes.Remove(vote);
        await db.SaveChangesAsync();

        return true;
    }
}

[MutationType]
public static class RoadmapMutations {
    public static async Task<Roadmap> CreateRoadmap(
        string name,
        string url,
        string color,
        int index,
        bool display,
        ImpolarInsightContext db,
        IUserService userService
    ) {
        var roadmap = new Roadmap {
            Id = Guid.NewGuid(),
            Name = name,
            Url = url,
            Color = color,
            Index = index,
            Display = display,
           TenantId = userService.Tenant
        };

        db.Roadmaps.Add(roadmap);
        await db.SaveChangesAsync();

        return roadmap;
    }

    public static async Task<Roadmap> UpdateRoadmap(
        Guid id,
        string name,
        string url,
        string color,
        int index,
        bool display,
        ImpolarInsightContext db
    ) {
        var roadmap = await db.Roadmaps.FirstOrDefaultAsync(r => r.Id == id)
            ?? throw new Exception($"Roadmap with id {id} not found");

        roadmap.Name = name;
        roadmap.Url = url;
        roadmap.Color = color;
        roadmap.Index = index;
        roadmap.Display = display;
        
        await db.SaveChangesAsync();

        return roadmap;
    }

    public static async Task<bool> DeleteRoadmap(
        Guid id,
        ImpolarInsightContext db
    ) {
        var roadmap = await db.Roadmaps.FirstOrDefaultAsync(r => r.Id == id);
        
        if (roadmap == null) {
            return false;
        }

        // Update all posts to remove this roadmap
        var posts = await db.Posts.Where(p => p.RoadmapId == id).ToListAsync();
        foreach (var post in posts) {
            post.RoadmapId = null;
        }

        db.Roadmaps.Remove(roadmap);
        await db.SaveChangesAsync();

        return true;
    }
}

[MutationType]
public static class UserMutations {
    private static string HashPassword(string password) {
        using (var sha256 = SHA256.Create()) {
            byte[] hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            return Convert.ToBase64String(hashedBytes);
        }
    }

    public static async Task<User> CreateUser(
        string email,
        string username,
        string password,
        string? name,
        bool isOwner,
        ImpolarInsightContext db,
        IUserService userService
    ) {
        // Check if username or email already exists
        var existingUser = await db.Users
            .FirstOrDefaultAsync(u => u.Username == username || u.Email == email);
            
        if (existingUser != null) {
            throw new Exception("Username or email already exists");
        }

        var user = new User {
            Id = Guid.NewGuid(),
            Email = email,
            Username = username,
            Password = HashPassword(password),
            Name = name,
            IsVerified = true, // Auto-verify for now
            IsOwner = isOwner,
           TenantId = userService.Tenant
        };

        db.Users.Add(user);
        await db.SaveChangesAsync();

        return user;
    }

    public static async Task<User> UpdateUser(
        Guid id,
        string? name,
        string? avatar,
        bool? isVerified,
        bool? isOwner,
        bool? isBlocked,
        string? notes,
        ImpolarInsightContext db
    ) {
        var user = await db.Users.FirstOrDefaultAsync(u => u.Id == id)
            ?? throw new Exception($"User with id {id} not found");

        if (name != null) user.Name = name;
        if (avatar != null) user.Avatar = avatar;
        if (isVerified.HasValue) user.IsVerified = isVerified.Value;
        if (isOwner.HasValue) user.IsOwner = isOwner.Value;
        if (isBlocked.HasValue) user.IsBlocked = isBlocked.Value;
        if (notes != null) user.Notes = notes;
        
        await db.SaveChangesAsync();

        return user;
    }

    public static async Task<User> ChangePassword(
        Guid id,
        string currentPassword,
        string newPassword,
        ImpolarInsightContext db
    ) {
        var user = await db.Users.FirstOrDefaultAsync(u => u.Id == id)
            ?? throw new Exception($"User with id {id} not found");

        string hashedCurrentPassword = HashPassword(currentPassword);
        if (user.Password != hashedCurrentPassword) {
            throw new Exception("Current password is incorrect");
        }

        user.Password = HashPassword(newPassword);
        await db.SaveChangesAsync();

        return user;
    }

    public static async Task<bool> DeleteUser(
        Guid id,
        ImpolarInsightContext db
    ) {
        var user = await db.Users.FirstOrDefaultAsync(u => u.Id == id);
        
        if (user == null) {
            return false;
        }

        db.Users.Remove(user);
        await db.SaveChangesAsync();

        return true;
    }
}

[MutationType]
public static class CommentMutations {
    public static async Task<Comment> CreateComment(
        Guid postId,
        Guid authorId,
        string body,
        Guid? parentId,
        bool isInternal,
        ImpolarInsightContext db,
        IUserService userService
    ) {
        // First create the activity
        var activity = new PostActivity {
            Id = Guid.NewGuid(),
            Type = "comment",
            PostId = postId,
            AuthorId = authorId,
           TenantId = userService.Tenant
        };
        
        db.PostActivities.Add(activity);
        await db.SaveChangesAsync();
        
        // Then create the comment
        var comment = new Comment {
            Id = Guid.NewGuid(),
            Body = body,
            ParentId = parentId,
            ActivityId = activity.Id,
            IsInternal = isInternal,
           TenantId = userService.Tenant
        };
        
        db.Comments.Add(comment);
        
        // Update the activity with the comment ID
        activity.CommentId = comment.Id;
        
        await db.SaveChangesAsync();

        return comment;
    }

    public static async Task<Comment> UpdateComment(
        Guid id,
        string body,
        bool isInternal,
        ImpolarInsightContext db
    ) {
        var comment = await db.Comments.FirstOrDefaultAsync(c => c.Id == id)
            ?? throw new Exception($"Comment with id {id} not found");

        comment.Body = body;
        comment.IsInternal = isInternal;
        comment.IsEdited = true;
        
        await db.SaveChangesAsync();

        return comment;
    }

    public static async Task<bool> DeleteComment(
        Guid id,
        ImpolarInsightContext db
    ) {
        var comment = await db.Comments.FirstOrDefaultAsync(c => c.Id == id);
        
        if (comment == null) {
            return false;
        }

        // Find and delete the activity
        var activity = await db.PostActivities.FirstOrDefaultAsync(a => a.Id == comment.ActivityId);
        if (activity != null) {
            db.PostActivities.Remove(activity);
        }
        
        db.Comments.Remove(comment);
        await db.SaveChangesAsync();

        return true;
    }

    public static async Task<bool> MarkCommentAsSpam(
        Guid id,
        ImpolarInsightContext db
    ) {
        var comment = await db.Comments.FirstOrDefaultAsync(c => c.Id == id);
        
        if (comment == null) {
            return false;
        }

        comment.IsSpam = true;
        await db.SaveChangesAsync();

        return true;
    }
}

[MutationType]
public static class SiteSettingsMutations {
    public static async Task<SiteSettings> UpdateSiteSettings(
        string? title,
        string? description,
        string? accentColor,
        string? logo,
        string? icon,
        string? googleAnalyticsId,
        bool? allowSignup,
        bool? isPoweredBy,
        bool? developerMode,
        string? labs,
        ImpolarInsightContext db,
        IUserService userService
    ) {
        var settings = await db.SiteSettings.FirstOrDefaultAsync();
        
        if (settings == null) {
            // Create new settings
            settings = new SiteSettings {
                Id = Guid.NewGuid(),
                Title = title,
                Description = description,
                AccentColor = accentColor,
                Logo = logo,
                Icon = icon,
                GoogleAnalyticsId = googleAnalyticsId,
                AllowSignup = allowSignup ?? true,
                IsPoweredBy = isPoweredBy ?? true,
                DeveloperMode = developerMode ?? false,
                Labs = labs ?? "{}",
               TenantId = userService.Tenant
            };
            
            db.SiteSettings.Add(settings);
        } else {
            // Update existing settings
            if (title != null) settings.Title = title;
            if (description != null) settings.Description = description;
            if (accentColor != null) settings.AccentColor = accentColor;
            if (logo != null) settings.Logo = logo;
            if (icon != null) settings.Icon = icon;
            if (googleAnalyticsId != null) settings.GoogleAnalyticsId = googleAnalyticsId;
            if (allowSignup.HasValue) settings.AllowSignup = allowSignup.Value;
            if (isPoweredBy.HasValue) settings.IsPoweredBy = isPoweredBy.Value;
            if (developerMode.HasValue) settings.DeveloperMode = developerMode.Value;
            if (labs != null) settings.Labs = labs;
        }
        
        await db.SaveChangesAsync();

        return settings;
    }
}