using ImpolarInsight.Data;
using Microsoft.EntityFrameworkCore;
using ImpolarInsight.Models;

namespace ImpolarInsight.Services;

public interface IUserService {
    public string TenantDomain { get; }
    public Task<Tenant> GetTenant();
}

public class UserInformationRetrievalException(
    string message
) : Exception(message) { }

public class DevelopmentUserService : IUserService {
    private const string developmentTenantDomain = "localhost";

    public string TenantDomain => developmentTenantDomain;

    public Task<Tenant> GetTenant() => Task.FromResult<Tenant>(new() {
        Id = Guid.Parse("00000000-0000-0000-0000-000000000001"),
        Domain = developmentTenantDomain
    });
}

public class UserService(
    IHttpContextAccessor httpContext,
    IDbContextFactory<ImpolarInsightContext> dbContextFactory
) : IUserService {

    public string TenantDomain {
        get {
            var context = httpContext.HttpContext
                ?? throw new UserInformationRetrievalException("HttpContext could not be retrieved");

            var origin = context.Request.Headers.Origin.FirstOrDefault()
                ?? throw new UserInformationRetrievalException("Origin header could not be retrieved");

            var originUri = new Uri(origin);

            return originUri.Host;
        }
    }

    public async Task<Tenant> GetTenant() {
        using var db = await dbContextFactory.CreateDbContextAsync();

        var domain = this.TenantDomain;
        var tenant = await db.Tenants.Where(t => t.Domain == domain).FirstOrDefaultAsync();

        return tenant
            ?? throw new UserInformationRetrievalException($"Tenant with domain '{domain}' not found");
    }
}