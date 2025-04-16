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
        try {
            Console.WriteLine("Starting database seeding...");
            Guid devTenant = Guid.Parse("00000000-0000-0000-0000-000000000001");

            // Check if tenant exists first
            var tenant = db.Tenants.FirstOrDefault(t => t.Id == devTenant);
            if (tenant == null) {
                Console.WriteLine("Creating new tenant...");
                tenant = new() {
                    Id = devTenant,
                    Domain = "localhost",
                };

                db.Tenants.Add(tenant);
                // Save changes and ensure the tenant is committed
                db.SaveChanges();
                Console.WriteLine("Tenant created successfully");
            } else {
                Console.WriteLine("Tenant already exists");
            }
            
            // Seed site settings if it doesn't exist
            var settings = db.SiteSettings.FirstOrDefault(s => s.TenantId == devTenant);
            Console.WriteLine($"Site settings check result: {settings != null}");
            if (settings == null)
            {
                Console.WriteLine("Creating site settings...");
                settings = new SiteSettings
                {
                    Id = Guid.NewGuid(),
                    TenantId = devTenant,
                    Title = "ImpolarInsight",
                    Description = "Track user feedback to build better products",
                    AccentColor = "484d7c",
                    AllowSignup = true,
                    IsPoweredBy = true,
                    Labs = "{\"comments\": true}"
                };
                db.SiteSettings.Add(settings);
                db.SaveChanges();
                Console.WriteLine("Site settings created successfully");
            } else {
                Console.WriteLine("Site settings already exist");
            }
            
            // Seed admin user
            var adminUser = db.Users.FirstOrDefault(u => u.Email == "admin@example.com" && u.TenantId == devTenant);
            Console.WriteLine($"Admin user check result: {adminUser != null}");
            if (adminUser == null)
            {
                Console.WriteLine("Creating admin user...");
                adminUser = new User
                {
                    Id = Guid.NewGuid(),
                    Name = "Admin",
                    Email = "admin@example.com",
                    Username = "admin",
                    Password = HashPassword("admin123"),
                    IsVerified = true,
                    IsOwner = true,
                    TenantId = devTenant
                };
                db.Users.Add(adminUser);
                db.SaveChanges();
                Console.WriteLine("Admin user created successfully");
            } else {
                Console.WriteLine("Admin user already exists");
            }
            
            // Seed boards
            var boardsExist = db.Boards.Any(b => b.TenantId == devTenant);
            Console.WriteLine($"Boards exist: {boardsExist}");
            if (!boardsExist)
            {
                Console.WriteLine("Creating boards...");
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
                        TenantId = devTenant
                    },
                    new Board
                    {
                        Id = Guid.NewGuid(),
                        Name = "Bug Reports",
                        Url = "bug-reports",
                        Color = GenerateHexColor(),
                        Display = true,
                        ViewVoters = true,
                        TenantId = devTenant
                    },
                    new Board
                    {
                        Id = Guid.NewGuid(),
                        Name = "Questions",
                        Url = "questions",
                        Color = GenerateHexColor(),
                        Display = true,
                        ViewVoters = true,
                        TenantId = devTenant
                    }
                };
                
                db.Boards.AddRange(boards);
                db.SaveChanges();
                Console.WriteLine("Boards created successfully");
            } else {
                Console.WriteLine("Boards already exist");
            }
            
            // Seed roadmaps
            var roadmapsExist = db.Roadmaps.Any(r => r.TenantId == devTenant);
            Console.WriteLine($"Roadmaps exist: {roadmapsExist}");
            if (!roadmapsExist)
            {
                Console.WriteLine("Creating roadmaps...");
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
                        TenantId = devTenant
                    },
                    new Roadmap
                    {
                        Id = Guid.NewGuid(),
                        Name = "In Progress",
                        Url = "in-progress",
                        Color = GenerateHexColor(),
                        Index = 1,
                        Display = true,
                        TenantId = devTenant
                    },
                    new Roadmap
                    {
                        Id = Guid.NewGuid(),
                        Name = "Completed",
                        Url = "completed",
                        Color = GenerateHexColor(),
                        Index = 2,
                        Display = true,
                        TenantId = devTenant
                    }
                };
                
                db.Roadmaps.AddRange(roadmaps);
                db.SaveChanges();
                Console.WriteLine("Roadmaps created successfully");
            } else {
                Console.WriteLine("Roadmaps already exist");
            }
            
            // Seed some sample posts if none exist
            var postsExist = db.Posts.Any(p => p.TenantId == devTenant);
            Console.WriteLine($"Posts exist: {postsExist}");
            if (!postsExist)
            {
                Console.WriteLine("Creating posts...");
                var featureBoard = db.Boards.FirstOrDefault(b => b.Name == "Feature Requests" && b.TenantId == devTenant);
                var bugBoard = db.Boards.FirstOrDefault(b => b.Name == "Bug Reports" && b.TenantId == devTenant);
                var plannedRoadmap = db.Roadmaps.FirstOrDefault(r => r.Name == "Planned" && r.TenantId == devTenant);
                
                Console.WriteLine($"Feature board found: {featureBoard != null}");
                Console.WriteLine($"Bug board found: {bugBoard != null}");
                Console.WriteLine($"Planned roadmap found: {plannedRoadmap != null}");
                
                if (featureBoard != null && bugBoard != null) {
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
                            RoadmapId = plannedRoadmap?.Id,
                            TenantId = devTenant
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
                            TenantId = devTenant
                        }
                    };
                    
                    db.Posts.AddRange(posts);
                    db.SaveChanges();
                    Console.WriteLine("Posts created successfully");
                    
                    // Add some votes to the posts
                    Console.WriteLine("Creating votes...");
                    foreach (var post in posts)
                    {
                        db.Votes.Add(new Vote
                        {
                            Id = Guid.NewGuid(),
                            UserId = adminUser.Id,
                            PostId = post.Id,
                            TenantId = devTenant
                        });
                    }
                    db.SaveChanges();
                    Console.WriteLine("Votes created successfully");
                    
                    // Add some activity and comments
                    Console.WriteLine("Creating activities and comments...");
                    foreach (var post in posts)
                    {
                        var activity = new PostActivity
                        {
                            Id = Guid.NewGuid(),
                            Type = "comment",
                            PostId = post.Id,
                            AuthorId = adminUser.Id,
                            TenantId = devTenant
                        };
                        db.PostActivities.Add(activity);
                        db.SaveChanges();
                        
                        db.Comments.Add(new Comment
                        {
                            Id = Guid.NewGuid(),
                            Body = $"This is a sample comment on the post '{post.Title}'",
                            ActivityId = activity.Id,
                            TenantId = devTenant
                        });
                        db.SaveChanges();
                    }
                    Console.WriteLine("Activities and comments created successfully");
                } else {
                    Console.WriteLine("Could not create posts because boards were not found");
                }
            } else {
                Console.WriteLine("Posts already exist");
            }
            
            Console.WriteLine("Database seeding completed successfully");
        } catch (Exception ex) {
            Console.WriteLine($"Error during seeding: {ex.Message}");
            Console.WriteLine($"Stack trace: {ex.StackTrace}");
            if (ex.InnerException != null) {
                Console.WriteLine($"Inner exception: {ex.InnerException.Message}");
            }
            throw; // Rethrow to make sure the calling code knows seeding failed
        }
    }
}