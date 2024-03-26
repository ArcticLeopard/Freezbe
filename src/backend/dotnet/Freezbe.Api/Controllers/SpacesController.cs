using Freezbe.Api.Requests;
using Freezbe.Application.Commands;
using Freezbe.Application.DataTransferObject;
using Freezbe.Application.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Freezbe.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class SpacesController : ControllerBase
{
    private readonly IMediator _mediator;

    public SpacesController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<SpaceDto>>> Get()
    {
        var command = new GetSpacesQuery();
        var result = await _mediator.Send(command);
        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> Post(SpaceCreateRequest request)
    {
        var command = new SpaceCreateCommand(Guid.NewGuid(), request.Description);
        await _mediator.Send(command);
        return NoContent();
    }
}