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

            // Define theme JSON string with the specified colors
            string themeJson = @"{
              ""primary"": ""#5300E8"",
              ""primary-text"": ""#FEFEFE"",
              ""secondary"": ""#D5CDFF"",
              ""secondary-text"": ""#6B12FF"",
              ""bg"": ""#0E0E11"",
              ""bg-text"": ""#FAFAFA"",
              ""bg-surface"": ""#18181B"",
              ""bg-surface-text"": ""#FAFAFA"",
              ""bg-highlight"": ""#28252D"",
              ""bg-highlight-text"": ""#FAFAFA""
            }";

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
                    Labs = "{\"comments\": true}",
                    Theme = themeJson // Add the theme
                };
                db.SiteSettings.Add(exampleSettings);
                db.SaveChanges();
                Console.WriteLine("Example site settings created successfully");
            } else {
                // Update existing example settings with theme if not already set
                if (exampleSettings.Theme == "{}" || string.IsNullOrEmpty(exampleSettings.Theme)) {
                    Console.WriteLine("Updating example site settings with theme...");
                    exampleSettings.Theme = themeJson;
                    db.SaveChanges();
                    Console.WriteLine("Example site settings theme updated successfully");
                }
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
                    CreatedAt = DateTime.UtcNow.AddDays(-30), // Add creation date
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
            
            Guid exampleFeatureBoardId = Guid.Empty;
            Guid exampleBugBoardId = Guid.Empty;
            
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
                exampleFeatureBoardId = exampleBoards[0].Id;
                exampleBugBoardId = exampleBoards[1].Id;
                Console.WriteLine("Example boards created successfully");
                
                // Add subboards
                Console.WriteLine("Creating example subboards...");
                var exampleSubBoards = new[]
                {
                    new Board
                    {
                        Id = Guid.NewGuid(),
                        Name = "UI/UX Features",
                        Url = "example-ui-ux-features",
                        Color = GenerateHexColor(),
                        Display = true,
                        ViewVoters = true,
                        ParentBoardId = exampleFeatureBoardId,
                        TenantId = devTenant2
                    },
                    new Board
                    {
                        Id = Guid.NewGuid(),
                        Name = "API Features",
                        Url = "example-api-features",
                        Color = GenerateHexColor(),
                        Display = true,
                        ViewVoters = true,
                        ParentBoardId = exampleFeatureBoardId,
                        TenantId = devTenant2
                    },
                    new Board
                    {
                        Id = Guid.NewGuid(),
                        Name = "Frontend Bugs",
                        Url = "example-frontend-bugs",
                        Color = GenerateHexColor(),
                        Display = true,
                        ViewVoters = true,
                        ParentBoardId = exampleBugBoardId,
                        TenantId = devTenant2
                    },
                    new Board
                    {
                        Id = Guid.NewGuid(),
                        Name = "Backend Bugs",
                        Url = "example-backend-bugs",
                        Color = GenerateHexColor(),
                        Display = true,
                        ViewVoters = true,
                        ParentBoardId = exampleBugBoardId,
                        TenantId = devTenant2
                    }
                };
                
                db.Boards.AddRange(exampleSubBoards);
                db.SaveChanges();
                Console.WriteLine("Example subboards created successfully");
            } else {
                // Get board IDs for later use
                var exampleFeatureBoard = db.Boards.IgnoreQueryFilters().FirstOrDefault(b => b.Name == "Example Feature Requests" && b.TenantId == devTenant2);
                var exampleBugBoard = db.Boards.IgnoreQueryFilters().FirstOrDefault(b => b.Name == "Example Bug Reports" && b.TenantId == devTenant2);
                
                if (exampleFeatureBoard != null) exampleFeatureBoardId = exampleFeatureBoard.Id;
                if (exampleBugBoard != null) exampleBugBoardId = exampleBugBoard.Id;
                
                // Check if subboards exist
                var exampleSubBoardsExist = db.Boards.IgnoreQueryFilters().Any(b => b.ParentBoardId != null && b.TenantId == devTenant2);
                
                if (!exampleSubBoardsExist && exampleFeatureBoardId != Guid.Empty && exampleBugBoardId != Guid.Empty) {
                    Console.WriteLine("Creating example subboards...");
                    var exampleSubBoards = new[]
                    {
                        new Board
                        {
                            Id = Guid.NewGuid(),
                            Name = "UI/UX Features",
                            Url = "example-ui-ux-features",
                            Color = GenerateHexColor(),
                            Display = true,
                            ViewVoters = true,
                            ParentBoardId = exampleFeatureBoardId,
                            TenantId = devTenant2
                        },
                        new Board
                        {
                            Id = Guid.NewGuid(),
                            Name = "API Features",
                            Url = "example-api-features",
                            Color = GenerateHexColor(),
                            Display = true,
                            ViewVoters = true,
                            ParentBoardId = exampleFeatureBoardId,
                            TenantId = devTenant2
                        },
                        new Board
                        {
                            Id = Guid.NewGuid(),
                            Name = "Frontend Bugs",
                            Url = "example-frontend-bugs",
                            Color = GenerateHexColor(),
                            Display = true,
                            ViewVoters = true,
                            ParentBoardId = exampleBugBoardId,
                            TenantId = devTenant2
                        },
                        new Board
                        {
                            Id = Guid.NewGuid(),
                            Name = "Backend Bugs",
                            Url = "example-backend-bugs",
                            Color = GenerateHexColor(),
                            Display = true,
                            ViewVoters = true,
                            ParentBoardId = exampleBugBoardId,
                            TenantId = devTenant2
                        }
                    };
                    
                    db.Boards.AddRange(exampleSubBoards);
                    db.SaveChanges();
                    Console.WriteLine("Example subboards created successfully");
                }
            }

            // Seed roadmap collections for both tenants first
            // For tenant 1 (main tenant)
            var roadmapCollectionsExist = db.RoadmapCollections.IgnoreQueryFilters().Any(rc => rc.TenantId == devTenant1);
            Console.WriteLine($"Roadmap collections exist for tenant 1: {roadmapCollectionsExist}");
            Guid mainProductRoadmapCollectionId = Guid.Empty;
            
            if (!roadmapCollectionsExist) {
                Console.WriteLine("Creating roadmap collections for tenant 1...");
                var collections = new[]
                {
                    new RoadmapCollection
                    {
                        Id = Guid.NewGuid(),
                        Name = "Product Roadmap",
                        Description = "Our main product development roadmap",
                        Index = 0,
                        isPublic = true,
                        TenantId = devTenant1
                    },
                    new RoadmapCollection
                    {
                        Id = Guid.NewGuid(),
                        Name = "Platform Roadmap",
                        Description = "Our platform infrastructure roadmap",
                        Index = 1,
                        isPublic = true,
                        TenantId = devTenant1
                    }
                };

                db.RoadmapCollections.AddRange(collections);
                db.SaveChanges();
                mainProductRoadmapCollectionId = collections[0].Id;
                Console.WriteLine("Roadmap collections created successfully for tenant 1");
            } else {
                // Get the first collection ID for later use
                var firstCollection = db.RoadmapCollections.IgnoreQueryFilters()
                    .FirstOrDefault(rc => rc.TenantId == devTenant1 && rc.Name == "Product Roadmap");
                if (firstCollection != null) {
                    mainProductRoadmapCollectionId = firstCollection.Id;
                }
            }

            // For tenant 2 (example tenant)
            var exampleRoadmapCollectionsExist = db.RoadmapCollections.IgnoreQueryFilters().Any(rc => rc.TenantId == devTenant2);
            Console.WriteLine($"Roadmap collections exist for tenant 2: {exampleRoadmapCollectionsExist}");
            Guid exampleProductRoadmapCollectionId = Guid.Empty;
            
            if (!exampleRoadmapCollectionsExist) {
                Console.WriteLine("Creating roadmap collections for tenant 2...");
                var exampleCollections = new[]
                {
                    new RoadmapCollection
                    {
                        Id = Guid.NewGuid(),
                        Name = "Example Product Roadmap",
                        Description = "Example product development roadmap",
                        Index = 0,
                        isPublic = true,
                        TenantId = devTenant2
                    }
                };

                db.RoadmapCollections.AddRange(exampleCollections);
                db.SaveChanges();
                exampleProductRoadmapCollectionId = exampleCollections[0].Id;
                Console.WriteLine("Roadmap collections created successfully for tenant 2");
            } else {
                // Get the first example collection ID for later use
                var firstExampleCollection = db.RoadmapCollections.IgnoreQueryFilters()
                    .FirstOrDefault(rc => rc.TenantId == devTenant2 && rc.Name == "Example Product Roadmap");
                if (firstExampleCollection != null) {
                    exampleProductRoadmapCollectionId = firstExampleCollection.Id;
                }
            }

            // Seed roadmaps for example tenant with collection ID and icons
            var exampleRoadmapsExist = db.Roadmaps.IgnoreQueryFilters().Any(r => r.TenantId == devTenant2);
            Console.WriteLine($"Example roadmaps exist: {exampleRoadmapsExist}");
            
            Guid examplePlannedRoadmapId = Guid.Empty;
            Guid exampleInProgressRoadmapId = Guid.Empty;
            
            if (!exampleRoadmapsExist && exampleProductRoadmapCollectionId != Guid.Empty) {
                Console.WriteLine("Creating example roadmaps...");
                var exampleRoadmaps = new[]
                {
                    new Roadmap
                    {
                        Id = Guid.NewGuid(),
                        Name = "Example Planned",
                        Url = "example-planned",
                        Color = GenerateHexColor(),
                        Icon = "FaClipboardList", // Add icon class
                        Index = 0,
                        Display = true,
                        RoadmapCollectionId = exampleProductRoadmapCollectionId,
                        TenantId = devTenant2
                    },
                    new Roadmap
                    {
                        Id = Guid.NewGuid(),
                        Name = "Example In Progress",
                        Url = "example-in-progress",
                        Color = GenerateHexColor(),
                        Icon = "FaTools", // Add icon class
                        Index = 1,
                        Display = true,
                        RoadmapCollectionId = exampleProductRoadmapCollectionId,
                        TenantId = devTenant2
                    },
                    new Roadmap
                    {
                        Id = Guid.NewGuid(),
                        Name = "Example Completed",
                        Url = "example-completed",
                        Color = GenerateHexColor(),
                        Icon = "FaCheckCircle", // Add icon class
                        Index = 2,
                        Display = true,
                        RoadmapCollectionId = exampleProductRoadmapCollectionId,
                        TenantId = devTenant2
                    }
                };

                db.Roadmaps.AddRange(exampleRoadmaps);
                db.SaveChanges();
                examplePlannedRoadmapId = exampleRoadmaps[0].Id;
                exampleInProgressRoadmapId = exampleRoadmaps[1].Id;
                Console.WriteLine("Example roadmaps created successfully");
            } else if (exampleRoadmapsExist && exampleProductRoadmapCollectionId != Guid.Empty) {
                // Update existing roadmaps to have a collection ID and icons if they don't already have one
                var unmappedExampleRoadmaps = db.Roadmaps.IgnoreQueryFilters()
                    .Where(r => r.TenantId == devTenant2 && r.RoadmapCollectionId == null)
                    .ToList();
                
                // Get roadmap IDs for later use
                var examplePlannedRoadmap = db.Roadmaps.IgnoreQueryFilters()
                    .FirstOrDefault(r => r.Name == "Example Planned" && r.TenantId == devTenant2);
                var exampleInProgressRoadmap = db.Roadmaps.IgnoreQueryFilters()
                    .FirstOrDefault(r => r.Name == "Example In Progress" && r.TenantId == devTenant2);
                
                if (examplePlannedRoadmap != null) examplePlannedRoadmapId = examplePlannedRoadmap.Id;
                if (exampleInProgressRoadmap != null) exampleInProgressRoadmapId = exampleInProgressRoadmap.Id;
                
                if (unmappedExampleRoadmaps.Any()) {
                    Console.WriteLine($"Updating {unmappedExampleRoadmaps.Count} existing example roadmaps with collection ID...");
                    foreach (var roadmap in unmappedExampleRoadmaps) {
                        roadmap.RoadmapCollectionId = exampleProductRoadmapCollectionId;
                    }
                    db.SaveChanges();
                    Console.WriteLine("Updated existing example roadmaps with collection ID");
                }
                
                // Add icons to roadmaps if missing
                var roadmapsWithoutIcons = db.Roadmaps.IgnoreQueryFilters()
                    .Where(r => r.TenantId == devTenant2 && string.IsNullOrEmpty(r.Icon))
                    .ToList();
                
                if (roadmapsWithoutIcons.Any()) {
                    Console.WriteLine($"Adding icons to {roadmapsWithoutIcons.Count} existing example roadmaps...");
                    foreach (var roadmap in roadmapsWithoutIcons) {
                        if (roadmap.Name.Contains("Planned")) {
                            roadmap.Icon = "FaClipboardList";
                        } else if (roadmap.Name.Contains("Progress")) {
                            roadmap.Icon = "FaTools";
                        } else if (roadmap.Name.Contains("Completed")) {
                            roadmap.Icon = "FaCheckCircle";
                        } else {
                            roadmap.Icon = "FaMapMarkedAlt";
                        }
                    }
                    db.SaveChanges();
                    Console.WriteLine("Added icons to existing example roadmaps");
                }
            } else {
                // Get roadmap IDs for later use if they exist
                var examplePlannedRoadmap = db.Roadmaps.IgnoreQueryFilters()
                    .FirstOrDefault(r => r.Name == "Example Planned" && r.TenantId == devTenant2);
                var exampleInProgressRoadmap = db.Roadmaps.IgnoreQueryFilters()
                    .FirstOrDefault(r => r.Name == "Example In Progress" && r.TenantId == devTenant2);
                
                if (examplePlannedRoadmap != null) examplePlannedRoadmapId = examplePlannedRoadmap.Id;
                if (exampleInProgressRoadmap != null) exampleInProgressRoadmapId = exampleInProgressRoadmap.Id;
                
                Console.WriteLine("Example roadmaps already exist or no collection available");
            }

            // Seed some sample posts for example tenant if none exist
            var examplePostsExist = db.Posts.IgnoreQueryFilters().Any(p => p.TenantId == devTenant2);
            Console.WriteLine($"Example posts exist: {examplePostsExist}");
            
            List<Post> examplePosts = new List<Post>();
            
            if (!examplePostsExist) {
                Console.WriteLine("Creating example posts...");
                var exampleFeatureBoard = db.Boards.IgnoreQueryFilters().FirstOrDefault(b => b.Name == "Example Feature Requests" && b.TenantId == devTenant2);
                var exampleBugBoard = db.Boards.IgnoreQueryFilters().FirstOrDefault(b => b.Name == "Example Bug Reports" && b.TenantId == devTenant2);
                var examplePlannedRoadmap = db.Roadmaps.IgnoreQueryFilters().FirstOrDefault(r => r.Name == "Example Planned" && r.TenantId == devTenant2);

                Console.WriteLine($"Example feature board found: {exampleFeatureBoard != null}");
                Console.WriteLine($"Example bug board found: {exampleBugBoard != null}");
                Console.WriteLine($"Example planned roadmap found: {examplePlannedRoadmap != null}");

                if (exampleFeatureBoard != null && exampleBugBoard != null) {
                    examplePosts = new List<Post>
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
                            CreatedAt = DateTime.UtcNow.AddDays(-14),
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
                            CreatedAt = DateTime.UtcNow.AddDays(-7),
                            TenantId = devTenant2
                        },
                        new Post
                        {
                            Id = Guid.NewGuid(),
                            Title = "Example Add export to PDF feature",
                            Slug = "example-add-export-to-pdf",
                            SlugId = Guid.NewGuid().ToString().Substring(0, 8),
                            ContentMarkdown = "Example: It would be helpful to be able to export reports as PDF files for sharing with team members who don't have access to the system.",
                            UserId = exampleAdminUser.Id,
                            BoardId = exampleFeatureBoard.Id,
                            CreatedAt = DateTime.UtcNow.AddDays(-10),
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
                            CreatedAt = DateTime.UtcNow.AddDays(-5), // Add creation date
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
                            CreatedAt = DateTime.UtcNow.AddDays(-3), // Add creation date
                            TenantId = devTenant2
                        };
                        db.PostActivities.Add(activity);
                        db.SaveChanges();

                        db.Comments.Add(new Comment {
                            Id = Guid.NewGuid(),
                            Body = $"This is a sample comment on the example post '{post.Title}'",
                            ActivityId = activity.Id,
                            CreatedAt = DateTime.UtcNow.AddDays(-3), // Add creation date
                            TenantId = devTenant2
                        });
                        db.SaveChanges();
                    }
                    Console.WriteLine("Example activities and comments created successfully");
                    
                    // Add post roadmap history if we have posts and roadmaps
                    if (examplePosts.Count > 0 && examplePlannedRoadmapId != Guid.Empty && exampleInProgressRoadmapId != Guid.Empty) {
                        Console.WriteLine("Creating example roadmap history...");
                        
                        // Move first post from null to Planned
                        db.PostRoadmapHistory.Add(new PostRoadmapHistory {
                            Id = Guid.NewGuid(),
                            PostId = examplePosts[0].Id,
                            FromRoadmapId = null,
                            ToRoadmapId = examplePlannedRoadmapId,
                            MovedAt = DateTime.UtcNow.AddDays(-12),
                            MovedByUserId = exampleAdminUser.Id,
                            TenantId = devTenant2
                        });
                        
                        // Move third post from null to Planned then to In Progress
                        db.PostRoadmapHistory.Add(new PostRoadmapHistory {
                            Id = Guid.NewGuid(),
                            PostId = examplePosts[2].Id,
                            FromRoadmapId = null,
                            ToRoadmapId = examplePlannedRoadmapId,
                            MovedAt = DateTime.UtcNow.AddDays(-8),
                            MovedByUserId = exampleAdminUser.Id,
                            TenantId = devTenant2
                        });
                        
                        db.PostRoadmapHistory.Add(new PostRoadmapHistory {
                            Id = Guid.NewGuid(),
                            PostId = examplePosts[2].Id,
                            FromRoadmapId = examplePlannedRoadmapId,
                            ToRoadmapId = exampleInProgressRoadmapId,
                            MovedAt = DateTime.UtcNow.AddDays(-4),
                            MovedByUserId = exampleAdminUser.Id,
                            TenantId = devTenant2
                        });
                        
                        // Update the third post's roadmap to match the history
                        examplePosts[2].RoadmapId = exampleInProgressRoadmapId;
                        
                        db.SaveChanges();
                        Console.WriteLine("Example roadmap history created successfully");
                    }
                    
                    // Add changelogs
                    Console.WriteLine("Creating example changelogs...");
                    
                    var changelog1 = new ChangelogItem {
                        Id = Guid.NewGuid(),
                        Title = "April 2025 Feature Updates",
                        ContentMarkdown = "We're excited to announce our latest feature updates:\n\n" +
                                         "- Improved mobile experience\n" +
                                         "- Dark mode implementation\n" +
                                         "- Performance optimizations\n\n" +
                                         "These updates address several common user requests.",
                        CreatedAt = DateTime.UtcNow.AddDays(-5),
                        PublishedAt = DateTime.UtcNow.AddDays(-4),
                        IsPublished = true,
                        TenantId = devTenant2
                    };
                    
                    // Connect the dark mode post to this changelog
                    if (examplePosts.Count > 0) {
                        changelog1.RelatedPosts.Add(examplePosts[0]);
                    }
                    
                    var changelog2 = new ChangelogItem {
                        Id = Guid.NewGuid(),
                        Title = "Upcoming PDF Export Feature",
                        ContentMarkdown = "We're working on a new PDF export feature that will allow users to easily share reports.\n\n" +
                                         "This feature is currently in development and will be released next month.",
                        CreatedAt = DateTime.UtcNow.AddDays(-2),
                        IsPublished = false,
                        TenantId = devTenant2
                    };
                    
                    // Connect the PDF export post to this changelog
                    if (examplePosts.Count > 2) {
                        changelog2.RelatedPosts.Add(examplePosts[2]);
                    }
                    
                    db.ChangelogItems.Add(changelog1);
                    db.ChangelogItems.Add(changelog2);
                    db.SaveChanges();
                    Console.WriteLine("Example changelogs created successfully");
                } else {
                    Console.WriteLine("Could not create example posts because example boards were not found");
                }
            } else {
                Console.WriteLine("Example posts already exist");
                
                // Check if we need to update posts with creation dates
                var postsWithoutDates = db.Posts.IgnoreQueryFilters()
                    .Where(p => p.TenantId == devTenant2 && p.CreatedAt == default)
                    .ToList();
                
                if (postsWithoutDates.Any()) {
                    Console.WriteLine($"Updating {postsWithoutDates.Count} existing posts with creation dates...");
                    for (int i = 0; i < postsWithoutDates.Count; i++) {
                        postsWithoutDates[i].CreatedAt = DateTime.UtcNow.AddDays(-14 + i);
                    }
                    db.SaveChanges();
                    Console.WriteLine("Updated existing posts with creation dates");
                }
                
                // Check if we need to create roadmap history
                var roadmapHistoryExists = db.PostRoadmapHistory.IgnoreQueryFilters().Any(p => p.TenantId == devTenant2);
                if (!roadmapHistoryExists) {
                    Console.WriteLine("Creating example roadmap history for existing posts...");
                    
                    var existingPosts = db.Posts.IgnoreQueryFilters()
                        .Where(p => p.TenantId == devTenant2 && p.RoadmapId != null)
                        .Take(2)
                        .ToList();
                    
                    if (existingPosts.Any() && examplePlannedRoadmapId != Guid.Empty && exampleInProgressRoadmapId != Guid.Empty) {
                        foreach (var post in existingPosts) {
                            db.PostRoadmapHistory.Add(new PostRoadmapHistory {
                                Id = Guid.NewGuid(),
                                PostId = post.Id,
                                FromRoadmapId = null,
                                ToRoadmapId = post.RoadmapId,
                                MovedAt = post.CreatedAt.AddDays(2),
                                MovedByUserId = exampleAdminUser?.Id,
                                TenantId = devTenant2
                            });
                        }
                        db.SaveChanges();
                        Console.WriteLine("Created roadmap history for existing posts");
                    }
                }
                
                // Check if we need to create changelogs
                var changelogsExist = db.ChangelogItems.IgnoreQueryFilters().Any(c => c.TenantId == devTenant2);
                if (!changelogsExist) {
                    Console.WriteLine("Creating example changelogs for existing posts...");
                    
                    var existingPosts = db.Posts.IgnoreQueryFilters()
                        .Where(p => p.TenantId == devTenant2)
                        .Take(2)
                        .ToList();
                    
                    if (existingPosts.Any()) {
                        var changelog = new ChangelogItem {
                            Id = Guid.NewGuid(),
                            Title = "April 2025 Feature Updates",
                            ContentMarkdown = "We're excited to announce our latest feature updates:\n\n" +
                                             "- Improved mobile experience\n" +
                                             "- Dark mode implementation\n" +
                                             "- Performance optimizations\n\n" +
                                             "These updates address several common user requests.",
                            CreatedAt = DateTime.UtcNow.AddDays(-5),
                            PublishedAt = DateTime.UtcNow.AddDays(-4),
                            IsPublished = true,
                            TenantId = devTenant2
                        };
                        
                        foreach (var post in existingPosts) {
                            changelog.RelatedPosts.Add(post);
                        }
                        
                        db.ChangelogItems.Add(changelog);
                        db.SaveChanges();
                        Console.WriteLine("Created example changelog for existing posts");
                    }
                }
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
                    AccentColor = "5300E8", // Updated to match primary color
                    AllowSignup = true,
                    IsPoweredBy = true,
                    Labs = "{\"comments\": true}",
                    Theme = themeJson // Add the theme
                };
                db.SiteSettings.Add(settings);
                db.SaveChanges();
                Console.WriteLine("Site settings created successfully");
            } else {
                // Update existing settings with theme if not already set
                if (settings.Theme == "{}" || string.IsNullOrEmpty(settings.Theme)) {
                    Console.WriteLine("Updating site settings with theme...");
                    settings.Theme = themeJson;
                    settings.AccentColor = "5300E8"; // Update accent color to match primary theme color
                    db.SaveChanges();
                    Console.WriteLine("Site settings theme updated successfully");
                }
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
                    CreatedAt = DateTime.UtcNow.AddDays(-30), // Add creation date
                    TenantId = devTenant1
                };
                db.Users.Add(adminUser);
                db.SaveChanges();
                Console.WriteLine("Admin user created successfully");
            } else {
                // Update user with creation date if missing
                if (adminUser.CreatedAt == default) {
                    adminUser.CreatedAt = DateTime.UtcNow.AddDays(-30);
                    db.SaveChanges();
                }
                Console.WriteLine("Admin user already exists");
            }

            // Seed boards
            var boardsExist = db.Boards.IgnoreQueryFilters().Any(b => b.TenantId == devTenant1);
            Console.WriteLine($"Boards exist: {boardsExist}");
            
            Guid featuresBoardId = Guid.Empty;
            Guid bugsBoardId = Guid.Empty;
            Guid questionsBoardId = Guid.Empty;
            
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
                
                featuresBoardId = boards[0].Id;
                bugsBoardId = boards[1].Id;
                questionsBoardId = boards[2].Id;
                
                Console.WriteLine("Boards created successfully");
                
                // Create subboards
                Console.WriteLine("Creating subboards...");
                var subBoards = new[]
                {
                    new Board
                    {
                        Id = Guid.NewGuid(),
                        Name = "UI Features",
                        Url = "ui-features",
                        Color = GenerateHexColor(),
                        Display = true,
                        ViewVoters = true,
                        ParentBoardId = featuresBoardId,
                        TenantId = devTenant1
                    },
                    new Board
                    {
                        Id = Guid.NewGuid(),
                        Name = "Backend Features",
                        Url = "backend-features",
                        Color = GenerateHexColor(),
                        Display = true,
                        ViewVoters = true,
                        ParentBoardId = featuresBoardId,
                        TenantId = devTenant1
                    },
                    new Board
                    {
                        Id = Guid.NewGuid(),
                        Name = "Frontend Bugs",
                        Url = "frontend-bugs",
                        Color = GenerateHexColor(),
                        Display = true,
                        ViewVoters = true,
                        ParentBoardId = bugsBoardId,
                        TenantId = devTenant1
                    },
                    new Board
                    {
                        Id = Guid.NewGuid(),
                        Name = "API Bugs",
                        Url = "api-bugs",
                        Color = GenerateHexColor(),
                        Display = true,
                        ViewVoters = true,
                        ParentBoardId = bugsBoardId,
                        TenantId = devTenant1
                    }
                };

                db.Boards.AddRange(subBoards);
                db.SaveChanges();
                Console.WriteLine("Subboards created successfully");
            } else {
                // Get board IDs
                var featuresBoard = db.Boards.IgnoreQueryFilters().FirstOrDefault(b => b.Name == "Feature Requests" && b.TenantId == devTenant1);
                var bugsBoard = db.Boards.IgnoreQueryFilters().FirstOrDefault(b => b.Name == "Bug Reports" && b.TenantId == devTenant1);
                var questionsBoard = db.Boards.IgnoreQueryFilters().FirstOrDefault(b => b.Name == "Questions" && b.TenantId == devTenant1);
                
                if (featuresBoard != null) featuresBoardId = featuresBoard.Id;
                if (bugsBoard != null) bugsBoardId = bugsBoard.Id;
                if (questionsBoard != null) questionsBoardId = questionsBoard.Id;
                
                // Check if subboards exist
                var subBoardsExist = db.Boards.IgnoreQueryFilters().Any(b => b.ParentBoardId != null && b.TenantId == devTenant1);
                
                if (!subBoardsExist && featuresBoardId != Guid.Empty && bugsBoardId != Guid.Empty) {
                    Console.WriteLine("Creating subboards...");
                    var subBoards = new[]
                    {
                        new Board
                        {
                            Id = Guid.NewGuid(),
                            Name = "UI Features",
                            Url = "ui-features",
                            Color = GenerateHexColor(),
                            Display = true,
                            ViewVoters = true,
                            ParentBoardId = featuresBoardId,
                            TenantId = devTenant1
                        },
                        new Board
                        {
                            Id = Guid.NewGuid(),
                            Name = "Backend Features",
                            Url = "backend-features",
                            Color = GenerateHexColor(),
                            Display = true,
                            ViewVoters = true,
                            ParentBoardId = featuresBoardId,
                            TenantId = devTenant1
                        },
                        new Board
                        {
                            Id = Guid.NewGuid(),
                            Name = "Frontend Bugs",
                            Url = "frontend-bugs",
                            Color = GenerateHexColor(),
                            Display = true,
                            ViewVoters = true,
                            ParentBoardId = bugsBoardId,
                            TenantId = devTenant1
                        },
                        new Board
                        {
                            Id = Guid.NewGuid(),
                            Name = "API Bugs",
                            Url = "api-bugs",
                            Color = GenerateHexColor(),
                            Display = true,
                            ViewVoters = true,
                            ParentBoardId = bugsBoardId,
                            TenantId = devTenant1
                        }
                    };

                    db.Boards.AddRange(subBoards);
                    db.SaveChanges();
                    Console.WriteLine("Subboards created successfully");
                }
                
                Console.WriteLine("Boards already exist");
            }

            // Seed roadmaps with collection ID and icons
            var roadmapsExist = db.Roadmaps.IgnoreQueryFilters().Any(r => r.TenantId == devTenant1);
            Console.WriteLine($"Roadmaps exist: {roadmapsExist}");
            
            Guid plannedRoadmapId = Guid.Empty;
            Guid inProgressRoadmapId = Guid.Empty;
            Guid completedRoadmapId = Guid.Empty;
            
            if (!roadmapsExist && mainProductRoadmapCollectionId != Guid.Empty) {
                Console.WriteLine("Creating roadmaps...");
                var roadmaps = new[]
                {
                    new Roadmap
                    {
                        Id = Guid.NewGuid(),
                        Name = "Planned",
                        Url = "planned",
                        Color = GenerateHexColor(),
                        Icon = "FaRegLightbulb", // Add icon class
                        Index = 0,
                        Display = true,
                        RoadmapCollectionId = mainProductRoadmapCollectionId,
                        TenantId = devTenant1
                    },
                    new Roadmap
                    {
                        Id = Guid.NewGuid(),
                        Name = "In Progress",
                        Url = "in-progress",
                        Color = GenerateHexColor(),
                        Icon = "FaCogs", // Add icon class
                        Index = 1,
                        Display = true,
                        RoadmapCollectionId = mainProductRoadmapCollectionId,
                        TenantId = devTenant1
                    },
                    new Roadmap
                    {
                        Id = Guid.NewGuid(),
                        Name = "Completed",
                        Url = "completed",
                        Color = GenerateHexColor(),
                        Icon = "FaFlag", // Add icon class
                        Index = 2,
                        Display = true,
                        RoadmapCollectionId = mainProductRoadmapCollectionId,
                        TenantId = devTenant1
                    }
                };

                db.Roadmaps.AddRange(roadmaps);
                db.SaveChanges();
                
                plannedRoadmapId = roadmaps[0].Id;
                inProgressRoadmapId = roadmaps[1].Id;
                completedRoadmapId = roadmaps[2].Id;
                
                Console.WriteLine("Roadmaps created successfully");
            } else if (roadmapsExist && mainProductRoadmapCollectionId != Guid.Empty) {
                // Update existing roadmaps to have a collection ID if they don't already have one
                var unmappedRoadmaps = db.Roadmaps.IgnoreQueryFilters()
                    .Where(r => r.TenantId == devTenant1 && r.RoadmapCollectionId == null)
                    .ToList();
                
                // Get roadmap IDs
                var plannedRoadmap = db.Roadmaps.IgnoreQueryFilters().FirstOrDefault(r => r.Name == "Planned" && r.TenantId == devTenant1);
                var inProgressRoadmap = db.Roadmaps.IgnoreQueryFilters().FirstOrDefault(r => r.Name == "In Progress" && r.TenantId == devTenant1);
                var completedRoadmap = db.Roadmaps.IgnoreQueryFilters().FirstOrDefault(r => r.Name == "Completed" && r.TenantId == devTenant1);
                
                if (plannedRoadmap != null) plannedRoadmapId = plannedRoadmap.Id;
                if (inProgressRoadmap != null) inProgressRoadmapId = inProgressRoadmap.Id;
                if (completedRoadmap != null) completedRoadmapId = completedRoadmap.Id;
                
                if (unmappedRoadmaps.Any()) {
                    Console.WriteLine($"Updating {unmappedRoadmaps.Count} existing roadmaps with collection ID...");
                    foreach (var roadmap in unmappedRoadmaps) {
                        roadmap.RoadmapCollectionId = mainProductRoadmapCollectionId;
                    }
                    db.SaveChanges();
                    Console.WriteLine("Updated existing roadmaps with collection ID");
                }
                
                // Add icons to roadmaps if missing
                var roadmapsWithoutIcons = db.Roadmaps.IgnoreQueryFilters()
                    .Where(r => r.TenantId == devTenant1 && string.IsNullOrEmpty(r.Icon))
                    .ToList();
                
                if (roadmapsWithoutIcons.Any()) {
                    Console.WriteLine($"Adding icons to {roadmapsWithoutIcons.Count} existing roadmaps...");
                    foreach (var roadmap in roadmapsWithoutIcons) {
                        if (roadmap.Name == "Planned") {
                            roadmap.Icon = "FaRegLightbulb";
                        } else if (roadmap.Name == "In Progress") {
                            roadmap.Icon = "FaCogs";
                        } else if (roadmap.Name == "Completed") {
                            roadmap.Icon = "FaFlag";
                        } else {
                            roadmap.Icon = "FaRoad";
                        }
                    }
                    db.SaveChanges();
                    Console.WriteLine("Added icons to existing roadmaps");
                }
            } else {
                // Get roadmap IDs if they exist
                var plannedRoadmap = db.Roadmaps.IgnoreQueryFilters().FirstOrDefault(r => r.Name == "Planned" && r.TenantId == devTenant1);
                var inProgressRoadmap = db.Roadmaps.IgnoreQueryFilters().FirstOrDefault(r => r.Name == "In Progress" && r.TenantId == devTenant1);
                var completedRoadmap = db.Roadmaps.IgnoreQueryFilters().FirstOrDefault(r => r.Name == "Completed" && r.TenantId == devTenant1);
                
                if (plannedRoadmap != null) plannedRoadmapId = plannedRoadmap.Id;
                if (inProgressRoadmap != null) inProgressRoadmapId = inProgressRoadmap.Id;
                if (completedRoadmap != null) completedRoadmapId = completedRoadmap.Id;
                
                Console.WriteLine("Roadmaps already exist or no collection available");
            }
            
            // Seed some sample posts if none exist
            var postsExist = db.Posts.IgnoreQueryFilters().Any(p => p.TenantId == devTenant1);
            Console.WriteLine($"Posts exist: {postsExist}");
            
            List<Post> posts = new List<Post>();
            
            if (!postsExist) {
                Console.WriteLine("Creating posts...");
                var featureBoard = db.Boards.IgnoreQueryFilters().FirstOrDefault(b => b.Name == "Feature Requests" && b.TenantId == devTenant1);
                var bugBoard = db.Boards.IgnoreQueryFilters().FirstOrDefault(b => b.Name == "Bug Reports" && b.TenantId == devTenant1);
                var plannedRoadmap = db.Roadmaps.IgnoreQueryFilters().FirstOrDefault(r => r.Name == "Planned" && r.TenantId == devTenant1);

                Console.WriteLine($"Feature board found: {featureBoard != null}");
                Console.WriteLine($"Bug board found: {bugBoard != null}");
                Console.WriteLine($"Planned roadmap found: {plannedRoadmap != null}");

                if (featureBoard != null && bugBoard != null) {
                    posts = new List<Post>
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
                            CreatedAt = DateTime.UtcNow.AddDays(-20),
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
                            CreatedAt = DateTime.UtcNow.AddDays(-15),
                            TenantId = devTenant1
                        },
                        new Post
                        {
                            Id = Guid.NewGuid(),
                            Title = "Add keyboard shortcuts",
                            Slug = "add-keyboard-shortcuts",
                            SlugId = Guid.NewGuid().ToString().Substring(0, 8),
                            ContentMarkdown = "Please add keyboard shortcuts for common actions to improve productivity.",
                            UserId = adminUser.Id,
                            BoardId = featureBoard.Id,
                            CreatedAt = DateTime.UtcNow.AddDays(-10),
                            TenantId = devTenant1
                        },
                        new Post
                        {
                            Id = Guid.NewGuid(),
                            Title = "Improve search functionality",
                            Slug = "improve-search-functionality",
                            SlugId = Guid.NewGuid().ToString().Substring(0, 8),
                            ContentMarkdown = "The current search is too basic. We need advanced filters and better relevance sorting.",
                            UserId = adminUser.Id,
                            BoardId = featureBoard.Id,
                            RoadmapId = plannedRoadmap?.Id,
                            CreatedAt = DateTime.UtcNow.AddDays(-5),
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
                            CreatedAt = DateTime.UtcNow.AddDays(-3),
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
                            CreatedAt = DateTime.UtcNow.AddDays(-2),
                            TenantId = devTenant1
                        };
                        db.PostActivities.Add(activity);
                        db.SaveChanges();

                        db.Comments.Add(new Comment {
                            Id = Guid.NewGuid(),
                            Body = $"This is a sample comment on the post '{post.Title}'",
                            ActivityId = activity.Id,
                            CreatedAt = DateTime.UtcNow.AddDays(-2),
                            TenantId = devTenant1
                        });
                        db.SaveChanges();
                    }
                    Console.WriteLine("Activities and comments created successfully");
                    
                    // Add post roadmap history
                    if (posts.Count > 0 && plannedRoadmapId != Guid.Empty && inProgressRoadmapId != Guid.Empty) {
                        Console.WriteLine("Creating roadmap history...");
                        
                        // First post - from null to planned
                        db.PostRoadmapHistory.Add(new PostRoadmapHistory {
                            Id = Guid.NewGuid(),
                            PostId = posts[0].Id,
                            FromRoadmapId = null,
                            ToRoadmapId = plannedRoadmapId,
                            MovedAt = DateTime.UtcNow.AddDays(-18),
                            MovedByUserId = adminUser.Id,
                            TenantId = devTenant1
                        });
                        
                        // Last post - from null to planned
                        db.PostRoadmapHistory.Add(new PostRoadmapHistory {
                            Id = Guid.NewGuid(),
                            PostId = posts[3].Id,
                            FromRoadmapId = null,
                            ToRoadmapId = plannedRoadmapId,
                            MovedAt = DateTime.UtcNow.AddDays(-4),
                            MovedByUserId = adminUser.Id,
                            TenantId = devTenant1
                        });
                        
                        // Move third post from null to in-progress
                        db.PostRoadmapHistory.Add(new PostRoadmapHistory {
                            Id = Guid.NewGuid(),
                            PostId = posts[2].Id,
                            FromRoadmapId = null,
                            ToRoadmapId = inProgressRoadmapId,
                            MovedAt = DateTime.UtcNow.AddDays(-8),
                            MovedByUserId = adminUser.Id,
                            TenantId = devTenant1
                        });
                        
                        // Update the third post's roadmap
                        posts[2].RoadmapId = inProgressRoadmapId;
                        
                        db.SaveChanges();
                        Console.WriteLine("Roadmap history created successfully");
                    }
                    
                    // Add changelogs
                    Console.WriteLine("Creating changelogs...");
                    
                    var changelog1 = new ChangelogItem {
                        Id = Guid.NewGuid(),
                        Title = "April 2025 Updates",
                        ContentMarkdown = "# April 2025 Updates\n\n" +
                                         "We've released several improvements this month:\n\n" +
                                         "## New Features\n" +
                                         "- Dark mode support\n" +
                                         "- Improved search functionality\n\n" +
                                         "## Bug Fixes\n" +
                                         "- Fixed mobile login issues\n" +
                                         "- Performance optimizations\n\n" +
                                         "Thank you for your continued feedback!",
                        CreatedAt = DateTime.UtcNow.AddDays(-3),
                        PublishedAt = DateTime.UtcNow.AddDays(-2),
                        IsPublished = true,
                        TenantId = devTenant1
                    };
                    
                    // Connect posts to changelog
                    if (posts.Count >= 2) {
                        changelog1.RelatedPosts.Add(posts[0]); // Dark mode
                        changelog1.RelatedPosts.Add(posts[1]); // Login issue
                    }
                    
                    var changelog2 = new ChangelogItem {
                        Id = Guid.NewGuid(),
                        Title = "Coming Soon: Keyboard Shortcuts",
                        ContentMarkdown = "# Keyboard Shortcuts Preview\n\n" +
                                         "We're working on adding keyboard shortcuts to improve productivity.\n\n" +
                                         "## Planned shortcuts:\n" +
                                         "- `Ctrl+K` - Quick search\n" +
                                         "- `Ctrl+N` - New item\n" +
                                         "- `Ctrl+S` - Save\n" +
                                         "- `Esc` - Close modal\n\n" +
                                         "This feature is currently in development and will be available next month.",
                        CreatedAt = DateTime.UtcNow.AddDays(-1),
                        IsPublished = false,
                        TenantId = devTenant1
                    };
                    
                    // Connect keyboard shortcuts post to changelog
                    if (posts.Count >= 3) {
                        changelog2.RelatedPosts.Add(posts[2]); // Keyboard shortcuts
                    }
                    
                    db.ChangelogItems.Add(changelog1);
                    db.ChangelogItems.Add(changelog2);
                    db.SaveChanges();
                    Console.WriteLine("Changelogs created successfully");
                } else {
                    Console.WriteLine("Could not create posts because boards were not found");
                }
            } else {
                Console.WriteLine("Posts already exist");
                
                // Check if we need to update existing posts with dates
                var postsWithoutDates = db.Posts.IgnoreQueryFilters()
                    .Where(p => p.TenantId == devTenant1 && p.CreatedAt == default)
                    .ToList();
                
                if (postsWithoutDates.Any()) {
                    Console.WriteLine($"Updating {postsWithoutDates.Count} existing posts with creation dates...");
                    for (int i = 0; i < postsWithoutDates.Count; i++) {
                        postsWithoutDates[i].CreatedAt = DateTime.UtcNow.AddDays(-20 + (i * 5));
                    }
                    db.SaveChanges();
                    Console.WriteLine("Updated existing posts with creation dates");
                }
                
                // Check if we need to update comments with dates
                var commentsWithoutDates = db.Comments.IgnoreQueryFilters()
                    .Where(c => c.TenantId == devTenant1 && c.CreatedAt == default)
                    .ToList();
                
                if (commentsWithoutDates.Any()) {
                    Console.WriteLine($"Updating {commentsWithoutDates.Count} existing comments with creation dates...");
                    foreach (var comment in commentsWithoutDates) {
                        comment.CreatedAt = DateTime.UtcNow.AddDays(-2);
                    }
                    db.SaveChanges();
                    Console.WriteLine("Updated existing comments with creation dates");
                }
                
                // Check if we need to update activities with dates
                var activitiesWithoutDates = db.PostActivities.IgnoreQueryFilters()
                    .Where(a => a.TenantId == devTenant1 && a.CreatedAt == default)
                    .ToList();
                
                if (activitiesWithoutDates.Any()) {
                    Console.WriteLine($"Updating {activitiesWithoutDates.Count} existing activities with creation dates...");
                    foreach (var activity in activitiesWithoutDates) {
                        activity.CreatedAt = DateTime.UtcNow.AddDays(-2);
                    }
                    db.SaveChanges();
                    Console.WriteLine("Updated existing activities with creation dates");
                }
                
                // Check if we need to update votes with dates
                var votesWithoutDates = db.Votes.IgnoreQueryFilters()
                    .Where(v => v.TenantId == devTenant1 && v.CreatedAt == default)
                    .ToList();
                
                if (votesWithoutDates.Any()) {
                    Console.WriteLine($"Updating {votesWithoutDates.Count} existing votes with creation dates...");
                    foreach (var vote in votesWithoutDates) {
                        vote.CreatedAt = DateTime.UtcNow.AddDays(-3);
                    }
                    db.SaveChanges();
                    Console.WriteLine("Updated existing votes with creation dates");
                }
                
                // Check if we need to create roadmap history
                var roadmapHistoryExists = db.PostRoadmapHistory.IgnoreQueryFilters().Any(p => p.TenantId == devTenant1);
                if (!roadmapHistoryExists) {
                    Console.WriteLine("Creating roadmap history for existing posts...");
                    
                    var existingPostsWithRoadmaps = db.Posts.IgnoreQueryFilters()
                        .Where(p => p.TenantId == devTenant1 && p.RoadmapId != null)
                        .Take(3)
                        .ToList();
                    
                    if (existingPostsWithRoadmaps.Any()) {
                        foreach (var post in existingPostsWithRoadmaps) {
                            db.PostRoadmapHistory.Add(new PostRoadmapHistory {
                                Id = Guid.NewGuid(),
                                PostId = post.Id,
                                FromRoadmapId = null,
                                ToRoadmapId = post.RoadmapId,
                                MovedAt = post.CreatedAt.AddDays(2),
                                MovedByUserId = adminUser.Id,
                                TenantId = devTenant1
                            });
                        }
                        db.SaveChanges();
                        Console.WriteLine("Created roadmap history for existing posts");
                    }
                }
                
                // Check if we need to create changelogs
                var changelogsExist = db.ChangelogItems.IgnoreQueryFilters().Any(c => c.TenantId == devTenant1);
                if (!changelogsExist) {
                    Console.WriteLine("Creating changelogs for existing posts...");
                    
                    var existingPosts = db.Posts.IgnoreQueryFilters()
                        .Where(p => p.TenantId == devTenant1)
                        .Take(3)
                        .ToList();
                    
                    if (existingPosts.Any()) {
                        var changelog = new ChangelogItem {
                            Id = Guid.NewGuid(),
                            Title = "Recent Product Updates",
                            ContentMarkdown = "# Recent Product Updates\n\n" +
                                             "We've recently released several improvements based on your feedback:\n\n" +
                                             "## Features and Fixes\n" +
                                             "- Various UI improvements\n" +
                                             "- Bug fixes and performance enhancements\n\n" +
                                             "Thanks for your continued support!",
                            CreatedAt = DateTime.UtcNow.AddDays(-3),
                            PublishedAt = DateTime.UtcNow.AddDays(-2),
                            IsPublished = true,
                            TenantId = devTenant1
                        };
                        
                        foreach (var post in existingPosts) {
                            changelog.RelatedPosts.Add(post);
                        }
                        
                        db.ChangelogItems.Add(changelog);
                        db.SaveChanges();
                        Console.WriteLine("Created changelog for existing posts");
                    }
                }
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