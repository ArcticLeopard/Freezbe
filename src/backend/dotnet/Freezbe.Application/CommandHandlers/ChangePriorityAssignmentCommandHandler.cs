using Freezbe.Application.Commands;
using Freezbe.Application.Exceptions;
using Freezbe.Core.Repositories;
using MediatR;

namespace Freezbe.Application.CommandHandlers;

public class ChangePriorityAssignmentCommandHandler : IRequestHandler<ChangePriorityAssignmentCommand>
{
    private readonly IAssignmentRepository _assignmentRepository;

    public ChangePriorityAssignmentCommandHandler(IAssignmentRepository assignmentRepository)
    {
        _assignmentRepository = assignmentRepository;
    }

    public async Task Handle(ChangePriorityAssignmentCommand command, CancellationToken cancellationToken)
    {
        var assignment = await _assignmentRepository.GetAsync(command.AssignmentId);
        if(assignment is null)
        {
            throw new AssignmentNotFoundException(command.AssignmentId);
        }
        assignment.ChangePriorirty(command.Priority);
        await _assignmentRepository.UpdateAsync(assignment);
    }
}