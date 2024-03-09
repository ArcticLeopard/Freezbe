using Freezbe.Application.Abstractions;
using Microsoft.Extensions.DependencyInjection;

namespace Freezbe.Application;

public static class Extensions
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddCommandHandlers();

        return services;
    }

    private static IServiceCollection AddCommandHandlers(this IServiceCollection services)
    {
        var currentAssembly = typeof(ICommandHandler<>).Assembly;

        services.Scan(s => s.FromAssemblies(currentAssembly)
        .AddClasses(c => c.AssignableTo(typeof(ICommandHandler<>)))
        .AsImplementedInterfaces()
        .WithScopedLifetime());

        return services;
    }
}