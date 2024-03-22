using Freezbe.Core.Entities;
using Freezbe.Core.Repositories;
using Freezbe.Core.ValueObjects;
using Microsoft.EntityFrameworkCore;

namespace Freezbe.Infrastructure.DataAccessLayer.Repositories.EntityFramework;

internal class AssignmentRepository : IAssignmentRepository
{
    private readonly FreezbeDbContext _dbContext;

    public AssignmentRepository(FreezbeDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Assignment> GetAsync(AssignmentId assignmentId)
    {
        return await _dbContext.Assignments.Include(p => p.Comments).SingleOrDefaultAsync(p => p.Id == assignmentId);
    }

    public async Task<IEnumerable<Assignment>> GetAllAsync()
    {
        return await _dbContext.Assignments.Include(p => p.Comments).ToListAsync();
    }

    public async Task AddAsync(Assignment assignment)
    {
        await _dbContext.Assignments.AddAsync(assignment);
        await _dbContext.SaveChangesAsync();
    }

    public async Task UpdateAsync(Assignment assignment)
    {
        _dbContext.Assignments.Update(assignment);
        await _dbContext.SaveChangesAsync();
    }

    public async Task DeleteAsync(Assignment assignment)
    {
        _dbContext.Assignments.Remove(assignment);
        await _dbContext.SaveChangesAsync();
    }
}