using Freezbe.Application.Abstractions;
using Freezbe.Application.Commands;
using Freezbe.Core.Entities;
using Freezbe.Core.Repositories;

namespace Freezbe.Application.CommandHandlers;

public class CreateSpaceCommandHandler : ICommandHandler<CreateSpaceCommand>
{
    private readonly ISpaceRepository _spaceRepository;

    public CreateSpaceCommandHandler(ISpaceRepository spaceRepository)
    {
        _spaceRepository = spaceRepository;
    }

    public async Task HandleAsync(CreateSpaceCommand command)
    {
        var space = new Space(command.Id, command.Description);
        await _spaceRepository.AddAsync(space);
    }
}