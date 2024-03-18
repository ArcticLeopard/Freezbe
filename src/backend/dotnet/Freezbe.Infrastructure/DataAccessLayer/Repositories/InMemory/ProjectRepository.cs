using Freezbe.Core.Entities;
using Freezbe.Core.Repositories;
using Freezbe.Core.ValueObjects;

namespace Freezbe.Infrastructure.DataAccessLayer.Repositories.InMemory;

//Temporary implementation
public class ProjectRepository : IProjectRepository
{
    private readonly List<Project> _projects = new();

    public async Task<Project> GetAsync(ProjectId projectId)
    {
        await Task.CompletedTask;
        return _projects.SingleOrDefault(p => p.Id == projectId);
    }

    public async Task<IEnumerable<Project>> GetAllAsync()
    {
        await Task.CompletedTask;
        return _projects;
    }

    public Task AddAsync(Project project)
    {
        _projects.Add(project);
        return Task.CompletedTask;
    }

    public Task UpdateAsync(Project project)
    {
        throw new NotImplementedException();
    }

    public Task DeleteAsync(Project project)
    {
        _projects.Remove(project);
        return Task.CompletedTask;
    }
}