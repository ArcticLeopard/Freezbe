using Freezbe.Application.Commands;
using Freezbe.Application.Exceptions;
using Freezbe.Core.Repositories;
using MediatR;

namespace Freezbe.Application.CommandHandlers;

public class ChangeDescriptionProjectCommandHandler : IRequestHandler<ChangeDescriptionProjectCommand>
{
    private readonly IProjectRepository _projectRepository;

    public ChangeDescriptionProjectCommandHandler(IProjectRepository projectRepository)
    {
        _projectRepository = projectRepository;
    }

    public async Task Handle(ChangeDescriptionProjectCommand command, CancellationToken cancellationToken)
    {
        var project = await _projectRepository.GetAsync(command.ProjectId);
        if(project is null)
        {
            throw new ProjectNotFoundException(command.ProjectId);
        }
        project.ChangeDescription(command.Description);
        await _projectRepository.UpdateAsync(project);
    }
}