using Freezbe.Application.Commands;
using Freezbe.Application.Exceptions;
using Freezbe.Core.Repositories;
using MediatR;

namespace Freezbe.Application.CommandHandlers;

public class ChangeDescriptionSpaceCommandHandler : IRequestHandler<ChangeDescriptionSpaceCommand>
{
    private readonly ISpaceRepository _spaceRepository;

    public ChangeDescriptionSpaceCommandHandler(ISpaceRepository spaceRepository)
    {
        _spaceRepository = spaceRepository;
    }

    public async Task Handle(ChangeDescriptionSpaceCommand command, CancellationToken cancellationToken)
    {
        var space = await _spaceRepository.GetAsync(command.SpaceId);
        if(space is null)
        {
            throw new SpaceNotFoundException(command.SpaceId);
        }
        space.ChangeDescription(command.Description);
        await _spaceRepository.UpdateAsync(space);
    }
}