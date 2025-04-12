using System.Text.Json;
using System.Text.Json.Serialization;
using ImpolarInsight.Models;

namespace ImpolarInsight.Models.Workflow;

// Base Node class that all node types inherit from
public abstract class Node : KeyedEntity
{
    public required string Type { get; set; }
    public required string Label { get; set; }
    public double PositionX { get; set; }
    public double PositionY { get; set; }
    
    [JsonIgnore]
    public Guid WorkflowId { get; set; }
    
    [JsonIgnore]
    public Workflow Workflow { get; set; } = null!;
    
    // Method to be implemented by derived classes that defines the node's execution logic
    public abstract Task<NodeExecutionResult> ExecuteAsync(NodeExecutionContext context);
}

// Result of node execution
public class NodeExecutionResult
{
    public bool Success { get; set; }
    public JsonDocument? Output { get; set; }
    public string? Error { get; set; }
}

// Context passed to nodes during execution
public class NodeExecutionContext
{
    public Dictionary<string, JsonDocument> Inputs { get; set; } = new();
    public IServiceProvider Services { get; set; } = null!;
}

// Edge connecting two nodes
public class Edge : KeyedEntity
{
    public required string SourceNodeId { get; set; }
    public required string TargetNodeId { get; set; }
    public required string SourceHandle { get; set; }
    public required string TargetHandle { get; set; }
    
    [JsonIgnore]
    public Guid WorkflowId { get; set; }
    
    [JsonIgnore]
    public Workflow Workflow { get; set; } = null!;
}

// Workflow representing the entire automation flow
public class Workflow : KeyedEntity
{
    public required string Name { get; set; }
    public string? Description { get; set; }
    public bool IsActive { get; set; }
    
    public List<Node> Nodes { get; set; } = new();
    public List<Edge> Edges { get; set; } = new();
}

// Node execution history
public class NodeExecution : KeyedEntity
{
    public required Guid WorkflowExecutionId { get; set; }
    public required Guid NodeId { get; set; }
    public required DateTime StartedAt { get; set; }
    public DateTime? CompletedAt { get; set; }
    public bool? Success { get; set; }
    public string? Error { get; set; }
    public JsonDocument? Input { get; set; }
    public JsonDocument? Output { get; set; }
    
    [JsonIgnore]
    public WorkflowExecution WorkflowExecution { get; set; } = null!;
}

// Workflow execution history
public class WorkflowExecution : KeyedEntity
{
    public required Guid WorkflowId { get; set; }
    public required DateTime StartedAt { get; set; }
    public DateTime? CompletedAt { get; set; }
    public string Status { get; set; } = "Running";
    
    [JsonIgnore]
    public Workflow Workflow { get; set; } = null!;
    
    public List<NodeExecution> NodeExecutions { get; set; } = new();
}