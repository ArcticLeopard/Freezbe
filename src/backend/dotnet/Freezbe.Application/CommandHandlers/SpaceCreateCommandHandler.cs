using Freezbe.Application.Commands;
using Freezbe.Core.Entities;
using Freezbe.Core.Repositories;
using MediatR;

namespace Freezbe.Application.CommandHandlers;

public class SpaceCreateCommandHandler : IRequestHandler<SpaceCreateCommand>
{
    private readonly ISpaceRepository _spaceRepository;

    public SpaceCreateCommandHandler(ISpaceRepository spaceRepository)
    {
        _spaceRepository = spaceRepository;
    }

    public async Task Handle(SpaceCreateCommand command, CancellationToken cancellationToken)
    {
        var space = new Space(command.SpaceId, command.Description);
        await _spaceRepository.AddAsync(space);
    }
}