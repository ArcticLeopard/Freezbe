using Freezbe.Application.DataTransferObject;
using MediatR;

namespace Freezbe.Application.Queries;

public class GetProjectsForSpaceQuery : IRequest<IEnumerable<ProjectDto>>
{
    public GetProjectsForSpaceQuery(Guid spaceId)
    {
        SpaceId = spaceId;
    }

    public Guid SpaceId { get; }
}