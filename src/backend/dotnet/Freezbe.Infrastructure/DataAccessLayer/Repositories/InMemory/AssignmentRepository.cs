﻿using Freezbe.Core.Entities;
using Freezbe.Core.Repositories;
using Freezbe.Core.ValueObjects;

namespace Freezbe.Infrastructure.DataAccessLayer.Repositories.InMemory;

//Temporary implementation
public class AssignmentRepository : IAssignmentRepository
{
    private readonly List<Assignment> _assignments = new();

    public async Task<Assignment> GetAsync(AssignmentId assignmentId)
    {
        await Task.CompletedTask;
        return _assignments.SingleOrDefault(p => p.Id == assignmentId);
    }

    public async Task<IEnumerable<Assignment>> GetAllAsync()
    {
        await Task.CompletedTask;
        return _assignments;
    }

    public Task AddAsync(Assignment assignment)
    {
        _assignments.Add(assignment);
        return Task.CompletedTask;
    }

    public Task UpdateAsync(Assignment assignment)
    {
        throw new NotImplementedException();
    }

    public Task DeleteAsync(Assignment assignment)
    {
        _assignments.Remove(assignment);
        return Task.CompletedTask;
    }
}