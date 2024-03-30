using Freezbe.Api.Requests;
using Freezbe.Application.Commands;
using Freezbe.Application.DataTransferObject;
using Freezbe.Application.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Freezbe.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class CommentsController : ControllerBase
{
    private readonly IMediator _mediator;

    public CommentsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<CommentDto>>> Get([FromHeader] Guid spaceId)
    {
        var command = new GetCommentsForAssignmentQuery(spaceId);
        var result = await _mediator.Send(command);
        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromHeader] Guid assignmentId, CommentCreateRequest request)
    {
        var command = new CommentCreateCommand(Guid.NewGuid(), request.Description, assignmentId);
        await _mediator.Send(command);
        return NoContent();
    }
}