using Freezbe.Api.Requests;
using Freezbe.Application.Commands;
using Freezbe.Application.DataTransferObject;
using Freezbe.Application.Queries;
using Freezbe.Core.ValueObjects;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Freezbe.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class AssignmentsController : ControllerBase
{
    private readonly IMediator _mediator;

    public AssignmentsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet("{assignmentId}")]
    public async Task<ActionResult<AssignmentDto>> Get(Guid assignmentId)
    {
        var command = new GetAssignmentQuery(assignmentId);
        var result = await _mediator.Send(command);
        return Ok(result);
    }

    [HttpGet("{assignmentId}/Comments")]
    public async Task<ActionResult<IEnumerable<CommentDto>>> GetComments(Guid assignmentId)
    {
        var command = new GetCommentsFromAssignmentQuery(assignmentId);
        var result = await _mediator.Send(command);
        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateAssignmentRequest request)
    {
        var command = new CreateAssignmentCommand(Guid.NewGuid(), request.Description, request.ProjectId);
        await _mediator.Send(command);
        return NoContent();
    }

    [HttpPatch("{assignmentId}/Description")]
    public async Task<IActionResult> ChangeDescription(Guid assignmentId, ChangeDescriptionAssignmentRequest request)
    {
        var command = new ChangeDescriptionAssignmentCommand(assignmentId, request.Description);
        await _mediator.Send(command);
        return NoContent();
    }

    [HttpPatch("{assignmentId}/Status/Abandon")]
    public async Task<IActionResult> ChangeStatusToAbandon(Guid assignmentId)
    {
        var command = new ChangeStatusAssignmentCommand(assignmentId, AssignmentStatus.Abandon);
        await _mediator.Send(command);
        return NoContent();
    }

    [HttpPatch("{assignmentId}/Status/Active")]
    public async Task<IActionResult> ChangeStatusToActive(Guid assignmentId)
    {
        var command = new ChangeStatusAssignmentCommand(assignmentId, AssignmentStatus.Active);
        await _mediator.Send(command);
        return NoContent();
    }

    [HttpPatch("{assignmentId}/Status/Complited")]
    public async Task<IActionResult> ChangeStatusToComplited(Guid assignmentId)
    {
        var command = new ChangeStatusAssignmentCommand(assignmentId, AssignmentStatus.Complited);
        await _mediator.Send(command);
        return NoContent();
    }

    [HttpDelete("{assignmentId}")]
    public async Task<IActionResult> Delete(Guid assignmentId)
    {
        var command = new DeleteAssignmentCommand(assignmentId);
        await _mediator.Send(command);
        return NoContent();
    }
}