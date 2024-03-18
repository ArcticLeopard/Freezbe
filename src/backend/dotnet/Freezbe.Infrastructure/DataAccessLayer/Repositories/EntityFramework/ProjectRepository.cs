using Freezbe.Core.Entities;
using Freezbe.Core.Repositories;
using Freezbe.Core.ValueObjects;
using Microsoft.EntityFrameworkCore;

namespace Freezbe.Infrastructure.DataAccessLayer.Repositories.EntityFramework;

internal class ProjectRepository : IProjectRepository
{
    private readonly FreezbeDbContext _dbContext;

    public ProjectRepository(FreezbeDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Project> GetAsync(ProjectId projectId)
    {
        return await _dbContext.Projects.SingleOrDefaultAsync(p => p.Id == projectId);
    }

    public async Task<IEnumerable<Project>> GetAllAsync()
    {
        return await _dbContext.Projects.ToListAsync();
    }

    public async Task AddAsync(Project project)
    {
        await _dbContext.Projects.AddAsync(project);
        await _dbContext.SaveChangesAsync();
    }

    public async Task UpdateAsync(Project project)
    {
        _dbContext.Projects.Update(project);
        await _dbContext.SaveChangesAsync();
    }

    public async Task DeleteAsync(Project project)
    {
        _dbContext.Projects.Remove(project);
        await _dbContext.SaveChangesAsync();
    }
}