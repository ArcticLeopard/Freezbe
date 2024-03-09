using Microsoft.Extensions.Options;

namespace Freezbe.Infrastructure.Configurations.Providers;

public class ConfigProvider : IConfigProvider
{
    public ApplicationConfiguration Application { get; }

    public ConfigProvider(IOptions<ApplicationConfiguration> applicationConfiguration)
    {
        Application = applicationConfiguration.Value;
    }
}