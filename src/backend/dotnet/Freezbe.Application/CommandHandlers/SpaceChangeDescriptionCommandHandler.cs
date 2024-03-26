using Freezbe.Application.Commands;
using Freezbe.Core.Repositories;
using MediatR;

namespace Freezbe.Application.CommandHandlers;

public class SpaceChangeDescriptionCommandHandler : IRequestHandler<SpaceChangeDescriptionCommand>
{
    private readonly ISpaceRepository _spaceRepository;

    public SpaceChangeDescriptionCommandHandler(ISpaceRepository spaceRepository)
    {
        _spaceRepository = spaceRepository;
    }

    public async Task Handle(SpaceChangeDescriptionCommand command, CancellationToken cancellationToken)
    {
        var space = await _spaceRepository.GetAsync(command.Id);
        space.ChangeDescription(command.Description);
        await _spaceRepository.UpdateAsync(space);
    }
}