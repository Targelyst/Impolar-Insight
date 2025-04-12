using System.Text.Json;
using System.Text.Json.Nodes;
using ImpolarInsight.Models.Workflow;

namespace ImpolarInsight.Models.Workflow.NodeTypes;

// Trigger node that starts at a certain time
public class TimeTriggerNode : Node
{
    public string CronExpression { get; set; } = "0 0 * * *"; // Default: daily at midnight
    
    public override async Task<NodeExecutionResult> ExecuteAsync(NodeExecutionContext context)
    {
        // In a real implementation, this would register with a scheduler
        // For now, it just succeeds and passes the trigger time
        var output = JsonSerializer.SerializeToDocument(new
        {
            triggeredAt = DateTime.UtcNow
        });
        
        return new NodeExecutionResult
        {
            Success = true,
            Output = output
        };
    }
}

// Delay node that waits for a specific amount of time
public class DelayNode : Node
{
    public int DelaySeconds { get; set; } = 60; // Default: 1 minute
    
    public override async Task<NodeExecutionResult> ExecuteAsync(NodeExecutionContext context)
    {
        try
        {
            // Actually wait for the specified delay
            await Task.Delay(TimeSpan.FromSeconds(DelaySeconds));
            
            // Pass through any inputs to the output
            return new NodeExecutionResult
            {
                Success = true,
                Output = context.Inputs.Count > 0 
                    ? context.Inputs.First().Value 
                    : JsonSerializer.SerializeToDocument(new { delayedFor = DelaySeconds })
            };
        }
        catch (Exception ex)
        {
            return new NodeExecutionResult
            {
                Success = false,
                Error = $"Delay failed: {ex.Message}"
            };
        }
    }
}

// HTTP request node for making API calls
public class HttpRequestNode : Node
{
    public string Url { get; set; } = "https://example.com";
    public string Method { get; set; } = "GET";
    public string? Body { get; set; }
    public Dictionary<string, string> Headers { get; set; } = new();
    
    public override async Task<NodeExecutionResult> ExecuteAsync(NodeExecutionContext context)
    {
        try
        {
            var httpClient = new HttpClient();
            
            // Add headers
            foreach (var header in Headers)
            {
                httpClient.DefaultRequestHeaders.Add(header.Key, header.Value);
            }
            
            // Create request message
            var request = new HttpRequestMessage(new HttpMethod(Method), Url);
            
            // Add body if applicable
            if (!string.IsNullOrEmpty(Body) && (Method.Equals("POST", StringComparison.OrdinalIgnoreCase) 
                                             || Method.Equals("PUT", StringComparison.OrdinalIgnoreCase)
                                             || Method.Equals("PATCH", StringComparison.OrdinalIgnoreCase)))
            {
                request.Content = new StringContent(Body, System.Text.Encoding.UTF8, "application/json");
            }
            
            // Execute request
            var response = await httpClient.SendAsync(request);
            var responseContent = await response.Content.ReadAsStringAsync();
            
            // Parse response to JSON if possible
            JsonDocument? responseJson = null;
            try
            {
                responseJson = JsonSerializer.Deserialize<JsonDocument>(responseContent);
            }
            catch
            {
                // If response is not valid JSON, wrap it in a JSON object
                var jsonObject = new JsonObject();
                jsonObject["content"] = responseContent;
                jsonObject["statusCode"] = (int)response.StatusCode;
                
                responseJson = JsonSerializer.SerializeToDocument(jsonObject);
            }
            
            return new NodeExecutionResult
            {
                Success = response.IsSuccessStatusCode,
                Output = responseJson,
                Error = response.IsSuccessStatusCode ? null : $"HTTP request failed with status code {response.StatusCode}"
            };
        }
        catch (Exception ex)
        {
            return new NodeExecutionResult
            {
                Success = false,
                Error = $"HTTP request failed: {ex.Message}"
            };
        }
    }
}