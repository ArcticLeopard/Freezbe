using Freezbe.Application.Abstractions;
using Freezbe.Application.Commands;
using Freezbe.Application.DataTransferObject;
using Freezbe.Application.Queries;
using Microsoft.AspNetCore.Mvc;

namespace Freezbe.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class TestsController : ControllerBase
{
    private readonly ICommandHandler<SomeCommand> _commandHandler;
    private readonly IQueryHandler<SomeQuery, SomeDto> _queryHandler;

    public TestsController(ICommandHandler<SomeCommand> commandHandler, IQueryHandler<SomeQuery, SomeDto> queryHandler)
    {
        _commandHandler = commandHandler;
        _queryHandler = queryHandler;
    }

    [HttpGet("SomeCommandHandler")]
    public IActionResult SomeCommandHandler()
    {
        var someCommand = new SomeCommand();
        _commandHandler.HandleAsync(someCommand);
        return Ok();
    }

    [HttpGet("SomeQueryHandler")]
    public IActionResult SomeQueryHandler()
    {
        var someQuery = new SomeQuery();
        _queryHandler.HandleAsync(someQuery);
        return Ok();
    }
}