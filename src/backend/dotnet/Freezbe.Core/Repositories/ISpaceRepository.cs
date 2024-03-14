using Freezbe.Core.Entities;
using Freezbe.Core.ValueObjects;

namespace Freezbe.Core.Repositories;

public interface ISpaceRepository
{
    Task<Space> GetAsync(SpaceId spaceId);
    Task<IEnumerable<Space>> GetAllAsync();
    Task AddAsync(Space space);
    Task UpdateAsync(Space space);
    Task DeleteAsync(Space space);
}