using Freezbe.Application.Commands;
using Freezbe.Application.Exceptions;
using Freezbe.Core.Repositories;
using MediatR;

namespace Freezbe.Application.CommandHandlers;

public class ChangeStatusAssignmentCommandHandler : IRequestHandler<ChangeStatusAssignmentCommand>
{
    private readonly IAssignmentRepository _assignmentRepository;

    public ChangeStatusAssignmentCommandHandler(IAssignmentRepository assignmentRepository)
    {
        _assignmentRepository = assignmentRepository;
    }

    public async Task Handle(ChangeStatusAssignmentCommand command, CancellationToken cancellationToken)
    {
        var assignment = await _assignmentRepository.GetAsync(command.AssignmentId);
        if(assignment is null)
        {
            throw new AssignmentNotFoundException(command.AssignmentId);
        }
        assignment.ChangeStatus(command.Status);
        await _assignmentRepository.UpdateAsync(assignment);
    }
}