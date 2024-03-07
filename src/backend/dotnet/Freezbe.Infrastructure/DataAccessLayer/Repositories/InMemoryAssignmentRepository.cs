using Freezbe.Core.Entities;
using Freezbe.Core.Repositories;

namespace Freezbe.Infrastructure.DataAccessLayer.Repositories;

public class InMemoryAssignmentRepository : IAssignmentRepository
{
    private readonly List<Assignment> _assignments;

    public async Task<IEnumerable<Assignment>> GetAllAsync()
    {
        await Task.CompletedTask;
        return _assignments;
    }

    public async Task AddAsync(Assignment assignment)
    {
        await Task.CompletedTask;
        _assignments.Add(assignment);
    }
}