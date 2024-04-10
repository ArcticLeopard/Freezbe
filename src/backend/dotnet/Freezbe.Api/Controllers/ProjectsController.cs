using Freezbe.Api.Requests;
using Freezbe.Application.Commands;
using Freezbe.Application.DataTransferObject;
using Freezbe.Application.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Freezbe.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class ProjectsController : ControllerBase
{
    private readonly IMediator _mediator;

    public ProjectsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ProjectDto>>> Get([FromHeader] Guid spaceId)
    {
        var command = new GetProjectsForSpaceQuery(spaceId);
        var result = await _mediator.Send(command);
        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromHeader] Guid spaceId, ProjectCreateRequest request)
    {
        var command = new ProjectCreateCommand(Guid.NewGuid(), request.Description, spaceId);
        await _mediator.Send(command);
        return NoContent();
    }

    [HttpDelete]
    public async Task<IActionResult> Delete(ProjectDeleteRequest request)
    {
        var command = new ProjectHardDeleteCommand(request.ProjectId);
        await _mediator.Send(command);
        return NoContent();
    }
}