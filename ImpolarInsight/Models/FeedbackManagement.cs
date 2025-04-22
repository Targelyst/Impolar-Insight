using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using HotChocolate.Authorization;

namespace ImpolarInsight.Models;

/// <summary>
/// Board is a category or section for organizing feedback posts
/// </summary>
public class Board : KeyedEntity
{
    public required string Name { get; set; }
    public required string Url { get; set; }
    public required string Color { get; set; }
    public bool Display { get; set; } = false;
    public bool ViewVoters { get; set; } = true;
    
    public virtual ICollection<Post> Posts { get; set; } = new List<Post>();
}

/// <summary>
/// Post represents user feedback, feature requests, or ideas
/// </summary
public class Post : KeyedEntity
{
    public required string Title { get; set; }
    public required string Slug { get; set; }
    public required string SlugId { get; set; }
    public string? ContentMarkdown { get; set; }
    
    // Relations
    public Guid UserId { get; set; }
    [GraphQLIgnore]
    public virtual User User { get; set; } = null!;
    
    public Guid? BoardId { get; set; }
    public virtual Board? Board { get; set; }
    
    public Guid? RoadmapId { get; set; }
    public virtual Roadmap? Roadmap { get; set; }
    
    public virtual ICollection<Vote> Votes { get; set; } = new List<Vote>();
    public virtual ICollection<PostActivity> Activities { get; set; } = new List<PostActivity>();
}

/// <summary>
/// RoadmapCollection represents a group of related roadmap statuses
/// </summary>
public class RoadmapCollection : KeyedEntity
{
    public required string Name { get; set; }
    public string? Description { get; set; }
    public bool Display { get; set; } = true;
    public int Index { get; set; }

    public bool isPublic { get; set; } = true;
    
    public virtual ICollection<Roadmap> Roadmaps { get; set; } = new List<Roadmap>();
}

/// <summary>
/// Vote represents a user's upvote on a post
/// </summary>
public class Vote : KeyedEntity
{
    public Guid UserId { get; set; }
    [GraphQLIgnore]
    public virtual User User { get; set; } = null!;
    
    public Guid PostId { get; set; }
    [GraphQLIgnore]
    public virtual Post Post { get; set; } = null!;
}

public class Roadmap : KeyedEntity
{
    public required string Name { get; set; }
    public required string Url { get; set; }
    public required string Color { get; set; }
    public int Index { get; set; }
    public bool Display { get; set; } = false;
    
    // Add reference to parent RoadmapCollection
    public Guid? RoadmapCollectionId { get; set; }
    public virtual RoadmapCollection? RoadmapCollection { get; set; }
    
    public virtual ICollection<Post> Posts { get; set; } = new List<Post>();
}

/// <summary>
/// User model for authentication and authorization
/// </summary>
public class User : KeyedEntity
{
    public string? Name { get; set; }
    public required string Email { get; set; }
    public required string Username { get; set; }
    public required string Password { get; set; }
    public string? Avatar { get; set; }
    public bool IsVerified { get; set; } = false;
    public bool IsOwner { get; set; } = false;
    public bool IsBlocked { get; set; } = false;
    public string? Notes { get; set; }
    
    public virtual ICollection<Vote> Votes { get; set; } = new List<Vote>();
    public virtual ICollection<Post> Posts { get; set; } = new List<Post>();
}

/// <summary>
/// Comment on a post
/// </summary>
public class Comment : KeyedEntity
{
    public Guid? ParentId { get; set; }
    public virtual Comment? Parent { get; set; }
    
    public required string Body { get; set; }
    public bool IsEdited { get; set; } = false;
    public bool IsSpam { get; set; } = false;
    public bool IsInternal { get; set; } = false;
    
    public Guid ActivityId { get; set; }
    [GraphQLIgnore]
    public virtual PostActivity Activity { get; set; } = null!;
}

/// <summary>
/// Activity on a post (comments, status changes, etc.)
/// </summary>
public class PostActivity : KeyedEntity
{
    public required string Type { get; set; } // "comment", "status_change", etc.
    
    public Guid? CommentId { get; set; }
    public virtual Comment? Comment { get; set; }
    
    public Guid PostId { get; set; }
    [GraphQLIgnore]
    public virtual Post Post { get; set; } = null!;
    
    public Guid AuthorId { get; set; }
    [GraphQLIgnore]
    public virtual User Author { get; set; } = null!;
}

/// <summary>
/// Site settings
/// </summary>
public class SiteSettings : KeyedEntity
{
    public string? Title { get; set; }
    public string? Description { get; set; }
    public string? Logo { get; set; }
    public string? Icon { get; set; }
    public string? AccentColor { get; set; }
    public string? GoogleAnalyticsId { get; set; }
    public bool IsPoweredBy { get; set; } = true;
    public bool AllowSignup { get; set; } = true;
    public bool DeveloperMode { get; set; } = false;
    
    [Column(TypeName = "jsonb")]
    public string Labs { get; set; } = "{}";
    
    [Column(TypeName = "jsonb")]
    public string Theme { get; set; } = "{}";
}