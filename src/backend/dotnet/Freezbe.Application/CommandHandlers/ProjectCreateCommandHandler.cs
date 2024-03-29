using Freezbe.Application.Commands;
using Freezbe.Application.Exceptions;
using Freezbe.Core.Entities;
using Freezbe.Core.Repositories;
using MediatR;

namespace Freezbe.Application.CommandHandlers;

public class ProjectCreateCommandHandler : IRequestHandler<ProjectCreateCommand>
{
    private readonly ISpaceRepository _spaceRepository;

    public ProjectCreateCommandHandler(ISpaceRepository spaceRepository)
    {
        _spaceRepository = spaceRepository;
    }

    public async Task Handle(ProjectCreateCommand command, CancellationToken cancellationToken)
    {
        var space = await _spaceRepository.GetAsync(command.SpaceId);
        if(space is null)
        {
            throw new SpaceNotFoundException(command.SpaceId);
        }
        var project = new Project(command.ProjectId, command.Description);
        space.AddProject(project);
        await _spaceRepository.UpdateAsync(space);
    }
}