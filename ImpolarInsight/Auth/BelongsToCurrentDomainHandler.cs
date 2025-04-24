using System.Security.Claims;
using ImpolarInsight.Models;
using ImpolarInsight.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace ImpolarInsight.Auth;

public class BelongsToCurrentDomainHandler(IUserService userService, UserManager<User> userManager)
    : AuthorizationHandler<BelongsToCurrentDomainRequirement> {

    protected override async Task HandleRequirementAsync(
        AuthorizationHandlerContext context,
        BelongsToCurrentDomainRequirement requirement
    ) {
        var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId is null) {
            return;
        }

        var currentUser = await userManager
            .Users
            .Where(u => u.Id == Guid.Parse(userId))
            .Include(u => u.Tenant)
            .FirstOrDefaultAsync();
        if (currentUser is null || currentUser.Tenant is null) {
            return;
        }

        if (userService.TenantDomain == currentUser.Tenant.Domain) {
            context.Succeed(requirement);
        } else {
            context.Fail();
        }
    }

}