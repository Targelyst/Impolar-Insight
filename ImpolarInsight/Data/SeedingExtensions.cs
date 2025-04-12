namespace ImpolarInsight.Data;

public static class SeedingExtensions {
    public static IHost UseSeeding(this IHost host) {
        using (var scope = host.Services.CreateScope()) {
            var db = scope
                .ServiceProvider
                .GetRequiredService<ImpolarInsightContext>();

            // Apply database migrations
            db.Database.EnsureCreated();
            
            // Seed development data
            DevelopmentSeeder.Seed(db);
            
            // Seed sample workflow
            WorkflowSeeder.SeedSampleWorkflow(db);
        }

        return host;
    }
}