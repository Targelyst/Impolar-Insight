using ImpolarInsight.Models.Workflow;
using ImpolarInsight.Models.Workflow.NodeTypes;

namespace ImpolarInsight.Data;

public static class WorkflowSeeder {
    public static void SeedSampleWorkflow(ImpolarInsightContext db) {
        var sampleWorkflowId = Guid.Parse("00000000-0000-0000-0000-000000000100");
        var existingSampleWorkflow = db.Workflows.Find(sampleWorkflowId);
        
        if (existingSampleWorkflow is null) {
            // Create a sample workflow
            var workflow = new Workflow {
                Id = sampleWorkflowId,
                Name = "Sample HTTP Request Workflow",
                Description = "A simple workflow that sends an HTTP request after a delay",
                IsActive = true,
                Tenant = "development-tenant"
            };
            
            db.Workflows.Add(workflow);
            db.SaveChanges();
            
            // Create nodes
            var triggerNode = new TimeTriggerNode {
                Id = Guid.Parse("00000000-0000-0000-0000-000000000101"),
                Type = "TimeTriggerNode",
                Label = "Daily Trigger",
                PositionX = 100,
                PositionY = 100,
                WorkflowId = workflow.Id,
                CronExpression = "0 0 * * *", // Daily at midnight
                Tenant = "development-tenant"
            };
            
            var delayNode = new DelayNode {
                Id = Guid.Parse("00000000-0000-0000-0000-000000000102"),
                Type = "DelayNode",
                Label = "Wait 5 Minutes",
                PositionX = 400,
                PositionY = 100,
                WorkflowId = workflow.Id,
                DelaySeconds = 300, // 5 minutes
                Tenant = "development-tenant"
            };
            
            var httpNode = new HttpRequestNode {
                Id = Guid.Parse("00000000-0000-0000-0000-000000000103"),
                Type = "HttpRequestNode",
                Label = "Send Request",
                PositionX = 700,
                PositionY = 100,
                WorkflowId = workflow.Id,
                Url = "https://jsonplaceholder.typicode.com/posts",
                Method = "GET",
                Tenant = "development-tenant"
            };
            
            db.Nodes.AddRange(triggerNode, delayNode, httpNode);
            db.SaveChanges();
            
            // Create edges to connect the nodes
            var edge1 = new Edge {
                Id = Guid.Parse("00000000-0000-0000-0000-000000000104"),
                SourceNodeId = triggerNode.Id.ToString(),
                TargetNodeId = delayNode.Id.ToString(),
                SourceHandle = "default",
                TargetHandle = "default",
                WorkflowId = workflow.Id,
                Tenant = "development-tenant"
            };
            
            var edge2 = new Edge {
                Id = Guid.Parse("00000000-0000-0000-0000-000000000105"),
                SourceNodeId = delayNode.Id.ToString(),
                TargetNodeId = httpNode.Id.ToString(),
                SourceHandle = "default",
                TargetHandle = "default",
                WorkflowId = workflow.Id,
                Tenant = "development-tenant"
            };
            
            db.Edges.AddRange(edge1, edge2);
            db.SaveChanges();
        }
    }
}