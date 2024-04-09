using Freezbe.Application.Commands;
using Freezbe.Application.Exceptions;
using Freezbe.Core.Entities;
using Freezbe.Core.Repositories;
using Freezbe.Core.ValueObjects;
using MediatR;

namespace Freezbe.Application.CommandHandlers;

public class ProjectCreateCommandHandler : IRequestHandler<ProjectCreateCommand>
{
    private readonly TimeProvider _timeProvider;
    private readonly ISpaceRepository _spaceRepository;

    public ProjectCreateCommandHandler(TimeProvider timeProvider, ISpaceRepository spaceRepository)
    {
        _timeProvider = timeProvider;
        _spaceRepository = spaceRepository;
    }

    public async Task Handle(ProjectCreateCommand command, CancellationToken cancellationToken)
    {
        var space = await _spaceRepository.GetAsync(command.SpaceId);
        if(space is null)
        {
            throw new SpaceNotFoundException(command.SpaceId);
        }
        var project = new Project(command.ProjectId, command.Description, _timeProvider.GetUtcNow(), ProjectStatus.Active);
        space.AddProject(project);
        await _spaceRepository.UpdateAsync(space);
    }
}