using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using ImpolarInsight.Configuration;
using ImpolarInsight.Data;
using ImpolarInsight.Services;
using ImpolarInsight.Models;
using ImpolarInsight.Auth;
using Aufy.Core;
using Aufy.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

var builder = WebApplication.CreateBuilder(args);

// Add CORS policy
builder.Services.AddCors(options => {
    options.AddDefaultPolicy(policy => {
        policy
            .WithOrigins(
                "http://localhost:5173",     // Vite development server
                "http://localhost:4173"      // Vite preview server
            )
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
    });
});

builder.Services.AddOptions<DatabaseConfiguration>()
  .Bind(builder.Configuration.GetSection(DatabaseConfiguration.Section))
  .ValidateDataAnnotations()
  .ValidateOnStart();

// builder.Services.AddOptions<AuthConfiguration>()
//   .Bind(builder.Configuration.GetSection(AuthConfiguration.Section))
//   .ValidateDataAnnotations()
//   .ValidateOnStart();

// var authConfig = builder.Configuration.GetSection(AuthConfiguration.Section).Get<AuthConfiguration>()
//     ?? throw new Exception($"Could not get configuration section {AuthConfiguration.Section}");

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

// builder.Services
//     .AddAuthentication(o => {
//         o.DefaultScheme = IdentityConstants.ApplicationScheme;
//         o.DefaultSignInScheme = IdentityConstants.ExternalScheme;
//     })
//     .AddIdentityCookies(o => { });
//
// builder.Services
//     .AddIdentityCore<User>(o => {
//         o.Stores.MaxLengthForKeys = 128;
//         // o.SignIn.RequireConfirmedAccount = true;
//     })
//     .AddDefaultTokenProviders();
//
// builder.Services
//     .AddIdentity<User, IdentityRole>();

builder.Services
    .AddAufy<User>(builder.Configuration, opts => {
        opts.DefaultRoles = ["User"];
    })
    .AddEntityFrameworkStore<ImpolarInsightContext, User>();

builder.Services
    .AddScoped<IAuthorizationHandler, BelongsToCurrentDomainHandler>()
    .AddAuthorization(opts => {
        var userPolicyBuilder = new AuthorizationPolicyBuilder()
            .RequireAuthenticatedUser()
            .RequireRole("User");

        var adminPolicyBuilder = new AuthorizationPolicyBuilder()
            .RequireAuthenticatedUser()
            .RequireRole("Administrator")
            .AddRequirements(new BelongsToCurrentDomainRequirement());

        opts.AddPolicy("user", userPolicyBuilder.Build());
        opts.AddPolicy("admin", adminPolicyBuilder.Build());

        // opts.DefaultPolicy = tenantsAdminsAuthorizationPolicyBuilder.Build();
        // opts.FallbackPolicy = opts.DefaultPolicy;
    });

if (!builder.Environment.IsDevelopment()) {
    // builder.Services
    //     .AddScoped<IUserService, UserService>()
    //     .AddAuthentication()
    //     .AddJwtBearer(options => {
    //         options.RequireHttpsMetadata = false;
    //         options.MetadataAddress = authConfig.MetadataAddress;
    //
    //         options.TokenValidationParameters = new TokenValidationParameters {
    //             ValidAudience = authConfig.Audience,
    //             RoleClaimType = authConfig.RolesClaim,
    //         };
    //     });

    // builder.Services.AddAuthorization(opts => {
    //     var tenantsUsersAuthorizationPolicyBuilder = new AuthorizationPolicyBuilder()
    //         .RequireClaim(authConfig.TenantClaim)
    //         .RequireAuthenticatedUser();
    //
    //     var tenantsAdminsAuthorizationPolicyBuilder = new AuthorizationPolicyBuilder()
    //         .RequireClaim(authConfig.TenantClaim)
    //         .RequireRole(authConfig.AdminRole)
    //         .RequireAuthenticatedUser();
    //
    //     opts.AddPolicy("user", tenantsUsersAuthorizationPolicyBuilder.Build());
    //     opts.AddPolicy("admin", tenantsAdminsAuthorizationPolicyBuilder.Build());
    //
    //     // opts.DefaultPolicy = tenantsAdminsAuthorizationPolicyBuilder.Build();
    //     // opts.FallbackPolicy = opts.DefaultPolicy;
    // });
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

// Enable CORS
app.UseCors();

if (app.Environment.IsDevelopment()) {
    app.UseSeeding();
} else {
    // app.UseAuthentication();
    // app.UseAuthorization();
}

await app.SeedRoles();

app.UseAuthentication();
app.UseAuthorization();

app.MapGraphQL();
app.MapAufyEndpoints();

app.RunWithGraphQLCommands(args);