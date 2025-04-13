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
}