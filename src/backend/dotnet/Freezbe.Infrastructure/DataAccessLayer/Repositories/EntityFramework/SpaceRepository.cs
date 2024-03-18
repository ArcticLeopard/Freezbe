using Freezbe.Core.Entities;
using Freezbe.Core.Repositories;
using Freezbe.Core.ValueObjects;
using Microsoft.EntityFrameworkCore;

namespace Freezbe.Infrastructure.DataAccessLayer.Repositories.EntityFramework;

internal class SpaceRepository : ISpaceRepository
{
    private readonly FreezbeDbContext _dbContext;

    public SpaceRepository(FreezbeDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Space> GetAsync(SpaceId spaceId)
    {
        return await _dbContext.Spaces.SingleOrDefaultAsync(p => p.Id == spaceId);
    }

    public async Task<IEnumerable<Space>> GetAllAsync()
    {
        return await _dbContext.Spaces.ToListAsync();
    }

    public async Task AddAsync(Space space)
    {
        await _dbContext.Spaces.AddAsync(space);
        await _dbContext.SaveChangesAsync();
    }

    public async Task UpdateAsync(Space space)
    {
        _dbContext.Spaces.Update(space);
        await _dbContext.SaveChangesAsync();
    }

    public async Task DeleteAsync(Space space)
    {
        _dbContext.Spaces.Remove(space);
        await _dbContext.SaveChangesAsync();
    }
}