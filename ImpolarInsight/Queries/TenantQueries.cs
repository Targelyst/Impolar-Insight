using Microsoft.EntityFrameworkCore;
using ImpolarInsight.Data;
using ImpolarInsight.Models;

namespace ImpolarInsight.Queries;

[QueryType]
public static class TenantQueries {
    [UseFirstOrDefault]
    [UseProjection]
    public static IQueryable<Tenant> GetTenant(
        ImpolarInsightContext db
    ) => db.Tenants;
}