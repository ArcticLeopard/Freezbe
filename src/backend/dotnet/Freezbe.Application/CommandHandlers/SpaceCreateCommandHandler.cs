using Freezbe.Application.Commands;
using Freezbe.Core.Entities;
using Freezbe.Core.Repositories;
using MediatR;

namespace Freezbe.Application.CommandHandlers;

public class SpaceCreateCommandHandler : IRequestHandler<SpaceCreateCommand>
{
    private readonly TimeProvider _timeProvider;
    private readonly ISpaceRepository _spaceRepository;

    public SpaceCreateCommandHandler(TimeProvider timeProvider, ISpaceRepository spaceRepository)
    {
        _timeProvider = timeProvider;
        _spaceRepository = spaceRepository;
    }

    public async Task Handle(SpaceCreateCommand command, CancellationToken cancellationToken)
    {
        var space = new Space(command.SpaceId, command.Description, _timeProvider.GetUtcNow());
        await _spaceRepository.AddAsync(space);
    }
}