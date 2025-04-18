using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using ImpolarInsight.Configuration;
using ImpolarInsight.Data;
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

var authConfig = builder.Configuration.GetSection(AuthConfiguration.Section).Get<AuthConfiguration>()
    ?? throw new Exception($"Could not get configuration section {AuthConfiguration.Section}");

builder.Services.AddDbContextFactory<ImpolarInsightContext>(opt => {
    var c = builder.Configuration.GetSection(DatabaseConfiguration.Section).Get<DatabaseConfiguration>()
      ?? throw new Exception($"Could not get configuration section {DatabaseConfiguration.Section}");

    opt.UseNpgsql(
        $"Host={c.Host};Port={c.Port};Database={c.Database};Username={c.User};Password={c.Password}"
    );

    if (builder.Environment.IsDevelopment()) {
        opt.EnableDetailedErrors().EnableSensitiveDataLogging();
    }
});

builder.Services
    .AddHttpContextAccessor();
// .AddScoped<IAuthorizationHandler, HasTenantHandler>();

if (!builder.Environment.IsDevelopment()) {
    builder.Services
        .AddScoped<IUserService, UserService>()
        .AddAuthentication()
        .AddJwtBearer(options => {
            options.RequireHttpsMetadata = false;
            options.MetadataAddress = authConfig.MetadataAddress;

            options.TokenValidationParameters = new TokenValidationParameters {
                ValidAudience = authConfig.Audience,
                RoleClaimType = authConfig.RolesClaim,
            };
        });

    builder.Services.AddAuthorization(opts => {
        var tenantsUsersAuthorizationPolicyBuilder = new AuthorizationPolicyBuilder()
            .RequireClaim(authConfig.TenantClaim)
            .RequireAuthenticatedUser();

        var tenantsAdminsAuthorizationPolicyBuilder = new AuthorizationPolicyBuilder()
            .RequireClaim(authConfig.TenantClaim)
            .RequireRole(authConfig.AdminRole)
            .RequireAuthenticatedUser();

        opts.AddPolicy("user", tenantsUsersAuthorizationPolicyBuilder.Build());
        opts.AddPolicy("admin", tenantsAdminsAuthorizationPolicyBuilder.Build());

        // opts.DefaultPolicy = tenantsAdminsAuthorizationPolicyBuilder.Build();
        // opts.FallbackPolicy = opts.DefaultPolicy;
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
    .AddTypes()
    // .AddType<Board>()
    // .AddType<Post>()
    // .AddType<Vote>()
    // .AddType<Roadmap>()
    // .AddType<User>()
    // .AddType<Comment>()
    // .AddType<PostActivity>()
    // .AddType<SiteSettings>()
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