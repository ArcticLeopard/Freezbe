using Freezbe.Application.DataTransferObject;
using Freezbe.Application.Exceptions;
using Freezbe.Application.Queries;
using Freezbe.Core.Repositories;
using MediatR;

namespace Freezbe.Infrastructure.DataAccessLayer.QueryHandlers;

internal class GetProjectQueryHandler : IRequestHandler<GetProjectQuery, ProjectDto>
{
    private readonly IProjectRepository _projectRepository;

    public GetProjectQueryHandler(IProjectRepository projectRepository)
    {
        _projectRepository = projectRepository;
    }

    public async Task<ProjectDto> Handle(GetProjectQuery request, CancellationToken cancellationToken)
    {
        var project = await _projectRepository.GetAsync(request.ProjectId);
        if(project is null)
        {
            throw new ProjectNotFoundException(request.ProjectId);
        }
        var result = new ProjectDto(project.Id, project.Description);
        return result;
    }
}