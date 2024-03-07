using Freezbe.Core.Entities;
using Freezbe.Core.ValueObjects;

namespace Freezbe.Core.Repositories;

public interface IAssignmentRepository
{
    Task<Assignment> Get(AssignmentId assignmentId);
    Task<IEnumerable<Assignment>> GetAllAsync();
    Task AddAsync(Assignment assignment);
    Task Update(Assignment assignment);
    Task DeleteAsync(Assignment assignment);
}