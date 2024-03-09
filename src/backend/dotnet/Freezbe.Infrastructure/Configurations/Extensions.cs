using Freezbe.Infrastructure.Configurations.Providers;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Freezbe.Infrastructure.Configurations;

public static class Extensions
{
    public static IServiceCollection AddConfigurations(this IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<ApplicationConfiguration>(configuration.GetRequiredSection(nameof(ApplicationConfiguration)));
        services.AddSingleton<IConfigProvider, ConfigProvider>();
        return services;
    }
}