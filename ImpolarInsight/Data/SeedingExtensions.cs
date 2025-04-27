using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace ImpolarInsight.Data;

public static class SeedingExtensions {
    public static IHost UseSeeding(this IHost host) {
        using (var scope = host.Services.CreateScope()) {
            var db = scope
                .ServiceProvider
                .GetRequiredService<ImpolarInsightContext>();

            // Apply any pending migrations
            db.Database.Migrate();

            // Seed development data
            DevelopmentSeeder.Seed(db);
        }

        return host;
    }

    public static async Task SeedRoles(this IHost host) {
        using var scope = host.Services.CreateScope();
        var roleManager = scope
            .ServiceProvider
            .GetRequiredService<RoleManager<IdentityRole>>();

        if (!await roleManager.RoleExistsAsync("Administrator")) {
            await roleManager.CreateAsync(new("Administrator"));
        }

        if (!await roleManager.RoleExistsAsync("User")) {
            await roleManager.CreateAsync(new("User"));
        }
    }
}