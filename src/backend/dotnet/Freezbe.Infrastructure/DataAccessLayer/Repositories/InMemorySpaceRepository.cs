using Freezbe.Core.Entities;
using Freezbe.Core.Repositories;
using Freezbe.Core.ValueObjects;

namespace Freezbe.Infrastructure.DataAccessLayer.Repositories;

//Temporary implementation
public class InMemorySpaceRepository : ISpaceRepository
{
    private readonly List<Space> _spaces = new();

    public async Task<Space> GetAsync(SpaceId spaceId)
    {
        await Task.CompletedTask;
        return _spaces.SingleOrDefault(p => p.Id == spaceId);
    }

    public async Task<IEnumerable<Space>> GetAllAsync()
    {
        await Task.CompletedTask;
        return _spaces;
    }

    public Task AddAsync(Space space)
    {
        _spaces.Add(space);
        return Task.CompletedTask;
    }

    public Task UpdateAsync(Space space)
    {
        throw new NotImplementedException();
    }

    public Task DeleteAsync(Space space)
    {
        _spaces.Remove(space);
        return Task.CompletedTask;
    }
}