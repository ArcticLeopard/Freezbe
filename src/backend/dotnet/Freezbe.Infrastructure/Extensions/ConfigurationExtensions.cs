using Freezbe.Infrastructure.Configurations;
using Freezbe.Infrastructure.Configurations.Providers;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Freezbe.Infrastructure.Extensions;

internal static class ConfigurationExtensions
{
    public static IServiceCollection AddConfigurations(this IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<ApplicationConfiguration>(configuration.GetRequiredSection(nameof(ApplicationConfiguration)));
        services.Configure<DatabaseConfiguration>(configuration.GetRequiredSection(nameof(DatabaseConfiguration)));
        services.AddSingleton<IConfigProvider, ConfigProvider>();
        return services;
    }

    public static T GetOptions<T>(this IConfiguration configuration, string sectionName) where T : class, new()
    {
        var options = new T();
        var section = configuration.GetRequiredSection(sectionName);
        section.Bind(options);
        return options;
    }
}