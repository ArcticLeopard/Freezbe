using System.Reflection;
using Microsoft.Extensions.DependencyInjection;

namespace Freezbe.Application.Extensions;

public static class SharedExtensions
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        return services.AddCommandHandlers();
    }

    private static IServiceCollection AddCommandHandlers(this IServiceCollection services)
    {
        services.AddMediatR(serviceConfiguration => { serviceConfiguration.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly()); });

        return services;
    }
}