using Freezbe.Application.DataTransferObject;
using Freezbe.Application.Exceptions;
using Freezbe.Application.Queries;
using Freezbe.Core.Repositories;
using MediatR;

namespace Freezbe.Infrastructure.DataAccessLayer.QueryHandlers;

internal class GetSpaceQueryHandler : IRequestHandler<GetSpaceQuery, SpaceDto>
{
    private readonly ISpaceRepository _spaceRepository;

    public GetSpaceQueryHandler(ISpaceRepository spaceRepository)
    {
        _spaceRepository = spaceRepository;
    }

    public async Task<SpaceDto> Handle(GetSpaceQuery request, CancellationToken cancellationToken)
    {
        var space = await _spaceRepository.GetAsync(request.SpaceId);
        if(space is null)
        {
            throw new SpaceNotFoundException(request.SpaceId);
        }
        var result = new SpaceDto(space.Id, space.Description);
        return result;
    }
}