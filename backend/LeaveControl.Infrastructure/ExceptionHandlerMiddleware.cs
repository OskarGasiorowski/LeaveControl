using System.Net;
using System.Text.Json;
using LeaveControl.Domain;
using Microsoft.AspNetCore.Http;

namespace LeaveControl.Infrastructure;

public record RequestFailedBody
{
    public string Code { get; init; } = default!;
    public int CodeNumber { get; init; }
    public string Type { get; init; } = default!;
    public string Message { get; init; } = default!;
}

public class ExceptionHandlerMiddleware
{
    private readonly RequestDelegate _next;

    public ExceptionHandlerMiddleware(RequestDelegate next)
    {
        _next = next;
    }
    
    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            await HandleException(context, ex);
        }
    }

    private static Task HandleException(HttpContext context, Exception ex)
    {
        var appException = ex as AppException ?? AppException.InternalServerError();

        var statusCode = appException.Type switch
        {
            AppExceptionType.Fatal => HttpStatusCode.InternalServerError,
            AppExceptionType.User => HttpStatusCode.BadRequest,
            AppExceptionType.Conflict => HttpStatusCode.Conflict,
            _ => HttpStatusCode.InternalServerError,
        };

        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)statusCode;

        var json = JsonSerializer.Serialize(new RequestFailedBody
        {
            Code = appException.Code,
            CodeNumber = appException.CodeNumber,
            Message = appException.Message,
            Type = appException.Type.ToString(),
        });
        return context.Response.WriteAsync(json);
    }
}