using Freezbe.Infrastructure.Configurations.Providers;
using Microsoft.AspNetCore.Mvc;

namespace Freezbe.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class ApplicationConfigurationController : ControllerBase
{
    private readonly IConfigProvider _configProvider;

    public ApplicationConfigurationController(IConfigProvider configProvider)
    {
        _configProvider = configProvider;
    }

    [HttpGet(nameof(Version))]
    public IActionResult Version()
    {
        return Ok(_configProvider.Application.Version);
    }

    [HttpGet(nameof(Name))]
    public IActionResult Name()
    {
        return Ok(_configProvider.Application.Name);
    }
}