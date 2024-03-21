using Freezbe.Core.Exceptions;
using Freezbe.Infrastructure.Extensions;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;

namespace Freezbe.Infrastructure.Middlewares;

public class ExceptionMiddleware : IMiddleware
{
    private readonly Func<Exception, Error> _getError;

    public ExceptionMiddleware(IWebHostEnvironment webHostEnvironment)
    {
        if(webHostEnvironment.IsDevelopment())
        {
            _getError = GetErrorWithDetails;
        }
        else
        {
            _getError = GetErrorWithoutDetails;
        }
    }

    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        try
        {
            await next(context);
        }
        catch(Exception exception)
        {
            await HandleExceptionAsync(exception, context);
        }
    }

    private async Task HandleExceptionAsync(Exception exception, HttpContext context)
    {
        var (statusCode, error) = exception switch
        {
            CustomException => CustomExceptionHandle(exception),
            _ => GeneralExceptionHandle(exception)
        };

        context.Response.StatusCode = statusCode;
        await context.Response.WriteAsJsonAsync(error);
    }

    private (int Status400BadRequest, Error) CustomExceptionHandle(Exception exception)
    {
        var status = StatusCodes.Status400BadRequest;
        var error = GetErrorWithDetails(exception);
        return (status, error);
    }

    private (int Status500InternalServerError, Error) GeneralExceptionHandle(Exception exception)
    {
        var status = StatusCodes.Status500InternalServerError;
        var error = _getError(exception);
        return (status, error);
    }

    private Error GetErrorWithDetails(Exception exception)
    {
        return new Error(exception.GetType().Name.Underscore().Replace("_exception", string.Empty), exception.Message);
    }

    private Error GetErrorWithoutDetails(Exception exception)
    {
        return new Error("error", "There was an error.");
    }

    private sealed record Error(string Code, string Reason);
}