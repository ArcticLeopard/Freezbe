using Freezbe.Infrastructure.Configurations;
using Freezbe.Infrastructure.Configurations.Providers;
using Microsoft.Extensions.Options;
using Moq;
using Xunit;

namespace Freezbe.Infrastructure.Tests.Unit.Configurations.Providers;

public class ConfigProviderTests
{
    [Fact]
    public void ConstructorWithValidOptionsSetsApplicationConfiguration()
    {
        // ARRANGE
        var expectedConfig = new ApplicationConfiguration()
        {
            Name = "Freezbe",
            Version = "1"
        };
        var mockOptions = new Mock<IOptions<ApplicationConfiguration>>();
        mockOptions.Setup(m => m.Value).Returns(expectedConfig);

        // ACT
        var configProvider = new ConfigProvider(mockOptions.Object);

        // ASSERT
        Assert.Equal(expectedConfig, configProvider.Application);
        Assert.Equal(expectedConfig.Name, configProvider.Application.Name);
        Assert.Equal(expectedConfig.Version, configProvider.Application.Version);
    }
}