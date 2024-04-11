using Freezbe.Api.Requests;
using Freezbe.Application.Commands;
using Freezbe.Application.DataTransferObject;
using Freezbe.Application.Queries;
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
    public async Task<IActionResult> Post(CreateAssignmentRequest request)
    {
        var command = new CreateAssignmentCommand(Guid.NewGuid(), request.Description, request.ProjectId);
        await _mediator.Send(command);
        return NoContent();
    }

    [HttpDelete]
    public async Task<IActionResult> Delete(DeleteAssignmentRequest request)
    {
        var command = new DeleteAssignmentCommand(request.AssignmentId);
        await _mediator.Send(command);
        return NoContent();
    }
}