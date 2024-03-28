using Freezbe.Core.Entities;
using Freezbe.Core.ValueObjects;

namespace Freezbe.Core.Repositories;

public interface IProjectRepository
{
    Task<Project> GetAsync(ProjectId projectId);
    Task<IEnumerable<Project>> GetAllAsync();
    Task<IEnumerable<Project>> GetAllBySpaceIdAsync(SpaceId spaceId);
    Task AddAsync(Project project);
    Task UpdateAsync(Project project);
    Task DeleteAsync(Project project);
}