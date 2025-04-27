// using System.ComponentModel.DataAnnotations;
// using AspNet.Security.OAuth.Keycloak;
//
// namespace ImpolarInsight.Configuration;
//
// public class KeycloakAuthConfiguration {
//     [Required]
//     public required string ClientId { get; set; }
//     [Required]
//     public required string ClientSecret { get; set; }
//     [Required]
//     public required string Realm { get; set; }
//     [Required]
//     public required int VersionMajor { get; set; }
//     [Required]
//     public required int VersionMinor { get; set; }
//
//     public KeycloakAuthenticationAccessType AccessType { get; set; } = KeycloakAuthenticationAccessType.Confidential;
//
//     public string? Domain { get; set; }
//     public string? BaseAddress { get; set; }
// }
//
// public class AuthProviderConfiguration {
//     public KeycloakAuthConfiguration? Keycloak { get; set; }
// }
//
// public class AuthConfiguration {
//     public const string Section = "Auth";
//
//     [Required]
//     public required string MetadataAddress { get; set; }
//
//     [Required]
//     public required string Audience { get; set; }
//
//     public AuthProviderConfiguration Providers { get; set; } = new();
//
//     public string TenantClaim { get; set; } = "tenant";
//     public string RolesClaim { get; set; } = "feedback-roles";
//     public string AdminRole { get; set; } = "feedback-admin";
// }