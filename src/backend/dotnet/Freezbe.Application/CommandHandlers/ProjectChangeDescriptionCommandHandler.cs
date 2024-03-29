using Freezbe.Application.Commands;
using Freezbe.Core.Repositories;
using MediatR;

namespace Freezbe.Application.CommandHandlers;

public class ProjectChangeDescriptionCommandHandler : IRequestHandler<ProjectChangeDescriptionCommand>
{
    private readonly IProjectRepository _projectRepository;

    public ProjectChangeDescriptionCommandHandler(IProjectRepository projectRepository)
    {
        _projectRepository = projectRepository;
    }

    public async Task Handle(ProjectChangeDescriptionCommand command, CancellationToken cancellationToken)
    {
        var project = await _projectRepository.GetAsync(command.ProjectId);
        project.ChangeDescription(command.Description);
        await _projectRepository.UpdateAsync(project);
    }
}