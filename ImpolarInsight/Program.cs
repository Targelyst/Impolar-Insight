using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using ImpolarInsight.Auth;
using ImpolarInsight.Configuration;
using ImpolarInsight.Data;
using ImpolarInsight.GraphQL;
using ImpolarInsight.Models;
using ImpolarInsight.Models.Workflow;
using ImpolarInsight.Models.Workflow.NodeTypes;
using ImpolarInsight.Services;
using ImpolarInsight.Services.Temporal;
using Temporalio.Client;
using Temporalio.Worker;

var builder = WebApplication.CreateBuilder(args);

// Add configurations
builder.Services.AddOptions<DatabaseConfiguration>()
  .Bind(builder.Configuration.GetSection(DatabaseConfiguration.Section))
  .ValidateDataAnnotations()
  .ValidateOnStart();

builder.Services.AddOptions<AuthConfiguration>()
  .Bind(builder.Configuration.GetSection(AuthConfiguration.Section))
  .ValidateDataAnnotations()
  .ValidateOnStart();

builder.Services.AddOptions<TemporalConfiguration>()
  .Bind(builder.Configuration.GetSection(TemporalConfiguration.Section))
  .ValidateDataAnnotations()
  .ValidateOnStart();

// Add database context
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

// Add Temporal client and services
builder.Services.AddSingleton<ITemporalClient>(sp => {
    var config = sp.GetRequiredService<IOptions<TemporalConfiguration>>().Value;
    return TemporalClient.Connection(new TemporalClientConnectOptions {
        TargetHost = config.ServiceUrl,
        Namespace = config.Namespace
    }).GetAwaiter().GetResult();
});

builder.Services.AddSingleton<ITemporalWorker>(sp => {
    var client = sp.GetRequiredService<ITemporalClient>();
    var config = sp.GetRequiredService<IOptions<TemporalConfiguration>>().Value;
    var factory = sp.GetRequiredService<IServiceScopeFactory>();
    
    // Create a scope to register workflows and activities
    using var scope = factory.CreateScope();
    
    return new TemporalWorkerBuilder(client, config.TaskQueue)
        .AddWorkflow<AutomationWorkflow>()
        .AddActivity(sp => new WorkflowActivities(
            sp.GetRequiredService<IServiceScopeFactory>(),
            sp.GetRequiredService<ILogger<WorkflowActivities>>()))
        .BuildAsync().GetAwaiter().GetResult();
});

builder.Services.AddScoped<WorkflowExecutionService>();

// Conditionally configure authentication
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

// Configure GraphQL
builder.Services
    .AddGraphQLServer()
    .AddAuthorization()
    .AddProjections()
    .AddFiltering()
    .AddSorting()
    .AddMutationConventions(applyToAllMutations: true)
    .RegisterDbContextFactory<ImpolarInsightContext>()
    .AddQueryType()
    .AddTypeExtension<WorkflowQueries>()
    .AddMutationType()
    .AddTypeExtension<WorkflowMutations>()
    // Add our custom types
    .AddType<WorkflowType>()
    .AddType<NodeType>()
    .AddType<TimeTriggerNodeType>()
    .AddType<DelayNodeType>()
    .AddType<HttpRequestNodeType>()
    .AddType<EdgeType>()
    .ModifyRequestOptions(
        opt => opt.IncludeExceptionDetails = builder.Environment.IsDevelopment()
    )
    .ModifyPagingOptions(
        opt => {
            opt.IncludeTotalCount = true;
            opt.MaxPageSize = 100;
        }
    );

// Enable CORS for development
if (builder.Environment.IsDevelopment())
{
    builder.Services.AddCors(options =>
    {
        options.AddDefaultPolicy(policy =>
        {
            policy.AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
    });
}

var app = builder.Build();

// Start Temporal worker
if (!app.Environment.IsDevelopment())
{
    var worker = app.Services.GetRequiredService<ITemporalWorker>();
    await worker.StartAsync();
}

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment()) {
    app.UseCors();
    app.UseSeeding();
} else {
    app.UseAuthentication();
    app.UseAuthorization();
}

app.MapGraphQL();

app.RunWithGraphQLCommands(args);