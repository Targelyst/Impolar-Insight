using System.Security.Claims;
using Microsoft.Extensions.Options;
using ImpolarInsight.Configuration;

namespace ImpolarInsight.Services;

public interface IUserService {
    public string TenantDomain { get; }
}

public class UserInformationRetrievalException(
    string message
) : Exception(message) { }

public class DevelopmentUserService : IUserService {

    public string TenantDomain => "localhost";

}

public class UserService(
    IOptions<AuthConfiguration> configuration,
    IHttpContextAccessor httpContext
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

}