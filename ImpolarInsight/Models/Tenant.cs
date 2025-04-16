using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace ImpolarInsight.Models;

[Index(nameof(Domain), IsUnique = true)]
public class Tenant {

    [Key]
    public Guid Id { get; set; }

    public required string Domain { get; set; }

    public List<SiteSettings> SiteSettings { get; set; } = [];
    public List<Board> Boards { get; set; } = [];

}