using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using ImpolarInsight.Auth;
using ImpolarInsight.Configuration;
using ImpolarInsight.Data;
using ImpolarInsight.Models;
using ImpolarInsight.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOptions<DatabaseConfiguration>()
  .Bind(builder.Configuration.GetSection(DatabaseConfiguration.Section))
  .ValidateDataAnnotations()
  .ValidateOnStart();

builder.Services.AddOptions<AuthConfiguration>()
  .Bind(builder.Configuration.GetSection(AuthConfiguration.Section))
  .ValidateDataAnnotations()
  .ValidateOnStart();

builder.Services.AddDbContextFactory<ImpolarInsightContext>(opt => {
    var c = builder.Configuration.GetSection(DatabaseConfiguration.Section).Get<DatabaseConfiguration>()
      ?? throw new Exception($"Could not get configuration section {DatabaseConfiguration.Section}");

    opt.UseNpgsql(
        $"Host={c.Host};Port={c.Port};Database={c.Database};Username={c.User};Password={c.Password}"
    );
});

builder.Services
    .AddHttpContextAccessor()
    .AddScoped<IAuthorizationHandler, HasTenantHandler>();

if (!builder.Environment.IsDevelopment()) {
    builder.Services
        .AddScoped<IUserService, UserService>()
        .AddAuthentication()
        .AddJwtBearer("TENANTS", options => {
            var c = builder.Configuration.GetSection(AuthConfiguration.Section).Get<AuthConfiguration>()
                ?? throw new Exception($"Could not get configuration section {AuthConfiguration.Section}");

            options.RequireHttpsMetadata = false;
            options.MetadataAddress = c.MetadataAddress;

            options.TokenValidationParameters = new TokenValidationParameters {
                ValidAudience = c.Audience,
            };
        });

    builder.Services.AddAuthorization(opts => {
        var tenantsAuthorizationPolicyBuilder = new AuthorizationPolicyBuilder("TENANTS")
            .AddRequirements(new HasTenantRequirement())
            .RequireAuthenticatedUser();

        opts.DefaultPolicy = tenantsAuthorizationPolicyBuilder.Build();
        opts.FallbackPolicy = opts.DefaultPolicy;
    });
} else {
    builder.Services.AddScoped<IUserService, DevelopmentUserService>();
}

// Add this to your Program.cs in the builder.Services.AddGraphQLServer() section

builder.Services
    .AddGraphQLServer()
    .AddAuthorization()
    .AddProjections()
    .AddFiltering()
    .AddSorting()
    .AddMutationConventions(applyToAllMutations: true)
    .RegisterDbContextFactory<ImpolarInsightContext>()
    .AddType<Project>()
    .AddType<Board>()
    .AddType<Post>()
    .AddType<Vote>()
    .AddType<Roadmap>()
    .AddType<User>()
    .AddType<Comment>()
    .AddType<PostActivity>()
    .AddType<SiteSettings>()
    .ModifyRequestOptions(
        opt => opt.IncludeExceptionDetails = builder.Environment.IsDevelopment()
    )
    .ModifyPagingOptions(
        opt => {
            opt.IncludeTotalCount = true;
            opt.MaxPageSize = 100;
        }
    );

var app = builder.Build();

if (app.Environment.IsDevelopment()) {
    app.UseSeeding();
} else {
    app.UseAuthentication();
    app.UseAuthorization();
}

app.MapGraphQL();

app.RunWithGraphQLCommands(args);