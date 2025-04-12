using System.Text.Json;
using Temporalio.Client;
using Temporalio.Worker;
using ImpolarInsight.Models.Workflow;

namespace ImpolarInsight.Services.Temporal;

// Configuration for Temporal
public class TemporalConfiguration
{
    public const string Section = "Temporal";
    
    public required string ServiceUrl { get; set; } = "localhost:7233";
    public string Namespace { get; set; } = "default";
    public string TaskQueue { get; set; } = "impolar-automation";
}

// Service for interacting with Temporal
public class WorkflowExecutionService
{
    private readonly ITemporalClient _client;
    private readonly ILogger<WorkflowExecutionService> _logger;
    private readonly IServiceScopeFactory _serviceScopeFactory;
    private readonly string _taskQueue;
    
    public WorkflowExecutionService(
        ITemporalClient client,
        ILogger<WorkflowExecutionService> logger,
        IServiceScopeFactory serviceScopeFactory,
        IOptions<TemporalConfiguration> config)
    {
        _client = client;
        _logger = logger;
        _serviceScopeFactory = serviceScopeFactory;
        _taskQueue = config.Value.TaskQueue;
    }
    
    // Start a workflow execution
    public async Task<string> StartWorkflowAsync(Guid workflowId)
    {
        using var scope = _serviceScopeFactory.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<ImpolarInsightContext>();
        
        var workflow = await db.Workflows
            .Include(w => w.Nodes)
            .Include(w => w.Edges)
            .FirstOrDefaultAsync(w => w.Id == workflowId);
            
        if (workflow == null)
        {
            throw new Exception($"Workflow with ID {workflowId} not found");
        }
        
        // Convert workflow to a serializable format for Temporal
        var workflowData = new WorkflowExecutionData
        {
            WorkflowId = workflow.Id,
            Tenant = workflow.Tenant,
            Name = workflow.Name
        };
        
        // Execute workflow via Temporal
        var workflowRunId = await _client.StartWorkflowAsync(
            (AutomationWorkflow wf) => wf.RunAsync(workflowData),
            new WorkflowOptions
            {
                Id = $"workflow-{workflowId}-{Guid.NewGuid()}",
                TaskQueue = _taskQueue
            });
            
        _logger.LogInformation("Started workflow {WorkflowId} with run ID {RunId}", workflowId, workflowRunId);
        
        return workflowRunId;
    }
    
    // Get workflow execution status
    public async Task<WorkflowExecutionStatus> GetExecutionStatusAsync(string runId)
    {
        var handle = _client.GetWorkflowHandle(runId);
        var status = await handle.GetStatusAsync();
        
        return new WorkflowExecutionStatus
        {
            RunId = runId,
            Status = status.Status.ToString(),
            StartTime = status.StartTime,
            EndTime = status.EndTime
        };
    }
}

// Data passed to Temporal workflow
public record WorkflowExecutionData
{
    public required Guid WorkflowId { get; init; }
    public required string Tenant { get; init; }
    public required string Name { get; init; }
}

// Status of a workflow execution returned to clients
public class WorkflowExecutionStatus
{
    public required string RunId { get; set; }
    public required string Status { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime? EndTime { get; set; }
}

// Temporal workflow implementation
[Workflow]
public class AutomationWorkflow
{
    // Main workflow execution method
    [WorkflowRun]
    public async Task RunAsync(WorkflowExecutionData data)
    {
        // Create workflow execution record
        var executionId = await Workflow.ExecuteActivityAsync(
            (WorkflowActivities act) => act.CreateExecutionRecordAsync(data),
            new ActivityOptions { StartToCloseTimeout = TimeSpan.FromMinutes(1) });
            
        try
        {
            // Get workflow details
            var workflowDetails = await Workflow.ExecuteActivityAsync(
                (WorkflowActivities act) => act.GetWorkflowDetailsAsync(data.WorkflowId, data.Tenant),
                new ActivityOptions { StartToCloseTimeout = TimeSpan.FromMinutes(1) });
                
            // Find trigger nodes (entry points)
            var triggerNodes = workflowDetails.Nodes
                .Where(n => n.Type.Contains("Trigger"))
                .ToList();
                
            if (!triggerNodes.Any())
            {
                throw new ApplicationException("Workflow has no trigger nodes");
            }
            
            // Execute each trigger node
            foreach (var triggerNode in triggerNodes)
            {
                await Workflow.ExecuteActivityAsync(
                    (WorkflowActivities act) => act.ExecuteNodeAsync(
                        executionId,
                        triggerNode.Id,
                        null),
                    new ActivityOptions { StartToCloseTimeout = TimeSpan.FromMinutes(5) });
                    
                // Follow the graph from the trigger node
                await FollowWorkflowPathAsync(executionId, workflowDetails, triggerNode.Id, null);
            }
            
            // Mark workflow as completed
            await Workflow.ExecuteActivityAsync(
                (WorkflowActivities act) => act.CompleteExecutionAsync(executionId, true, null),
                new ActivityOptions { StartToCloseTimeout = TimeSpan.FromMinutes(1) });
        }
        catch (Exception ex)
        {
            // Mark workflow as failed
            await Workflow.ExecuteActivityAsync(
                (WorkflowActivities act) => act.CompleteExecutionAsync(executionId, false, ex.Message),
                new ActivityOptions { StartToCloseTimeout = TimeSpan.FromMinutes(1) });
                
            throw;
        }
    }
    
    // Helper method to follow the workflow path after executing a node
    private async Task FollowWorkflowPathAsync(
        Guid executionId,
        WorkflowDetails workflowDetails,
        Guid sourceNodeId,
        JsonDocument? input)
    {
        // Find outgoing edges from the current node
        var edges = workflowDetails.Edges
            .Where(e => e.SourceNodeId == sourceNodeId.ToString())
            .ToList();
            
        // For each outgoing edge, execute the target node
        foreach (var edge in edges)
        {
            var targetNodeId = Guid.Parse(edge.TargetNodeId);
            var targetNode = workflowDetails.Nodes.FirstOrDefault(n => n.Id == targetNodeId);
            
            if (targetNode == null)
            {
                continue;
            }
            
            // Execute the node
            var result = await Workflow.ExecuteActivityAsync(
                (WorkflowActivities act) => act.ExecuteNodeAsync(
                    executionId,
                    targetNodeId,
                    input),
                new ActivityOptions { StartToCloseTimeout = TimeSpan.FromMinutes(5) });
                
            // If successful, continue following the path
            if (result.Success)
            {
                await FollowWorkflowPathAsync(executionId, workflowDetails, targetNodeId, result.Output);
            }
        }
    }
}

// WorkflowDetails returned from the database
public class WorkflowDetails
{
    public required Guid Id { get; set; }
    public required string Name { get; set; }
    public required List<NodeDetails> Nodes { get; set; }
    public required List<EdgeDetails> Edges { get; set; }
}

public class NodeDetails
{
    public required Guid Id { get; set; }
    public required string Type { get; set; }
}

public class EdgeDetails
{
    public required string SourceNodeId { get; set; }
    public required string TargetNodeId { get; set; }
    public required string SourceHandle { get; set; }
    public required string TargetHandle { get; set; }
}

// Temporal activities implementation
[Activity]
public class WorkflowActivities
{
    private readonly IServiceScopeFactory _serviceScopeFactory;
    private readonly ILogger<WorkflowActivities> _logger;
    
    public WorkflowActivities(
        IServiceScopeFactory serviceScopeFactory,
        ILogger<WorkflowActivities> logger)
    {
        _serviceScopeFactory = serviceScopeFactory;
        _logger = logger;
    }
    
    // Create a workflow execution record in the database
    [ActivityMethod]
    public async Task<Guid> CreateExecutionRecordAsync(WorkflowExecutionData data)
    {
        using var scope = _serviceScopeFactory.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<ImpolarInsightContext>();
        var userService = scope.ServiceProvider.GetRequiredService<IUserService>();
        
        var execution = new WorkflowExecution
        {
            Id = Guid.NewGuid(),
            WorkflowId = data.WorkflowId,
            StartedAt = DateTime.UtcNow,
            Status = "Running",
            Tenant = data.Tenant
        };
        
        db.WorkflowExecutions.Add(execution);
        await db.SaveChangesAsync();
        
        return execution.Id;
    }
    
    // Get workflow details from the database
    [ActivityMethod]
    public async Task<WorkflowDetails> GetWorkflowDetailsAsync(Guid workflowId, string tenant)
    {
        using var scope = _serviceScopeFactory.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<ImpolarInsightContext>();
        
        var workflow = await db.Workflows
            .Include(w => w.Nodes)
            .Include(w => w.Edges)
            .FirstOrDefaultAsync(w => w.Id == workflowId && w.Tenant == tenant);
            
        if (workflow == null)
        {
            throw new Exception($"Workflow with ID {workflowId} not found");
        }
        
        return new WorkflowDetails
        {
            Id = workflow.Id,
            Name = workflow.Name,
            Nodes = workflow.Nodes.Select(n => new NodeDetails
            {
                Id = n.Id,
                Type = n.Type
            }).ToList(),
            Edges = workflow.Edges.Select(e => new EdgeDetails
            {
                SourceNodeId = e.SourceNodeId,
                TargetNodeId = e.TargetNodeId,
                SourceHandle = e.SourceHandle,
                TargetHandle = e.TargetHandle
            }).ToList()
        };
    }
    
    // Execute a node
    [ActivityMethod]
    public async Task<NodeExecutionResult> ExecuteNodeAsync(
        Guid executionId,
        Guid nodeId,
        JsonDocument? input)
    {
        using var scope = _serviceScopeFactory.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<ImpolarInsightContext>();
        
        // Find the node
        var node = await db.Nodes.FindAsync(nodeId);
        if (node == null)
        {
            throw new Exception($"Node with ID {nodeId} not found");
        }
        
        // Create node execution record
        var nodeExecution = new NodeExecution
        {
            Id = Guid.NewGuid(),
            WorkflowExecutionId = executionId,
            NodeId = nodeId,
            StartedAt = DateTime.UtcNow,
            Input = input,
            Tenant = node.Tenant
        };
        
        db.NodeExecutions.Add(nodeExecution);
        await db.SaveChangesAsync();
        
        try
        {
            // Prepare execution context
            var context = new NodeExecutionContext
            {
                Services = scope.ServiceProvider
            };
            
            if (input != null)
            {
                context.Inputs["default"] = input;
            }
            
            // Execute the node
            var result = await node.ExecuteAsync(context);
            
            // Update node execution record
            nodeExecution.CompletedAt = DateTime.UtcNow;
            nodeExecution.Success = result.Success;
            nodeExecution.Output = result.Output;
            nodeExecution.Error = result.Error;
            
            await db.SaveChangesAsync();
            
            return result;
        }
        catch (Exception ex)
        {
            // Update node execution record with the error
            nodeExecution.CompletedAt = DateTime.UtcNow;
            nodeExecution.Success = false;
            nodeExecution.Error = ex.Message;
            
            await db.SaveChangesAsync();
            
            return new NodeExecutionResult
            {
                Success = false,
                Error = ex.Message
            };
        }
    }
    
    // Complete a workflow execution
    [ActivityMethod]
    public async Task CompleteExecutionAsync(Guid executionId, bool success, string? error)
    {
        using var scope = _serviceScopeFactory.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<ImpolarInsightContext>();
        
        var execution = await db.WorkflowExecutions.FindAsync(executionId);
        if (execution == null)
        {
            throw new Exception($"Workflow execution with ID {executionId} not found");
        }
        
        execution.CompletedAt = DateTime.UtcNow;
        execution.Status = success ? "Completed" : "Failed";
        
        await db.SaveChangesAsync();
    }
}