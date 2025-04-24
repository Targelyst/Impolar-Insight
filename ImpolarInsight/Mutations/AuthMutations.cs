// using HotChocolate.Authorization;
// using ImpolarInsight.Data;
// using ImpolarInsight.Models;
// using Microsoft.AspNetCore.Identity;
//
// namespace ImpolarInsight.Queries;
//
// public record LoginResult(string Token);
//
// [MutationType]
// public static class AuthMutations {
//
//     [AllowAnonymous]
//     public static async Task<LoginResult> Login(
//         SignInManager<IdentityUser> signInManager,
//         UserManager<IdentityUser> userManager,
//         string username,
//         string password,
//         bool rememberMe
//     ) {
//         signInManager.AuthenticationScheme = IdentityConstants.BearerScheme;
//         var result = await signInManager.PasswordSignInAsync(username, password, rememberMe, false);
//
//         return new("????");
//     }
//
// }