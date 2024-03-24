using Freezbe.Infrastructure.Configurations;
using Freezbe.Infrastructure.Configurations.Providers;
using Microsoft.Extensions.Options;
using Moq;
using Xunit;

namespace Freezbe.Infrastructure.Tests.Unit.Configurations.Providers;

public class ConfigProviderTests
{
    [Fact]
    public void ConfigProviderSetsTheValuesCorrectly()
    {
        // ARRANGE
        var applicationConfigurationExpectedConfig = new ApplicationConfiguration()
        {
            Name = "Freezbe",
            Version = "1"
        };

        var databaseConfigurationExpectedConfig = new DatabaseConfiguration()
        {
            ConnectionString = "Connection"
        };

        var dependencyConfigurationExpectedConfig = new DependencyConfiguration()
        {
            SeqServerAddress = "localhost"
        };

        var applicationConfigurationOptionsMock = new Mock<IOptions<ApplicationConfiguration>>();
        applicationConfigurationOptionsMock.Setup(m => m.Value).Returns(applicationConfigurationExpectedConfig);

        var databaseConfigurationOptionsMock = new Mock<IOptions<DatabaseConfiguration>>();
        databaseConfigurationOptionsMock.Setup(m => m.Value).Returns(databaseConfigurationExpectedConfig);

        var dependencyConfigurationOptionsMock = new Mock<IOptions<DependencyConfiguration>>();
        dependencyConfigurationOptionsMock.Setup(m => m.Value).Returns(dependencyConfigurationExpectedConfig);

        // ACT
        var configProvider = new ConfigProvider(applicationConfigurationOptionsMock.Object, databaseConfigurationOptionsMock.Object, dependencyConfigurationOptionsMock.Object);

        // ASSERT
        Assert.Equal(applicationConfigurationExpectedConfig, configProvider.Application);
        Assert.Equal(applicationConfigurationExpectedConfig.Name, configProvider.Application.Name);
        Assert.Equal(applicationConfigurationExpectedConfig.Version, configProvider.Application.Version);

        Assert.Equal(databaseConfigurationExpectedConfig.ConnectionString, configProvider.Database.ConnectionString);
    }
}