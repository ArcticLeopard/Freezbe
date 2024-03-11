using Freezbe.Core.Entities;
using Freezbe.Core.ValueObjects;

namespace Freezbe.Core.Repositories;

public interface IProjectRepository
{
    Task<Project> Get(ProjectId projectId);
    Task<IEnumerable<Project>> GetAllAsync();
    Task AddAsync(Project project);
    Task Update(Project project);
    Task DeleteAsync(Project project);
}