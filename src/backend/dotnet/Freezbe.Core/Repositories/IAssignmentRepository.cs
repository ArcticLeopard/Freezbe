using Freezbe.Core.Entities;

namespace Freezbe.Core.Repositories;

public interface IAssignmentRepository
{
    Task<IEnumerable<Assignment>> GetAllAsync();
    Task AddAsync(Assignment assignment);
}