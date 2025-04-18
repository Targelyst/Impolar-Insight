using ImpolarInsight.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace ImpolarInsight.Data;

public class DevelopmentSeeder {

    private static string HashPassword(string password) {
        using (var sha256 = SHA256.Create()) {
            byte[] hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            return Convert.ToBase64String(hashedBytes);
        }
    }

    private static string GenerateHexColor() {
        Random random = new Random();
        return string.Format("{0:X6}", random.Next(0x1000000));
    }

    public static void Seed(ImpolarInsightContext db) {
        try {
            Console.WriteLine("Starting database seeding...");
            Guid devTenant1 = Guid.Parse("00000000-0000-0000-0000-000000000001");

            // Check if tenant exists first
            var tenant = db.Tenants.IgnoreQueryFilters().FirstOrDefault(t => t.Id == devTenant1);
            if (tenant == null) {
                Console.WriteLine("Creating new tenant...");
                tenant = new() {
                    Id = devTenant1,
                    Domain = "localhost",
                };

                db.Tenants.Add(tenant);
                // Save changes and ensure the tenant is committed
                db.SaveChanges();
                Console.WriteLine("Tenant created successfully");
            } else {
                Console.WriteLine("Tenant already exists");
            }

            Guid devTenant2 = Guid.Parse("00000000-0000-0000-0000-000000000002");

            // Check if example tenant exists first
            var exampleTenantEntity = db.Tenants.IgnoreQueryFilters().FirstOrDefault(t => t.Id == devTenant2);
            if (exampleTenantEntity == null) {
                Console.WriteLine("Creating new example tenant...");
                exampleTenantEntity = new() {
                    Id = devTenant2,
                    Domain = "example.com",
                };

                db.Tenants.Add(exampleTenantEntity);
                db.SaveChanges();
                Console.WriteLine("Example tenant created successfully");
            } else {
                Console.WriteLine("Example tenant already exists");
            }

            // Seed site settings for example tenant if it doesn't exist
            var exampleSettings = db.SiteSettings.IgnoreQueryFilters().FirstOrDefault(s => s.TenantId == devTenant2);
            Console.WriteLine($"Example site settings check result: {exampleSettings != null}");
            if (exampleSettings == null) {
                Console.WriteLine("Creating example site settings...");
                exampleSettings = new SiteSettings {
                    Id = Guid.NewGuid(),
                    TenantId = devTenant2,
                    Title = "Example Insight",
                    Description = "Example description for demonstration purposes",
                    AccentColor = "ff5733",
                    AllowSignup = true,
                    IsPoweredBy = true,
                    Labs = "{\"comments\": true}"
                };
                db.SiteSettings.Add(exampleSettings);
                db.SaveChanges();
                Console.WriteLine("Example site settings created successfully");
            } else {
                Console.WriteLine("Example site settings already exist");
            }

            // Seed admin user for example tenant
            var exampleAdminUser = db.Users.IgnoreQueryFilters().FirstOrDefault(u => u.Email == "admin@example.com" && u.TenantId == devTenant2);
            Console.WriteLine($"Example admin user check result: {exampleAdminUser != null}");
            if (exampleAdminUser == null) {
                Console.WriteLine("Creating example admin user...");
                exampleAdminUser = new User {
                    Id = Guid.NewGuid(),
                    Name = "Example Admin",
                    Email = "admin@example.com",
                    Username = "exampleadmin",
                    Password = HashPassword("example123"),
                    IsVerified = true,
                    IsOwner = true,
                    TenantId = devTenant2
                };
                db.Users.Add(exampleAdminUser);
                db.SaveChanges();
                Console.WriteLine("Example admin user created successfully");
            } else {
                Console.WriteLine("Example admin user already exists");
            }

            // Seed boards for example tenant
            var exampleBoardsExist = db.Boards.IgnoreQueryFilters().Any(b => b.TenantId == devTenant2);
            Console.WriteLine($"Example boards exist: {exampleBoardsExist}");
            if (!exampleBoardsExist) {
                Console.WriteLine("Creating example boards...");
                var exampleBoards = new[]
                {
                    new Board
                    {
                        Id = Guid.NewGuid(),
                        Name = "Example Feature Requests",
                        Url = "example-feature-requests",
                        Color = GenerateHexColor(),
                        Display = true,
                        ViewVoters = true,
                        TenantId = devTenant2
                    },
                    new Board
                    {
                        Id = Guid.NewGuid(),
                        Name = "Example Bug Reports",
                        Url = "example-bug-reports",
                        Color = GenerateHexColor(),
                        Display = true,
                        ViewVoters = true,
                        TenantId = devTenant2
                    }
                };

                db.Boards.AddRange(exampleBoards);
                db.SaveChanges();
                Console.WriteLine("Example boards created successfully");
            } else {
                Console.WriteLine("Example boards already exist");
            }

            // Seed roadmaps for example tenant
            var exampleRoadmapsExist = db.Roadmaps.IgnoreQueryFilters().Any(r => r.TenantId == devTenant2);
            Console.WriteLine($"Example roadmaps exist: {exampleRoadmapsExist}");
            if (!exampleRoadmapsExist) {
                Console.WriteLine("Creating example roadmaps...");
                var exampleRoadmaps = new[]
                {
                    new Roadmap
                    {
                        Id = Guid.NewGuid(),
                        Name = "Example Planned",
                        Url = "example-planned",
                        Color = GenerateHexColor(),
                        Index = 0,
                        Display = true,
                        TenantId = devTenant2
                    },
                    new Roadmap
                    {
                        Id = Guid.NewGuid(),
                        Name = "Example In Progress",
                        Url = "example-in-progress",
                        Color = GenerateHexColor(),
                        Index = 1,
                        Display = true,
                        TenantId = devTenant2
                    }
                };

                db.Roadmaps.AddRange(exampleRoadmaps);
                db.SaveChanges();
                Console.WriteLine("Example roadmaps created successfully");
            } else {
                Console.WriteLine("Example roadmaps already exist");
            }

            // In DevelopmentSeeder.Seed method, add this after the roadmaps section
            // Seed roadmap collections
            var roadmapCollectionsExist = db.RoadmapCollections.IgnoreQueryFilters().Any(rc => rc.TenantId == devTenant1);
            Console.WriteLine($"Roadmap collections exist: {roadmapCollectionsExist}");
            if (!roadmapCollectionsExist) {
                Console.WriteLine("Creating roadmap collections...");
                var collections = new[]
                {
                    new RoadmapCollection
                    {
                        Id = Guid.NewGuid(),
                        Name = "Product Roadmap",
                        Description = "Our main product development roadmap",
                        Index = 0,
                        Display = true,
                        TenantId = devTenant1
                    },
                    new RoadmapCollection
                    {
                        Id = Guid.NewGuid(),
                        Name = "Platform Roadmap",
                        Description = "Our platform infrastructure roadmap",
                        Index = 1,
                        Display = true,
                        TenantId = devTenant1
                    }
                };

                db.RoadmapCollections.AddRange(collections);
                db.SaveChanges();
                Console.WriteLine("Roadmap collections created successfully");
                
                // Assign existing roadmaps to the first collection
                var roadmaps = db.Roadmaps.IgnoreQueryFilters().Where(r => r.TenantId == devTenant1).ToList();
                foreach (var roadmap in roadmaps) {
                    roadmap.RoadmapCollectionId = collections[0].Id;
                }
                db.SaveChanges();
                Console.WriteLine("Assigned existing roadmaps to collection successfully");
            }

            // Seed some sample posts for example tenant if none exist
            var examplePostsExist = db.Posts.IgnoreQueryFilters().Any(p => p.TenantId == devTenant2);
            Console.WriteLine($"Example posts exist: {examplePostsExist}");
            if (!examplePostsExist) {
                Console.WriteLine("Creating example posts...");
                var exampleFeatureBoard = db.Boards.IgnoreQueryFilters().FirstOrDefault(b => b.Name == "Example Feature Requests" && b.TenantId == devTenant2);
                var exampleBugBoard = db.Boards.IgnoreQueryFilters().FirstOrDefault(b => b.Name == "Example Bug Reports" && b.TenantId == devTenant2);
                var examplePlannedRoadmap = db.Roadmaps.IgnoreQueryFilters().FirstOrDefault(r => r.Name == "Example Planned" && r.TenantId == devTenant2);

                Console.WriteLine($"Example feature board found: {exampleFeatureBoard != null}");
                Console.WriteLine($"Example bug board found: {exampleBugBoard != null}");
                Console.WriteLine($"Example planned roadmap found: {examplePlannedRoadmap != null}");

                if (exampleFeatureBoard != null && exampleBugBoard != null) {
                    var examplePosts = new[]
                    {
                        new Post
                        {
                            Id = Guid.NewGuid(),
                            Title = "Example Add dark mode support",
                            Slug = "example-add-dark-mode-support",
                            SlugId = Guid.NewGuid().ToString().Substring(0, 8),
                            ContentMarkdown = "Example: It would be great to have a dark mode option to reduce eye strain when using the app at night.",
                            UserId = exampleAdminUser.Id,
                            BoardId = exampleFeatureBoard.Id,
                            RoadmapId = examplePlannedRoadmap?.Id,
                            TenantId = devTenant2
                        },
                        new Post
                        {
                            Id = Guid.NewGuid(),
                            Title = "Example Fix login issue on mobile devices",
                            Slug = "example-fix-login-issue-on-mobile-devices",
                            SlugId = Guid.NewGuid().ToString().Substring(0, 8),
                            ContentMarkdown = "Example: I can't log in using my iPhone. The login button doesn't do anything when tapped.",
                            UserId = exampleAdminUser.Id,
                            BoardId = exampleBugBoard.Id,
                            TenantId = devTenant2
                        }
                    };

                    db.Posts.AddRange(examplePosts);
                    db.SaveChanges();
                    Console.WriteLine("Example posts created successfully");

                    // Add some votes to the example posts
                    Console.WriteLine("Creating example votes...");
                    foreach (var post in examplePosts) {
                        db.Votes.Add(new Vote {
                            Id = Guid.NewGuid(),
                            UserId = exampleAdminUser.Id,
                            PostId = post.Id,
                            TenantId = devTenant2
                        });
                    }
                    db.SaveChanges();
                    Console.WriteLine("Example votes created successfully");

                    // Add some activity and comments for example posts
                    Console.WriteLine("Creating example activities and comments...");
                    foreach (var post in examplePosts) {
                        var activity = new PostActivity {
                            Id = Guid.NewGuid(),
                            Type = "comment",
                            PostId = post.Id,
                            AuthorId = exampleAdminUser.Id,
                            TenantId = devTenant2
                        };
                        db.PostActivities.Add(activity);
                        db.SaveChanges();

                        db.Comments.Add(new Comment {
                            Id = Guid.NewGuid(),
                            Body = $"This is a sample comment on the example post '{post.Title}'",
                            ActivityId = activity.Id,
                            TenantId = devTenant2
                        });
                        db.SaveChanges();
                    }
                    Console.WriteLine("Example activities and comments created successfully");
                } else {
                    Console.WriteLine("Could not create example posts because example boards were not found");
                }
            } else {
                Console.WriteLine("Example posts already exist");
            }
            var settings = db.SiteSettings.IgnoreQueryFilters().FirstOrDefault(s => s.TenantId == devTenant1);
            Console.WriteLine($"Site settings check result: {settings != null}");
            if (settings == null) {
                Console.WriteLine("Creating site settings...");
                settings = new SiteSettings {
                    Id = Guid.NewGuid(),
                    TenantId = devTenant1,
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
            var adminUser = db.Users.IgnoreQueryFilters().FirstOrDefault(u => u.Email == "admin@example.com" && u.TenantId == devTenant1);
            Console.WriteLine($"Admin user check result: {adminUser != null}");
            if (adminUser == null) {
                Console.WriteLine("Creating admin user...");
                adminUser = new User {
                    Id = Guid.NewGuid(),
                    Name = "Admin",
                    Email = "admin@example.com",
                    Username = "admin",
                    Password = HashPassword("admin123"),
                    IsVerified = true,
                    IsOwner = true,
                    TenantId = devTenant1
                };
                db.Users.Add(adminUser);
                db.SaveChanges();
                Console.WriteLine("Admin user created successfully");
            } else {
                Console.WriteLine("Admin user already exists");
            }

            // Seed boards
            var boardsExist = db.Boards.IgnoreQueryFilters().Any(b => b.TenantId == devTenant1);
            Console.WriteLine($"Boards exist: {boardsExist}");
            if (!boardsExist) {
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
                        TenantId = devTenant1
                    },
                    new Board
                    {
                        Id = Guid.NewGuid(),
                        Name = "Bug Reports",
                        Url = "bug-reports",
                        Color = GenerateHexColor(),
                        Display = true,
                        ViewVoters = true,
                        TenantId = devTenant1
                    },
                    new Board
                    {
                        Id = Guid.NewGuid(),
                        Name = "Questions",
                        Url = "questions",
                        Color = GenerateHexColor(),
                        Display = true,
                        ViewVoters = true,
                        TenantId = devTenant1
                    }
                };

                db.Boards.AddRange(boards);
                db.SaveChanges();
                Console.WriteLine("Boards created successfully");
            } else {
                Console.WriteLine("Boards already exist");
            }

            // Seed roadmaps
            var roadmapsExist = db.Roadmaps.IgnoreQueryFilters().Any(r => r.TenantId == devTenant1);
            Console.WriteLine($"Roadmaps exist: {roadmapsExist}");
            if (!roadmapsExist) {
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
                        TenantId = devTenant1
                    },
                    new Roadmap
                    {
                        Id = Guid.NewGuid(),
                        Name = "In Progress",
                        Url = "in-progress",
                        Color = GenerateHexColor(),
                        Index = 1,
                        Display = true,
                        TenantId = devTenant1
                    },
                    new Roadmap
                    {
                        Id = Guid.NewGuid(),
                        Name = "Completed",
                        Url = "completed",
                        Color = GenerateHexColor(),
                        Index = 2,
                        Display = true,
                        TenantId = devTenant1
                    }
                };

                db.Roadmaps.AddRange(roadmaps);
                db.SaveChanges();
                Console.WriteLine("Roadmaps created successfully");
            } else {
                Console.WriteLine("Roadmaps already exist");
            }
            

            // Seed some sample posts if none exist
            var postsExist = db.Posts.IgnoreQueryFilters().Any(p => p.TenantId == devTenant1);
            Console.WriteLine($"Posts exist: {postsExist}");
            if (!postsExist) {
                Console.WriteLine("Creating posts...");
                var featureBoard = db.Boards.IgnoreQueryFilters().FirstOrDefault(b => b.Name == "Feature Requests" && b.TenantId == devTenant1);
                var bugBoard = db.Boards.IgnoreQueryFilters().FirstOrDefault(b => b.Name == "Bug Reports" && b.TenantId == devTenant1);
                var plannedRoadmap = db.Roadmaps.IgnoreQueryFilters().FirstOrDefault(r => r.Name == "Planned" && r.TenantId == devTenant1);

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
                            TenantId = devTenant1
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
                            TenantId = devTenant1
                        }
                    };

                    db.Posts.AddRange(posts);
                    db.SaveChanges();
                    Console.WriteLine("Posts created successfully");

                    // Add some votes to the posts
                    Console.WriteLine("Creating votes...");
                    foreach (var post in posts) {
                        db.Votes.Add(new Vote {
                            Id = Guid.NewGuid(),
                            UserId = adminUser.Id,
                            PostId = post.Id,
                            TenantId = devTenant1
                        });
                    }
                    db.SaveChanges();
                    Console.WriteLine("Votes created successfully");

                    // Add some activity and comments
                    Console.WriteLine("Creating activities and comments...");
                    foreach (var post in posts) {
                        var activity = new PostActivity {
                            Id = Guid.NewGuid(),
                            Type = "comment",
                            PostId = post.Id,
                            AuthorId = adminUser.Id,
                            TenantId = devTenant1
                        };
                        db.PostActivities.Add(activity);
                        db.SaveChanges();

                        db.Comments.Add(new Comment {
                            Id = Guid.NewGuid(),
                            Body = $"This is a sample comment on the post '{post.Title}'",
                            ActivityId = activity.Id,
                            TenantId = devTenant1
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