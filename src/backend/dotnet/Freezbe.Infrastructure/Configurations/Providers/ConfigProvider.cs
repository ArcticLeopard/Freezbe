using Microsoft.Extensions.Options;

namespace Freezbe.Infrastructure.Configurations.Providers;

public class ConfigProvider : IConfigProvider
{
    public ApplicationConfiguration Application { get; }
    public DatabaseConfiguration Database { get; }
    public DependencyConfiguration Dependency { get; }

    public ConfigProvider
    (
        IOptions<ApplicationConfiguration> applicationConfiguration,
        IOptions<DatabaseConfiguration> databaseConfiguration,
        IOptions<DependencyConfiguration> dependencyConfiguration
    )
    {
        Application = applicationConfiguration.Value;
        Database = databaseConfiguration.Value;
        Dependency = dependencyConfiguration.Value;
    }
}