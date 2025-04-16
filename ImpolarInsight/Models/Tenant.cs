using System.ComponentModel.DataAnnotations;

namespace ImpolarInsight.Models;

public class Tenant {

    [Key]
    public Guid Id  { get; set; }

    public required string Domain { get; set; }

    public List<SiteSettings> SiteSettings { get; set; } = [];
    public List<Board> Boards { get; set; } = [];

}