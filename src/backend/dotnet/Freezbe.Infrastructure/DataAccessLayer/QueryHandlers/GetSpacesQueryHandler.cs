using Freezbe.Application.DataTransferObject;
using Freezbe.Application.Queries;
using Freezbe.Core.Repositories;
using MediatR;

namespace Freezbe.Infrastructure.DataAccessLayer.QueryHandlers;

internal class GetSpacesQueryHandler : IRequestHandler<GetSpacesQuery, IEnumerable<SpaceDto>>
{
    private readonly ISpaceRepository _spaceRepository;

    public GetSpacesQueryHandler(ISpaceRepository spaceRepository)
    {
        _spaceRepository = spaceRepository;
    }

    public async Task<IEnumerable<SpaceDto>> Handle(GetSpacesQuery request, CancellationToken cancellationToken)
    {
        var spaces = await _spaceRepository.GetAllAsync();
        var result = spaces.Select(p => new SpaceDto(p.Id, p.Description));
        return result;
    }
}