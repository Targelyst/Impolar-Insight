using System.ComponentModel.DataAnnotations;

namespace ImpolarInsight.Models;

public abstract class Entity {

    [GraphQLIgnore]
    public required string Tenant { get; set; }

}

public abstract class KeyedEntity : Entity {

    [Key]
    public Guid Id { get; set; }

}