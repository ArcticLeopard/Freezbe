using Freezbe.Application.DataTransferObject;
using Freezbe.Application.Queries;
using Freezbe.Core.Repositories;
using MediatR;

namespace Freezbe.Infrastructure.DataAccessLayer.QueryHandlers;

internal class GetProjectsFromSpaceQueryHandler : IRequestHandler<GetProjectsFromSpaceQuery, IEnumerable<ProjectDto>>
{
    private readonly IProjectRepository _projectRepository;

    public GetProjectsFromSpaceQueryHandler(IProjectRepository projectRepository)
    {
        _projectRepository = projectRepository;
    }

    public async Task<IEnumerable<ProjectDto>> Handle(GetProjectsFromSpaceQuery request, CancellationToken cancellationToken)
    {
        var projects = await _projectRepository.GetAllBySpaceIdAsync(request.SpaceId);
        var result = projects.Select(p => new ProjectDto(p.Id, p.Description));
        return result;
    }
}