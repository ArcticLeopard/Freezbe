using Freezbe.Core.Repositories;
using Freezbe.Infrastructure.DataAccessLayer.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace Freezbe.Infrastructure.DataAccessLayer;

public static class Extensions
{
    public static IServiceCollection AddDataAccessLayer(this IServiceCollection services)
    {
        services.AddRepositories();
        return services;
    }

    private static IServiceCollection AddRepositories(this IServiceCollection services)
    {
        services.AddSingleton<IAssignmentRepository, InMemoryAssignmentRepository>();
        services.AddSingleton<ISpaceRepository, InMemorySpaceRepository>();
        return services;
    }
}