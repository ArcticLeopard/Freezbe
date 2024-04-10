using Freezbe.Application.Commands;
using Freezbe.Application.Exceptions;
using Freezbe.Core.Repositories;
using MediatR;

namespace Freezbe.Application.CommandHandlers;

public class AssignmentHardDeleteCommandHandler : IRequestHandler<AssignmentHardDeleteCommand>
{
    private readonly IAssignmentRepository _assignmentRepository;

    public AssignmentHardDeleteCommandHandler(IAssignmentRepository assignmentRepository)
    {
        _assignmentRepository = assignmentRepository;
    }

    public async Task Handle(AssignmentHardDeleteCommand command, CancellationToken cancellationToken)
    {
        var assignment = await _assignmentRepository.GetAsync(command.AssignmentId);
        if(assignment is null)
        {
            throw new AssignmentNotFoundException(command.AssignmentId);
        }
        await _assignmentRepository.DeleteAsync(assignment);
    }
}