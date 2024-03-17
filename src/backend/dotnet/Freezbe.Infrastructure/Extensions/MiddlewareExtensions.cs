using Freezbe.Infrastructure.Middlewares;
using Microsoft.Extensions.DependencyInjection;

namespace Freezbe.Infrastructure.Extensions;

internal static class MiddlewareExtensions
{
    public static IServiceCollection AddMiddlewares(this IServiceCollection services)
    {
        services.AddSingleton<ExceptionMiddleware>();
        return services;
    }
}