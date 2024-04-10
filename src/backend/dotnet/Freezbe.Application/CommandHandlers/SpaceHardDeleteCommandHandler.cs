using Freezbe.Application.Commands;
using Freezbe.Application.Exceptions;
using Freezbe.Core.Repositories;
using MediatR;

namespace Freezbe.Application.CommandHandlers;

public class SpaceHardDeleteCommandHandler : IRequestHandler<SpaceHardDeleteCommand>
{
    private readonly ISpaceRepository _spaceRepository;

    public SpaceHardDeleteCommandHandler(ISpaceRepository spaceRepository)
    {
        _spaceRepository = spaceRepository;
    }

    public async Task Handle(SpaceHardDeleteCommand command, CancellationToken cancellationToken)
    {
        var space = await _spaceRepository.GetAsync(command.SpaceId);
        if(space is null)
        {
            throw new SpaceNotFoundException(command.SpaceId);
        }
        await _spaceRepository.DeleteAsync(space);
    }
}