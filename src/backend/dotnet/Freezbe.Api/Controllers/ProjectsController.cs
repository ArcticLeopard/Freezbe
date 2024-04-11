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

    [HttpGet("{projectId}")]
    public async Task<ActionResult<ProjectDto>> Get(Guid projectId)
    {
        var command = new GetProjectQuery(projectId);
        var result = await _mediator.Send(command);
        return Ok(result);
    }

    [HttpGet("{projectId}/Assignments")]
    public async Task<ActionResult<IEnumerable<AssignmentDto>>> GetAssignments(Guid projectId)
    {
        var command = new GetAssignmentsFromProjectQuery(projectId);
        var result = await _mediator.Send(command);
        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> Post(CreateProjectRequest request)
    {
        var command = new CreateProjectCommand(Guid.NewGuid(), request.Description, request.SpaceId);
        await _mediator.Send(command);
        return NoContent();
    }

    [HttpDelete]
    public async Task<IActionResult> Delete(DeleteProjectRequest request)
    {
        var command = new DeleteProjectCommand(request.ProjectId);
        await _mediator.Send(command);
        return NoContent();
    }
}