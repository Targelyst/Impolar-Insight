using ImpolarInsight.Models;
using System.Security.Cryptography;
using System.Text;

namespace ImpolarInsight.Data;

public class DevelopmentSeeder {
    
    private static string HashPassword(string password)
    {
        using (var sha256 = SHA256.Create())
        {
            byte[] hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            return Convert.ToBase64String(hashedBytes);
        }
    }
    
    private static string GenerateHexColor()
    {
        Random random = new Random();
        return string.Format("{0:X6}", random.Next(0x1000000));
    }

    public static void Seed(ImpolarInsightContext db) {
        const string devTenant = "development-tenant";
        
        // Seed site settings if it doesn't exist
        var settings = db.SiteSettings.FirstOrDefault(s => s.Tenant == devTenant);
        if (settings == null)
        {
            settings = new SiteSettings
            {
                Id = Guid.NewGuid(),
                Tenant = devTenant,
                Title = "ImpolarInsight",
                Description = "Track user feedback to build better products",
                AccentColor = "484d7c",
                AllowSignup = true,
                IsPoweredBy = true,
                Labs = "{\"comments\": true}"
            };
            db.SiteSettings.Add(settings);
            db.SaveChanges();
        }
        
        // Seed admin user
        var adminUser = db.Users.FirstOrDefault(u => u.Email == "admin@example.com" && u.Tenant == devTenant);
        if (adminUser == null)
        {
            adminUser = new User
            {
                Id = Guid.NewGuid(),
                Name = "Admin",
                Email = "admin@example.com",
                Username = "admin",
                Password = HashPassword("admin123"),
                IsVerified = true,
                IsOwner = true,
                Tenant = devTenant
            };
            db.Users.Add(adminUser);
            db.SaveChanges();
        }
        
        // Seed boards
        if (!db.Boards.Any(b => b.Tenant == devTenant))
        {
            var boards = new[]
            {
                new Board
                {
                    Id = Guid.NewGuid(),
                    Name = "Feature Requests",
                    Url = "feature-requests",
                    Color = GenerateHexColor(),
                    Display = true,
                    ViewVoters = true,
                    Tenant = devTenant
                },
                new Board
                {
                    Id = Guid.NewGuid(),
                    Name = "Bug Reports",
                    Url = "bug-reports",
                    Color = GenerateHexColor(),
                    Display = true,
                    ViewVoters = true,
                    Tenant = devTenant
                },
                new Board
                {
                    Id = Guid.NewGuid(),
                    Name = "Questions",
                    Url = "questions",
                    Color = GenerateHexColor(),
                    Display = true,
                    ViewVoters = true,
                    Tenant = devTenant
                }
            };
            
            db.Boards.AddRange(boards);
            db.SaveChanges();
        }
        
        // Seed roadmaps
        if (!db.Roadmaps.Any(r => r.Tenant == devTenant))
        {
            var roadmaps = new[]
            {
                new Roadmap
                {
                    Id = Guid.NewGuid(),
                    Name = "Planned",
                    Url = "planned",
                    Color = GenerateHexColor(),
                    Index = 0,
                    Display = true,
                    Tenant = devTenant
                },
                new Roadmap
                {
                    Id = Guid.NewGuid(),
                    Name = "In Progress",
                    Url = "in-progress",
                    Color = GenerateHexColor(),
                    Index = 1,
                    Display = true,
                    Tenant = devTenant
                },
                new Roadmap
                {
                    Id = Guid.NewGuid(),
                    Name = "Completed",
                    Url = "completed",
                    Color = GenerateHexColor(),
                    Index = 2,
                    Display = true,
                    Tenant = devTenant
                }
            };
            
            db.Roadmaps.AddRange(roadmaps);
            db.SaveChanges();
        }
        
        // Seed some sample posts if none exist
        if (!db.Posts.Any(p => p.Tenant == devTenant))
        {
            var featureBoard = db.Boards.First(b => b.Name == "Feature Requests" && b.Tenant == devTenant);
            var bugBoard = db.Boards.First(b => b.Name == "Bug Reports" && b.Tenant == devTenant);
            var plannedRoadmap = db.Roadmaps.First(r => r.Name == "Planned" && r.Tenant == devTenant);
            
            var posts = new[]
            {
                new Post
                {
                    Id = Guid.NewGuid(),
                    Title = "Add dark mode support",
                    Slug = "add-dark-mode-support",
                    SlugId = Guid.NewGuid().ToString().Substring(0, 8),
                    ContentMarkdown = "It would be great to have a dark mode option to reduce eye strain when using the app at night.",
                    UserId = adminUser.Id,
                    BoardId = featureBoard.Id,
                    RoadmapId = plannedRoadmap.Id,
                    Tenant = devTenant
                },
                new Post
                {
                    Id = Guid.NewGuid(),
                    Title = "Fix login issue on mobile devices",
                    Slug = "fix-login-issue-on-mobile-devices",
                    SlugId = Guid.NewGuid().ToString().Substring(0, 8),
                    ContentMarkdown = "I can't log in using my iPhone. The login button doesn't do anything when tapped.",
                    UserId = adminUser.Id,
                    BoardId = bugBoard.Id,
                    Tenant = devTenant
                }
            };
            
            db.Posts.AddRange(posts);
            db.SaveChanges();
            
            // Add some votes to the posts
            foreach (var post in posts)
            {
                db.Votes.Add(new Vote
                {
                    Id = Guid.NewGuid(),
                    UserId = adminUser.Id,
                    PostId = post.Id,
                    Tenant = devTenant
                });
            }
            db.SaveChanges();
            
            // Add some activity and comments
            foreach (var post in posts)
            {
                var activity = new PostActivity
                {
                    Id = Guid.NewGuid(),
                    Type = "comment",
                    PostId = post.Id,
                    AuthorId = adminUser.Id,
                    Tenant = devTenant
                };
                db.PostActivities.Add(activity);
                db.SaveChanges();
                
                db.Comments.Add(new Comment
                {
                    Id = Guid.NewGuid(),
                    Body = $"This is a sample comment on the post '{post.Title}'",
                    ActivityId = activity.Id,
                    Tenant = devTenant
                });
                db.SaveChanges();
            }
        }
    }
}