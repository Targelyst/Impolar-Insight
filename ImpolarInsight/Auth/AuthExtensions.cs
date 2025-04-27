// using ImpolarInsight.Configuration;
//
// namespace ImpolarInsight.Auth;
//
// public static class AuthExtensions {
//
//     public static IServiceCollection AddAuthProviders(this IServiceCollection services, AuthConfiguration authConfiguration) {
//         var servicesAuthConfig = services.AddAuthentication();
//
//         if (authConfiguration.Providers.Keycloak is not null) {
//             var keycloakConfig = authConfiguration.Providers.Keycloak;
//
//             servicesAuthConfig.AddKeycloak(opts => {
//                 opts.ClientId = keycloakConfig.ClientId;
//                 opts.ClientSecret = keycloakConfig.ClientSecret;
//                 opts.Realm = keycloakConfig.Realm;
//                 opts.Version = new Version(keycloakConfig.VersionMajor, keycloakConfig.VersionMinor);
//                 opts.AccessType = keycloakConfig.AccessType;
//
//                 if (keycloakConfig.Domain is not null) {
//                     opts.Domain = keycloakConfig.Domain;
//                 }
//
//                 if (keycloakConfig.BaseAddress is not null) {
//                     opts.BaseAddress = new Uri(keycloakConfig.BaseAddress);
//                 }
//             });
//         }
//
//         return services;
//     }
//
// }