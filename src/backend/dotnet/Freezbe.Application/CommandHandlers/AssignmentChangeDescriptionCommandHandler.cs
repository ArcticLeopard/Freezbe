using Freezbe.Application.Commands;
using Freezbe.Core.Repositories;
using MediatR;

namespace Freezbe.Application.CommandHandlers;

public class AssignmentChangeDescriptionCommandHandler : IRequestHandler<AssignmentChangeDescriptionCommand>
{
    private readonly IAssignmentRepository _assignmentRepository;

    public AssignmentChangeDescriptionCommandHandler(IAssignmentRepository assignmentRepository)
    {
        _assignmentRepository = assignmentRepository;
    }

    public async Task Handle(AssignmentChangeDescriptionCommand command, CancellationToken cancellationToken)
    {
        var assignment = await _assignmentRepository.GetAsync(command.AssignmentId);
        assignment.ChangeDescription(command.Description);
        await _assignmentRepository.UpdateAsync(assignment);
    }
}