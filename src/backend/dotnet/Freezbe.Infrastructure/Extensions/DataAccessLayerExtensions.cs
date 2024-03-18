using Freezbe.Application.Abstractions;
using Freezbe.Core.Repositories;
using Freezbe.Infrastructure.Configurations;
using Freezbe.Infrastructure.DataAccessLayer;
using Freezbe.Infrastructure.DataAccessLayer.Repositories.InMemory;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Freezbe.Infrastructure.Extensions;

internal static class DataAccessLayerExtensions
{
    public static IServiceCollection AddDataAccessLayer(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddPostgres(configuration);
        services.AddRepositories();
        services.AddQueryHandlers();
        return services;
    }

    private static IServiceCollection AddPostgres(this IServiceCollection services, IConfiguration configuration)
    {
        var databaseConfiguration = configuration.GetOptions<DatabaseConfiguration>(nameof(DatabaseConfiguration));
        services.AddDbContext<FreezbeDbContext>(p => p.UseNpgsql(databaseConfiguration.ConnectionString));
        return services;
    }

    private static IServiceCollection AddRepositories(this IServiceCollection services)
    {
        services.AddSingleton<IAssignmentRepository, AssignmentRepository>();
        services.AddSingleton<ISpaceRepository, SpaceRepository>();
        return services;
    }

    private static IServiceCollection AddQueryHandlers(this IServiceCollection services)
    {
        var currentAssembly = typeof(ApplicationConfiguration).Assembly;

        services
        .Scan(s => s.FromAssemblies(currentAssembly)
                    .AddClasses(c => c.AssignableTo(typeof(IQueryHandler<,>)))
                    .AsImplementedInterfaces()
                    .WithScopedLifetime());

        return services;
    }
}