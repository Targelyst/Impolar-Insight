using HotChocolate.Types;
using HotChocolate.Data;
using ImpolarInsight.Models.Workflow;
using ImpolarInsight.Models.Workflow.NodeTypes;
using ImpolarInsight.Services.Temporal;

namespace ImpolarInsight.GraphQL;

// GraphQL type for Workflow
public class WorkflowType : ObjectType<Workflow>
{
    protected override void Configure(IObjectTypeDescriptor<Workflow> descriptor)
    {
        descriptor.Field(f => f.Id).Type<NonNullType<IdType>>();
        descriptor.Field(f => f.Name).Type<NonNullType<StringType>>();
        descriptor.Field(f => f.Description).Type<StringType>();
        descriptor.Field(f => f.IsActive).Type<NonNullType<BooleanType>>();
        
        descriptor
            .Field(f => f.Nodes)
            .Type<NonNullType<ListType<NonNullType<NodeType>>>>()
            .UsePaging()
            .UseFiltering()
            .UseSorting();
            
        descriptor
            .Field(f => f.Edges)
            .Type<NonNullType<ListType<NonNullType<EdgeType>>>>()
            .UsePaging()
            .UseFiltering()
            .UseSorting();
    }
}

// GraphQL type for Node using interfaces for different node types
[UnionType("Node")]
public interface INodeType
{
    Guid Id { get; }
    string Type { get; }
    string Label { get; }
    double PositionX { get; }
    double PositionY { get; }
}

// GraphQL type for Node
public class NodeType : InterfaceType<Node>
{
    protected override void Configure(IInterfaceTypeDescriptor<Node> descriptor)
    {
        descriptor.Field(f => f.Id).Type<NonNullType<IdType>>();
        descriptor.Field(f => f.Type).Type<NonNullType<StringType>>();
        descriptor.Field(f => f.Label).Type<NonNullType<StringType>>();
        descriptor.Field(f => f.PositionX).Type<NonNullType<FloatType>>();
        descriptor.Field(f => f.PositionY).Type<NonNullType<FloatType>>();
        
        // Define implementations for each node type
        descriptor.ImplementedBy<TimeTriggerNode>();
        descriptor.ImplementedBy<DelayNode>();
        descriptor.ImplementedBy<HttpRequestNode>();
    }
}

// GraphQL type for TimeTriggerNode
public class TimeTriggerNodeType : ObjectType<TimeTriggerNode>
{
    protected override void Configure(IObjectTypeDescriptor<TimeTriggerNode> descriptor)
    {
        descriptor.Implements<NodeType>();
        
        descriptor.Field(f => f.Id).Type<NonNullType<IdType>>();
        descriptor.Field(f => f.Type).Type<NonNullType<StringType>>();
        descriptor.Field(f => f.Label).Type<NonNullType<StringType>>();
        descriptor.Field(f => f.PositionX).Type<NonNullType<FloatType>>();
        descriptor.Field(f => f.PositionY).Type<NonNullType<FloatType>>();
        
        // Type-specific fields
        descriptor.Field(f => f.CronExpression).Type<NonNullType<StringType>>();
    }
}

// GraphQL type for DelayNode
public class DelayNodeType : ObjectType<DelayNode>
{
    protected override void Configure(IObjectTypeDescriptor<DelayNode> descriptor)
    {
        descriptor.Implements<NodeType>();
        
        descriptor.Field(f => f.Id).Type<NonNullType<IdType>>();
        descriptor.Field(f => f.Type).Type<NonNullType<StringType>>();
        descriptor.Field(f => f.Label).Type<NonNullType<StringType>>();
        descriptor.Field(f => f.PositionX).Type<NonNullType<FloatType>>();
        descriptor.Field(f => f.PositionY).Type<NonNullType<FloatType>>();
        
        // Type-specific fields
        descriptor.Field(f => f.DelaySeconds).Type<NonNullType<IntType>>();
    }
}

// GraphQL type for HttpRequestNode
public class HttpRequestNodeType : ObjectType<HttpRequestNode>
{
    protected override void Configure(IObjectTypeDescriptor<HttpRequestNode> descriptor)
    {
        descriptor.Implements<NodeType>();
        
        descriptor.Field(f => f.Id).Type<NonNullType<IdType>>();
        descriptor.Field(f => f.Type).Type<NonNullType<StringType>>();
        descriptor.Field(f => f.Label).Type<NonNullType<StringType>>();
        descriptor.Field(f => f.PositionX).Type<NonNullType<FloatType>>();
        descriptor.Field(f => f.PositionY).Type<NonNullType<FloatType>>();
        
        // Type-specific fields
        descriptor.Field(f => f.Url).Type<NonNullType<StringType>>();
        descriptor.Field(f => f.Method).Type<NonNullType<StringType>>();
        descriptor.Field(f => f.Body).Type<StringType>();
        descriptor.Field(f => f.Headers).Type<NonNullType<DictionaryType<StringType, StringType>>>();
    }
}

// GraphQL type for Edge
public class EdgeType : ObjectType<Edge>
{
    protected override void Configure(IObjectTypeDescriptor<Edge> descriptor)
    {
        descriptor.Field(f => f.Id).Type<NonNullType<IdType>>();
        descriptor.Field(f => f.SourceNodeId).Type<NonNullType<StringType>>();
        descriptor.Field(f => f.TargetNodeId).Type<NonNullType<StringType>>();
        descriptor.Field(f => f.SourceHandle).Type<NonNullType<StringType>>();
        descriptor.Field(f => f.TargetHandle).Type<NonNullType<StringType>>();
    }
}

// GraphQL query type for workflows
[ExtendObjectType(OperationTypeNames.Query)]
public class WorkflowQueries
{
    // Get all workflows for the current tenant
    [UsePaging]
    [UseFiltering]
    [UseSorting]
    public IQueryable<Workflow> GetWorkflows(
        [Service] ImpolarInsightContext context)
    {
        return context.Workflows
            .Include(w => w.Nodes)
            .Include(w => w.Edges);
    }
    
    // Get a specific workflow by ID
    public async Task<Workflow?> GetWorkflowById(
        [Service] ImpolarInsightContext context,
        Guid id)
    {
        return await context.Workflows
            .Include(w => w.Nodes)
            .Include(w => w.Edges)
            .FirstOrDefaultAsync(w => w.Id == id);
    }
    
    // Get all workflow executions for the current tenant
    [UsePaging]
    [UseFiltering]
    [UseSorting]
    public IQueryable<WorkflowExecution> GetWorkflowExecutions(
        [Service] ImpolarInsightContext context)
    {
        return context.WorkflowExecutions;
    }
    
    // Get available node types that can be used in workflows
    public async Task<List<NodeTypeInfo>> GetAvailableNodeTypes()
    {
        // Return information about available node types
        // This is what the frontend will use to render the node palette
        return new List<NodeTypeInfo>
        {
            new NodeTypeInfo
            {
                Type = "TimeTriggerNode",
                Category = "Triggers",
                DisplayName = "Time Trigger",
                Description = "Triggers a workflow at a specific time",
                Icon = "clock",
                Color = "#4CAF50",
                Inputs = new List<NodePortInfo>(),
                Outputs = new List<NodePortInfo>
                {
                    new NodePortInfo
                    {
                        Id = "default",
                        DisplayName = "Output",
                        Description = "Trigger output with timestamp"
                    }
                },
                Properties = new List<NodePropertyInfo>
                {
                    new NodePropertyInfo
                    {
                        Name = "cronExpression",
                        DisplayName = "Cron Expression",
                        Type = "string",
                        DefaultValue = "0 0 * * *",
                        Description = "Cron expression for scheduling (e.g. '0 0 * * *' for daily at midnight)"
                    }
                }
            },
            new NodeTypeInfo
            {
                Type = "DelayNode",
                Category = "Flow",
                DisplayName = "Delay",
                Description = "Delays the workflow execution for a specified time",
                Icon = "hourglass",
                Color = "#2196F3",
                Inputs = new List<NodePortInfo>
                {
                    new NodePortInfo
                    {
                        Id = "default",
                        DisplayName = "Input",
                        Description = "Data to pass through after delay"
                    }
                },
                Outputs = new List<NodePortInfo>
                {
                    new NodePortInfo
                    {
                        Id = "default",
                        DisplayName = "Output",
                        Description = "Data passed through after delay"
                    }
                },
                Properties = new List<NodePropertyInfo>
                {
                    new NodePropertyInfo
                    {
                        Name = "delaySeconds",
                        DisplayName = "Delay (seconds)",
                        Type = "number",
                        DefaultValue = "60",
                        Description = "Number of seconds to delay"
                    }
                }
            },
            new NodeTypeInfo
            {
                Type = "HttpRequestNode",
                Category = "Actions",
                DisplayName = "HTTP Request",
                Description = "Makes an HTTP request to a URL",
                Icon = "globe",
                Color = "#FF9800",
                Inputs = new List<NodePortInfo>
                {
                    new NodePortInfo
                    {
                        Id = "default",
                        DisplayName = "Input",
                        Description = "Data that can be used in the request body"
                    }
                },
                Outputs = new List<NodePortInfo>
                {
                    new NodePortInfo
                    {
                        Id = "default",
                        DisplayName = "Response",
                        Description = "HTTP response data"
                    }
                },
                Properties = new List<NodePropertyInfo>
                {
                    new NodePropertyInfo
                    {
                        Name = "url",
                        DisplayName = "URL",
                        Type = "string",
                        DefaultValue = "https://example.com",
                        Description = "URL to send the request to"
                    },
                    new NodePropertyInfo
                    {
                        Name = "method",
                        DisplayName = "Method",
                        Type = "enum",
                        DefaultValue = "GET",
                        Options = new List<string> { "GET", "POST", "PUT", "DELETE", "PATCH" },
                        Description = "HTTP method to use"
                    },
                    new NodePropertyInfo
                    {
                        Name = "body",
                        DisplayName = "Body",
                        Type = "text",
                        DefaultValue = "",
                        Description = "Request body (for POST, PUT, PATCH)"
                    },
                    new NodePropertyInfo
                    {
                        Name = "headers",
                        DisplayName = "Headers",
                        Type = "keyValue",
                        DefaultValue = "{}",
                        Description = "HTTP headers to include with the request"
                    }
                }
            }
        };
    }
}

// Information about a node type for the frontend
public class NodeTypeInfo
{
    public required string Type { get; set; }
    public required string Category { get; set; }
    public required string DisplayName { get; set; }
    public required string Description { get; set; }
    public required string Icon { get; set; }
    public required string Color { get; set; }
    public required List<NodePortInfo> Inputs { get; set; }
    public required List<NodePortInfo> Outputs { get; set; }
    public required List<NodePropertyInfo> Properties { get; set; }
}

// Information about a node port for the frontend
public class NodePortInfo
{
    public required string Id { get; set; }
    public required string DisplayName { get; set; }
    public string? Description { get; set; }
}

// Information about a node property for the frontend
public class NodePropertyInfo
{
    public required string Name { get; set; }
    public required string DisplayName { get; set; }
    public required string Type { get; set; }
    public string? DefaultValue { get; set; }
    public string? Description { get; set; }
    public List<string>? Options { get; set; }
}

// GraphQL mutation type for workflows
[ExtendObjectType(OperationTypeNames.Mutation)]
public class WorkflowMutations
{
    // Create a new workflow
    public async Task<Workflow> CreateWorkflow(
        [Service] ImpolarInsightContext context,
        [Service] IUserService userService,
        string name,
        string? description = null)
    {
        var workflow = new Workflow
        {
            Id = Guid.NewGuid(),
            Name = name,
            Description = description,
            IsActive = false,
            Tenant = userService.Tenant
        };
        
        var result = context.Workflows.Add(workflow);
        await context.SaveChangesAsync();
        
        return result.Entity;
    }
    
    // Update a workflow's properties
    public async Task<Workflow> UpdateWorkflow(
        [Service] ImpolarInsightContext context,
        Guid id,
        string? name = null,
        string? description = null,
        bool? isActive = null)
    {
        var workflow = await context.Workflows.FindAsync(id);
        if (workflow == null)
        {
            throw new Exception($"Workflow with ID {id} not found");
        }
        
        if (name != null)
        {
            workflow.Name = name;
        }
        
        if (description != null)
        {
            workflow.Description = description;
        }
        
        if (isActive != null)
        {
            workflow.IsActive = isActive.Value;
        }
        
        await context.SaveChangesAsync();
        
        return workflow;
    }
    
    // Delete a workflow
    public async Task<bool> DeleteWorkflow(
        [Service] ImpolarInsightContext context,
        Guid id)
    {
        var workflow = await context.Workflows.FindAsync(id);
        if (workflow == null)
        {
            return false;
        }
        
        context.Workflows.Remove(workflow);
        await context.SaveChangesAsync();
        
        return true;
    }
    
    // Add a node to a workflow
    public async Task<Node> AddNode(
        [Service] ImpolarInsightContext context,
        [Service] IUserService userService,
        Guid workflowId,
        string type,
        string label,
        double positionX,
        double positionY,
        string? properties = null)
    {
        var workflow = await context.Workflows.FindAsync(workflowId);
        if (workflow == null)
        {
            throw new Exception($"Workflow with ID {workflowId} not found");
        }
        
        // Create the appropriate node type based on the type parameter
        Node node = type switch
        {
            "TimeTriggerNode" => new TimeTriggerNode
            {
                Id = Guid.NewGuid(),
                Type = type,
                Label = label,
                PositionX = positionX,
                PositionY = positionY,
                WorkflowId = workflowId,
                Tenant = userService.Tenant
            },
            "DelayNode" => new DelayNode
            {
                Id = Guid.NewGuid(),
                Type = type,
                Label = label,
                PositionX = positionX,
                PositionY = positionY,
                WorkflowId = workflowId,
                Tenant = userService.Tenant
            },
            "HttpRequestNode" => new HttpRequestNode
            {
                Id = Guid.NewGuid(),
                Type = type,
                Label = label,
                PositionX = positionX,
                PositionY = positionY,
                WorkflowId = workflowId,
                Tenant = userService.Tenant
            },
            _ => throw new Exception($"Node type {type} is not supported")
        };
        
        // Apply custom properties if provided
        if (properties != null)
        {
            ApplyNodeProperties(node, properties);
        }
        
        var result = context.Nodes.Add(node);
        await context.SaveChangesAsync();
        
        return result.Entity;
    }
    
    // Private helper to apply properties to a node from JSON
    private void ApplyNodeProperties(Node node, string propertiesJson)
    {
        var props = JsonSerializer.Deserialize<JsonDocument>(propertiesJson);
        if (props == null)
        {
            return;
        }
        
        switch (node)
        {
            case TimeTriggerNode triggerNode:
                if (props.RootElement.TryGetProperty("cronExpression", out var cronExpr))
                {
                    triggerNode.CronExpression = cronExpr.GetString() ?? triggerNode.CronExpression;
                }
                break;
                
            case DelayNode delayNode:
                if (props.RootElement.TryGetProperty("delaySeconds", out var delaySeconds))
                {
                    delayNode.DelaySeconds = delaySeconds.GetInt32();
                }
                break;
                
            case HttpRequestNode httpNode:
                if (props.RootElement.TryGetProperty("url", out var url))
                {
                    httpNode.Url = url.GetString() ?? httpNode.Url;
                }
                
                if (props.RootElement.TryGetProperty("method", out var method))
                {
                    httpNode.Method = method.GetString() ?? httpNode.Method;
                }
                
                if (props.RootElement.TryGetProperty("body", out var body))
                {
                    httpNode.Body = body.GetString();
                }
                
                if (props.RootElement.TryGetProperty("headers", out var headers))
                {
                    httpNode.Headers = JsonSerializer.Deserialize<Dictionary<string, string>>(headers.GetRawText())
                        ?? httpNode.Headers;
                }
                break;
        }
    }
    
    // Update a node's properties
    public async Task<Node> UpdateNode(
        [Service] ImpolarInsightContext context,
        Guid id,
        string? label = null,
        double? positionX = null,
        double? positionY = null,
        string? properties = null)
    {
        var node = await context.Nodes.FindAsync(id);
        if (node == null)
        {
            throw new Exception($"Node with ID {id} not found");
        }
        
        if (label != null)
        {
            node.Label = label;
        }
        
        if (positionX != null)
        {
            node.PositionX = positionX.Value;
        }
        
        if (positionY != null)
        {
            node.PositionY = positionY.Value;
        }
        
        if (properties != null)
        {
            ApplyNodeProperties(node, properties);
        }
        
        await context.SaveChangesAsync();
        
        return node;
    }
    
    // Delete a node
    public async Task<bool> DeleteNode(
        [Service] ImpolarInsightContext context,
        Guid id)
    {
        var node = await context.Nodes.FindAsync(id);
        if (node == null)
        {
            return false;
        }
        
        // Also delete any edges connected to this node
        var edges = await context.Edges.Where(
            e => e.SourceNodeId == id.ToString() || e.TargetNodeId == id.ToString()
        ).ToListAsync();
        
        context.Edges.RemoveRange(edges);
        context.Nodes.Remove(node);
        await context.SaveChangesAsync();
        
        return true;
    }
    
    // Add an edge between nodes
    public async Task<Edge> AddEdge(
        [Service] ImpolarInsightContext context,
        [Service] IUserService userService,
        Guid workflowId,
        string sourceNodeId,
        string targetNodeId,
        string sourceHandle,
        string targetHandle)
    {
        var workflow = await context.Workflows.FindAsync(workflowId);
        if (workflow == null)
        {
            throw new Exception($"Workflow with ID {workflowId} not found");
        }
        
        var edge = new Edge
        {
            Id = Guid.NewGuid(),
            SourceNodeId = sourceNodeId,
            TargetNodeId = targetNodeId,
            SourceHandle = sourceHandle,
            TargetHandle = targetHandle,
            WorkflowId = workflowId,
            Tenant = userService.Tenant
        };
        
        var result = context.Edges.Add(edge);
        await context.SaveChangesAsync();
        
        return result.Entity;
    }
    
    // Delete an edge
    public async Task<bool> DeleteEdge(
        [Service] ImpolarInsightContext context,
        Guid id)
    {
        var edge = await context.Edges.FindAsync(id);
        if (edge == null)
        {
            return false;
        }
        
        context.Edges.Remove(edge);
        await context.SaveChangesAsync();
        
        return true;
    }
    
    // Execute a workflow
    public async Task<string> ExecuteWorkflow(
        [Service] WorkflowExecutionService executionService,
        Guid workflowId)
    {
        return await executionService.StartWorkflowAsync(workflowId);
    }
}