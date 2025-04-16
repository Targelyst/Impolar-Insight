using System.ComponentModel.DataAnnotations;

namespace ImpolarInsight.Models;

public abstract class Entity {

    [GraphQLIgnore]
    public required Guid TenantId { get; set; }
    public Tenant Tenant { get; set; } = null!;

}

public abstract class KeyedEntity : Entity {

    [Key]
    public Guid Id { get; set; }

}