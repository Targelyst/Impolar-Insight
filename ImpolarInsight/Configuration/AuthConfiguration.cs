using System.ComponentModel.DataAnnotations;

namespace ImpolarInsight.Configuration;

public class AuthConfiguration {
    public const string Section = "Auth";

    [Required]
    public required string MetadataAddress { get; set; }

    [Required]
    public required string Audience { get; set; }

    public string TenantClaim { get; set; } = "tenant";
    public string RolesClaim { get; set; } = "feedback-roles";
    public string AdminRole { get; set; } = "feedback-admin";
}