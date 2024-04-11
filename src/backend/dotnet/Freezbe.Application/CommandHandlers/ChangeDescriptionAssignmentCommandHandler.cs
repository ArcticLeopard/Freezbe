using Freezbe.Application.Commands;
using Freezbe.Core.Repositories;
using MediatR;

namespace Freezbe.Application.CommandHandlers;

public class ChangeDescriptionAssignmentCommandHandler : IRequestHandler<ChangeDescriptionAssignmentCommand>
{
    private readonly IAssignmentRepository _assignmentRepository;

    public ChangeDescriptionAssignmentCommandHandler(IAssignmentRepository assignmentRepository)
    {
        _assignmentRepository = assignmentRepository;
    }

    public async Task Handle(ChangeDescriptionAssignmentCommand command, CancellationToken cancellationToken)
    {
        var assignment = await _assignmentRepository.GetAsync(command.AssignmentId);
        assignment.ChangeDescription(command.Description);
        await _assignmentRepository.UpdateAsync(assignment);
    }
}