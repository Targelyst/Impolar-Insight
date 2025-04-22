using Microsoft.EntityFrameworkCore;
using ImpolarInsight.Data;
using ImpolarInsight.Models;
using HotChocolate.Authorization;

namespace ImpolarInsight.Queries;

[QueryType]
public static class BoardQueries {
    [UseFirstOrDefault]
    [UseProjection]
    public static IQueryable<Board> GetBoard(
        Guid id,
        ImpolarInsightContext db
    ) => db.Boards.Where(b => b.Id == id);

    [UseFirstOrDefault]
    [UseProjection]
    public static IQueryable<Board> GetBoardByUrl(
        string url,
        ImpolarInsightContext db
    ) => db.Boards.Where(b => b.Url == url);

    [UsePaging]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public static IQueryable<Board> GetBoards(
        ImpolarInsightContext db,
        bool? displayOnly = null,
        bool rootOnly = false
    ) {
        var query = db.Boards.AsQueryable();

        if (displayOnly == true) {
            query = query.Where(b => b.Display == true);
        }
        
        if (rootOnly) {
            query = query.Where(b => b.ParentBoardId == null);
        }

        return query.OrderBy(b => b.Name);
    }
    
    [UsePaging]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public static IQueryable<Board> GetSubBoards(
        Guid parentId,
        ImpolarInsightContext db,
        bool? displayOnly = null
    ) {
        var query = db.Boards.Where(b => b.ParentBoardId == parentId);

        if (displayOnly == true) {
            query = query.Where(b => b.Display == true);
        }

        return query.OrderBy(b => b.Name);
    }
}

[QueryType]
public static class PostQueries {
    [UseFirstOrDefault]
    [UseProjection]
    public static IQueryable<Post> GetPost(
        Guid id,
        ImpolarInsightContext db
    ) => db.Posts.Where(p => p.Id == id);

    [UseFirstOrDefault]
    [UseProjection]
    public static IQueryable<Post> GetPostBySlug(
        string slug,
        string slugId,
        ImpolarInsightContext db
    ) => db.Posts.Where(p => p.Slug == slug && p.SlugId == slugId);

    [UsePaging]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public static IQueryable<Post> GetPosts(
        ImpolarInsightContext db
    ) => db.Posts.OrderByDescending(p => p.Votes.Count);

    [UsePaging]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public static IQueryable<Post> GetPostsByBoard(
        Guid boardId,
        ImpolarInsightContext db
    ) => db.Posts
        .Where(p => p.BoardId == boardId)
        .OrderByDescending(p => p.Votes.Count);

    [UsePaging]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public static IQueryable<Post> GetPostsByRoadmap(
        Guid roadmapId,
        ImpolarInsightContext db
    ) => db.Posts
        .Where(p => p.RoadmapId == roadmapId)
        .OrderByDescending(p => p.Votes.Count);

    [UsePaging]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public static IQueryable<Post> GetPostsByUser(
        Guid userId,
        ImpolarInsightContext db
    ) => db.Posts
        .Where(p => p.UserId == userId)
        .OrderByDescending(p => p.Votes.Count);
}

[QueryType]
public static class VoteQueries {
    [UseFirstOrDefault]
    [UseProjection]
    public static IQueryable<Vote> GetVote(
        Guid id,
        ImpolarInsightContext db
    ) => db.Votes.Where(v => v.Id == id);

    [AllowAnonymous]
    [UsePaging]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public static IQueryable<Vote> GetVotes(
        ImpolarInsightContext db
    ) => db.Votes.OrderBy(v => v.Id);

    [UsePaging]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public static IQueryable<Vote> GetVotesByPost(
        Guid postId,
        ImpolarInsightContext db
    ) => db.Votes
        .Where(v => v.PostId == postId)
        .OrderBy(v => v.Id);

    [UsePaging]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public static IQueryable<Vote> GetVotesByUser(
        Guid userId,
        ImpolarInsightContext db
    ) => db.Votes
        .Where(v => v.UserId == userId)
        .OrderBy(v => v.Id);
}

[QueryType]
public static class RoadmapCollectionQueries {
    [UseFirstOrDefault]
    [UseProjection]
    public static IQueryable<RoadmapCollection> GetRoadmapCollection(
        Guid id,
        ImpolarInsightContext db
    ) => db.RoadmapCollections.Where(rc => rc.Id == id);

    [UsePaging]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public static IQueryable<RoadmapCollection> GetRoadmapCollections(
        ImpolarInsightContext db
    ) {
        return db.RoadmapCollections.OrderBy(rc => rc.Index);
    }

    [UsePaging]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public static IQueryable<Roadmap> GetRoadmapsByCollection(
        Guid collectionId,
        ImpolarInsightContext db,
        bool? displayOnly = null
    ) {
        var query = db.Roadmaps.Where(r => r.RoadmapCollectionId == collectionId);

        if (displayOnly == true) {
            query = query.Where(r => r.Display == true);
        }

        return query.OrderBy(r => r.Index);
    }
}

[QueryType]
public static class RoadmapQueries {
    [UseFirstOrDefault]
    [UseProjection]
    public static IQueryable<Roadmap> GetRoadmap(
        Guid id,
        ImpolarInsightContext db
    ) => db.Roadmaps.Where(r => r.Id == id);

    [UseFirstOrDefault]
    [UseProjection]
    public static IQueryable<Roadmap> GetRoadmapByUrl(
        string url,
        ImpolarInsightContext db
    ) => db.Roadmaps.Where(r => r.Url == url);

    [UsePaging]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public static IQueryable<Roadmap> GetRoadmaps(
        ImpolarInsightContext db,
        bool? displayOnly = null
    ) {
        var query = db.Roadmaps.AsQueryable();

        if (displayOnly == true) {
            query = query.Where(r => r.Display == true);
        }

        return query.OrderBy(r => r.Index);
    }
}

[QueryType]
public static class UserQueries {
    [UseFirstOrDefault]
    [UseProjection]
    public static IQueryable<User> GetUser(
        Guid id,
        ImpolarInsightContext db
    ) => db.Users.Where(u => u.Id == id);

    [UseFirstOrDefault]
    [UseProjection]
    public static IQueryable<User> GetUserByUsername(
        string username,
        ImpolarInsightContext db
    ) => db.Users.Where(u => u.Username == username);

    [UseFirstOrDefault]
    [UseProjection]
    public static IQueryable<User> GetUserByEmail(
        string email,
        ImpolarInsightContext db
    ) => db.Users.Where(u => u.Email == email);

    [UsePaging]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public static IQueryable<User> GetUsers(
        ImpolarInsightContext db
    ) => db.Users.OrderBy(u => u.Username);
}

[QueryType]
public static class CommentQueries {
    [UseFirstOrDefault]
    [UseProjection]
    public static IQueryable<Comment> GetComment(
        Guid id,
        ImpolarInsightContext db
    ) => db.Comments.Where(c => c.Id == id);

    [UsePaging]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public static IQueryable<Comment> GetComments(
        ImpolarInsightContext db
    ) => db.Comments.OrderBy(c => c.Id);

    [UsePaging]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public static IQueryable<Comment> GetCommentsByParent(
        Guid parentId,
        ImpolarInsightContext db
    ) => db.Comments
        .Where(c => c.ParentId == parentId)
        .OrderBy(c => c.Id);
}

[QueryType]
public static class PostActivityQueries {
    [UseFirstOrDefault]
    [UseProjection]
    public static IQueryable<PostActivity> GetPostActivity(
        Guid id,
        ImpolarInsightContext db
    ) => db.PostActivities.Where(pa => pa.Id == id);

    [UsePaging]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public static IQueryable<PostActivity> GetPostActivities(
        ImpolarInsightContext db
    ) => db.PostActivities.OrderByDescending(pa => pa.Id);

    [UsePaging]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public static IQueryable<PostActivity> GetPostActivitiesByPost(
        Guid postId,
        ImpolarInsightContext db
    ) => db.PostActivities
        .Where(pa => pa.PostId == postId)
        .OrderByDescending(pa => pa.Id);

    [UsePaging]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public static IQueryable<PostActivity> GetPostActivitiesByAuthor(
        Guid authorId,
        ImpolarInsightContext db
    ) => db.PostActivities
        .Where(pa => pa.AuthorId == authorId)
        .OrderByDescending(pa => pa.Id);
}

[QueryType]
public static class SiteSettingsQueries {
    [UseFirstOrDefault]
    [UseProjection]
    public static IQueryable<SiteSettings> GetSiteSettings(
        ImpolarInsightContext db
    ) => db.SiteSettings;
}

[QueryType]
public static class PostRoadmapHistoryQueries {
    [UseFirstOrDefault]
    [UseProjection]
    public static IQueryable<PostRoadmapHistory> GetPostRoadmapHistoryEntry(
        Guid id,
        ImpolarInsightContext db
    ) => db.PostRoadmapHistory.Where(prh => prh.Id == id);

    [UsePaging]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public static IQueryable<PostRoadmapHistory> GetPostRoadmapHistory(
        ImpolarInsightContext db
    ) => db.PostRoadmapHistory.OrderByDescending(prh => prh.MovedAt);

    [UsePaging]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public static IQueryable<PostRoadmapHistory> GetPostRoadmapHistoryByPost(
        Guid postId,
        ImpolarInsightContext db
    ) => db.PostRoadmapHistory
        .Where(prh => prh.PostId == postId)
        .OrderByDescending(prh => prh.MovedAt);

    [UsePaging]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public static IQueryable<PostRoadmapHistory> GetPostRoadmapHistoryByRoadmap(
        Guid roadmapId,
        ImpolarInsightContext db
    ) => db.PostRoadmapHistory
        .Where(prh => prh.FromRoadmapId == roadmapId || prh.ToRoadmapId == roadmapId)
        .OrderByDescending(prh => prh.MovedAt);
}

[QueryType]
public static class ChangelogQueries {
    [UseFirstOrDefault]
    [UseProjection]
    public static IQueryable<ChangelogItem> GetChangelogItem(
        Guid id,
        ImpolarInsightContext db
    ) => db.ChangelogItems.Where(c => c.Id == id);

    [UsePaging]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public static IQueryable<ChangelogItem> GetChangelogItems(
        ImpolarInsightContext db,
        bool publishedOnly = false
    ) {
        var query = db.ChangelogItems.AsQueryable();
        
        if (publishedOnly) {
            query = query.Where(c => c.IsPublished);
        }
        
        return query.OrderByDescending(c => c.PublishedAt ?? c.CreatedAt);
    }

    [UsePaging]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public static IQueryable<ChangelogItem> GetChangelogItemsByPost(
        Guid postId,
        ImpolarInsightContext db,
        bool publishedOnly = false
    ) {
        var query = db.ChangelogItems
            .Where(c => c.RelatedPosts.Any(p => p.Id == postId));
        
        if (publishedOnly) {
            query = query.Where(c => c.IsPublished);
        }
        
        return query.OrderByDescending(c => c.PublishedAt ?? c.CreatedAt);
    }
}