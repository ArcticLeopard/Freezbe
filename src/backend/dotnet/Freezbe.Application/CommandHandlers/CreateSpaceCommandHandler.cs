using Freezbe.Application.Commands;
using Freezbe.Core.Entities;
using Freezbe.Core.Repositories;
using MediatR;

namespace Freezbe.Application.CommandHandlers;

public class CreateSpaceCommandHandler : IRequestHandler<CreateSpaceCommand>
{
    private readonly TimeProvider _timeProvider;
    private readonly ISpaceRepository _spaceRepository;

    public CreateSpaceCommandHandler(TimeProvider timeProvider, ISpaceRepository spaceRepository)
    {
        _timeProvider = timeProvider;
        _spaceRepository = spaceRepository;
    }

    public async Task Handle(CreateSpaceCommand command, CancellationToken cancellationToken)
    {
        var space = new Space(command.SpaceId, command.Description, _timeProvider.GetUtcNow());
        await _spaceRepository.AddAsync(space);
    }
}