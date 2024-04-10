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

    [HttpGet]
    public async Task<ActionResult<IEnumerable<AssignmentDto>>> Get([FromHeader] Guid projectId)
    {
        var command = new GetAssignmentsForProjectQuery(projectId);
        var result = await _mediator.Send(command);
        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromHeader] Guid projectId, AssignmentCreateRequest request)
    {
        var command = new AssignmentCreateCommand(Guid.NewGuid(), request.Description, projectId);
        await _mediator.Send(command);
        return NoContent();
    }

    [HttpDelete]
    public async Task<IActionResult> Delete(AssignmentDeleteRequest request)
    {
        var command = new AssignmentHardDeleteCommand(request.AssignmentId);
        await _mediator.Send(command);
        return NoContent();
    }
}