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

    [HttpGet("{commentId}")]
    public async Task<ActionResult<CommentDto>> Get(Guid commentId)
    {
        var command = new GetCommentQuery(commentId);
        var result = await _mediator.Send(command);
        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> Post(CreateCommentRequest request)
    {
        var command = new CreateCommentCommand(Guid.NewGuid(), request.Description, request.AssignmentId);
        await _mediator.Send(command);
        return NoContent();
    }

    [HttpDelete]
    public async Task<IActionResult> Delete(DeleteCommentRequest request)
    {
        var command = new DeleteCommentCommand(request.CommentId);
        await _mediator.Send(command);
        return NoContent();
    }
}