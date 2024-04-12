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

    [HttpGet("{spaceId}")]
    public async Task<ActionResult<IEnumerable<SpaceDto>>> Get(Guid spaceId)
    {
        var command = new GetSpaceQuery(spaceId);
        var result = await _mediator.Send(command);
        return Ok(result);
    }

    [HttpGet("{spaceId}/Projects")]
    public async Task<ActionResult<IEnumerable<ProjectDto>>> GetProject(Guid spaceId)
    {
        var command = new GetProjectsFromSpaceQuery(spaceId);
        var result = await _mediator.Send(command);
        return Ok(result);
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<SpaceDto>>> GetAll()
    {
        var command = new GetSpacesQuery();
        var result = await _mediator.Send(command);
        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateSpaceRequest request)
    {
        var command = new CreateSpaceCommand(Guid.NewGuid(), request.Description);
        await _mediator.Send(command);
        return NoContent();
    }

    [HttpPatch("{spaceId}/Description")]
    public async Task<IActionResult> ChangeDescription(Guid spaceId, ChangeDescriptionSpaceRequest request)
    {
        var command = new ChangeDescriptionSpaceCommand(spaceId, request.Description);
        await _mediator.Send(command);
        return NoContent();
    }

    [HttpDelete("{spaceId}")]
    public async Task<IActionResult> Delete(Guid spaceId)
    {
        var command = new DeleteSpaceCommand(spaceId);
        await _mediator.Send(command);
        return NoContent();
    }
}