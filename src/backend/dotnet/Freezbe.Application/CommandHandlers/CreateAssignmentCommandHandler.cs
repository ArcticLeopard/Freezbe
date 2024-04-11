using Freezbe.Application.Commands;
using Freezbe.Application.Exceptions;
using Freezbe.Core.Entities;
using Freezbe.Core.Repositories;
using Freezbe.Core.ValueObjects;
using MediatR;

namespace Freezbe.Application.CommandHandlers;

public class CreateAssignmentCommandHandler : IRequestHandler<CreateAssignmentCommand>
{
    private readonly TimeProvider _timeProvider;
    private readonly IProjectRepository _projectRepository;

    public CreateAssignmentCommandHandler(TimeProvider timeProvider, IProjectRepository projectRepository)
    {
        _timeProvider = timeProvider;
        _projectRepository = projectRepository;
    }

    public async Task Handle(CreateAssignmentCommand command, CancellationToken cancellationToken)
    {
        var project = await _projectRepository.GetAsync(command.ProjectId);
        if(project is null)
        {
            throw new ProjectNotFoundException(command.ProjectId);
        }
        var assignment = new Assignment(command.AssignmentId, command.Description, _timeProvider.GetUtcNow(), AssignmentStatus.Active);
        project.AddAssignment(assignment);
        await _projectRepository.UpdateAsync(project);
    }
}