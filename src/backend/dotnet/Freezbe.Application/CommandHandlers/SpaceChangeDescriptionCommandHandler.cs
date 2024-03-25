using Freezbe.Application.Abstractions;
using Freezbe.Application.Commands;
using Freezbe.Core.Repositories;

namespace Freezbe.Application.CommandHandlers;

public class SpaceChangeDescriptionCommandHandler : ICommandHandler<SpaceChangeDescriptionCommand>
{
    private readonly ISpaceRepository _spaceRepository;

    public SpaceChangeDescriptionCommandHandler(ISpaceRepository spaceRepository)
    {
        _spaceRepository = spaceRepository;
    }

    public async Task HandleAsync(SpaceChangeDescriptionCommand command)
    {
        var space = await _spaceRepository.GetAsync(command.Id);
        space.ChangeDescription(command.Description);
        await _spaceRepository.UpdateAsync(space);
    }
}