using Freezbe.Api.Controllers;
using Freezbe.Infrastructure.Configurations;
using Freezbe.Infrastructure.Configurations.Providers;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace Freezbe.Api.Tests.Unit.Controllers;

public class ApplicationConfigurationControllerTests
{
    private const string NameFromConfigProvider = "Freezbe";
    private const string VersionFromConfigProvider = "1.0.0";

    [Fact]
    public void Version_ReturnsOkWithVersionFromConfigProvider()
    {
        // ASSERT
        var configProvider = GetConfigProvider(NameFromConfigProvider, VersionFromConfigProvider);
        var controller = new ApplicationConfigurationController(configProvider);

        // ACT
        var result = controller.Version() as OkObjectResult;

        // ASSERT
        Assert.NotNull(result);
        Assert.Equal(200, result.StatusCode);
        Assert.Equal(VersionFromConfigProvider, result.Value);
    }

    [Fact]
    public void Name_ReturnsOkWithNameFromConfigProvider()
    {
        // ASSERT
        var configProvider = GetConfigProvider(NameFromConfigProvider, VersionFromConfigProvider);
        var controller = new ApplicationConfigurationController(configProvider);

        // ACT
        var result = controller.Name() as OkObjectResult;

        // ASSERT
        Assert.NotNull(result);
        Assert.Equal(200, result.StatusCode);
        Assert.Equal(NameFromConfigProvider, result.Value);
    }

    private static IConfigProvider GetConfigProvider(string name, string version)
    {
        var configProviderMock = new Mock<IConfigProvider>();
        configProviderMock.Setup(cp => cp.Application).Returns(new ApplicationConfiguration()
        {
            Name = name,
            Version = version
        });
        var configProvider = configProviderMock.Object;
        return configProvider;
    }
}