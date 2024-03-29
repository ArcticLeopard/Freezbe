using Freezbe.Application.Commands;
using Freezbe.Application.Exceptions;
using Freezbe.Core.Entities;
using Freezbe.Core.Repositories;
using MediatR;

namespace Freezbe.Application.CommandHandlers;

public class AssignmentCreateCommandHandler : IRequestHandler<AssignmentCreateCommand>
{
    private readonly IProjectRepository _projectRepository;

    public AssignmentCreateCommandHandler(IProjectRepository projectRepository)
    {
        _projectRepository = projectRepository;
    }

    public async Task Handle(AssignmentCreateCommand command, CancellationToken cancellationToken)
    {
        var project = await _projectRepository.GetAsync(command.ProjectId);
        if(project is null)
        {
            throw new ProjectNotFoundException(command.ProjectId);
        }
        var assignment = new Assignment(command.AssignmentId, command.Description);
        project.AddAssignment(assignment);
        await _projectRepository.UpdateAsync(project);
    }
}