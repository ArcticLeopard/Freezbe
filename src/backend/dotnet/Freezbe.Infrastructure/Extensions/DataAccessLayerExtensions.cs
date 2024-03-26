using System.Reflection;
using Freezbe.Core.Repositories;
using Freezbe.Infrastructure.Configurations;
using Freezbe.Infrastructure.DataAccessLayer;
using Freezbe.Infrastructure.DataAccessLayer.Repositories.EntityFramework;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Freezbe.Infrastructure.Extensions;

internal static class DataAccessLayerExtensions
{
    public static IServiceCollection AddDataAccessLayer(this IServiceCollection services, IConfiguration configuration)
    {
        return services.AddPostgres(configuration).AddRepositories().AddQueryHandlers();
    }

    private static IServiceCollection AddPostgres(this IServiceCollection services, IConfiguration configuration)
    {
        var databaseConfiguration = configuration.GetOptions<DatabaseConfiguration>(nameof(DatabaseConfiguration));
        services.AddDbContext<FreezbeDbContext>(p => p.UseNpgsql(databaseConfiguration.ConnectionString));
        services.AddHostedService<DatabaseInitializer>();
        return services;
    }

    private static IServiceCollection AddRepositories(this IServiceCollection services)
    {
        services.AddScoped<IAssignmentRepository, AssignmentRepository>();
        services.AddScoped<IProjectRepository, ProjectRepository>();
        services.AddScoped<ISpaceRepository, SpaceRepository>();
        return services;
    }

    private static IServiceCollection AddQueryHandlers(this IServiceCollection services)
    {
        return services.AddMediatR(serviceConfiguration =>
        {
            serviceConfiguration.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly());
        });
    }
}