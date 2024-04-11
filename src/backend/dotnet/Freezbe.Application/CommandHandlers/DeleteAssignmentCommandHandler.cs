using Freezbe.Application.Commands;
using Freezbe.Application.Exceptions;
using Freezbe.Core.Repositories;
using MediatR;

namespace Freezbe.Application.CommandHandlers;

public class DeleteAssignmentCommandHandler : IRequestHandler<DeleteAssignmentCommand>
{
    private readonly IAssignmentRepository _assignmentRepository;

    public DeleteAssignmentCommandHandler(IAssignmentRepository assignmentRepository)
    {
        _assignmentRepository = assignmentRepository;
    }

    public async Task Handle(DeleteAssignmentCommand command, CancellationToken cancellationToken)
    {
        var assignment = await _assignmentRepository.GetAsync(command.AssignmentId);
        if(assignment is null)
        {
            throw new AssignmentNotFoundException(command.AssignmentId);
        }
        await _assignmentRepository.DeleteAsync(assignment);
    }
}