using Freezbe.Api.Requests;
using Freezbe.Application.Abstractions;
using Freezbe.Application.Commands;
using Microsoft.AspNetCore.Mvc;

namespace Freezbe.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class SpacesController : ControllerBase
{
    private readonly ICommandHandler<CreateSpaceCommand> _commandHandler;

    public SpacesController(ICommandHandler<CreateSpaceCommand> commandHandler)
    {
        _commandHandler = commandHandler;
    }

    [HttpPost]
    public async Task<IActionResult> Post(CreateSpaceRequest request)
    {
        var command = new CreateSpaceCommand(Guid.NewGuid(), request.Description);
        await _commandHandler.HandleAsync(command);
        return NoContent();
    }
}