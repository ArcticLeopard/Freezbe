using Freezbe.Api.Requests;
using Freezbe.Application.Abstractions;
using Freezbe.Application.Commands;
using Microsoft.AspNetCore.Mvc;

namespace Freezbe.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class SpacesController : ControllerBase
{
    private readonly ICommandHandler<SpaceCreateCommand> _commandHandler;

    public SpacesController(ICommandHandler<SpaceCreateCommand> commandHandler)
    {
        _commandHandler = commandHandler;
    }

    [HttpPost]
    public async Task<IActionResult> Post(SpaceCreateRequest request)
    {
        var command = new SpaceCreateCommand(Guid.NewGuid(), request.Description);
        await _commandHandler.HandleAsync(command);
        return NoContent();
    }
}