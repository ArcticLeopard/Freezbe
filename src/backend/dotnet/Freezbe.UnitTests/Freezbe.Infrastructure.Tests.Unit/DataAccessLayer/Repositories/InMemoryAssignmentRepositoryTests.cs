using Freezbe.Core.Entities;
using Freezbe.Core.ValueObjects;
using Freezbe.Infrastructure.DataAccessLayer.Repositories;
using Shouldly;
using Xunit;

namespace Freezbe.Infrastructure.Tests.Unit.DataAccessLayer.Repositories;

public class InMemoryAssignmentRepositoryTests
{
    [Fact]
    public async Task GetAsyncReturnsCorrectAssignment()
    {
        // ARRANGE
        var repository = new InMemoryAssignmentRepository();
        var assignmentId = new AssignmentId(Guid.NewGuid());
        var assignment = new Assignment(assignmentId, "Test Assignment");
        await repository.AddAsync(assignment);

        // ACT
        var result = await repository.GetAsync(assignmentId);

        // ASSERT
        Assert.Equal(assignment, result);
    }

    [Fact]
    public async Task GetAllAsyncReturnsAllAssignments()
    {
        // ARRANGE
        var repository = new InMemoryAssignmentRepository();
        var assignments = new List<Assignment>
        {
            new(new AssignmentId(Guid.NewGuid()), "Assignment 1"),
            new(new AssignmentId(Guid.NewGuid()), "Assignment 2"),
            new(new AssignmentId(Guid.NewGuid()), "Assignment 3")
        };
        foreach(var assignment in assignments) await repository.AddAsync(assignment);

        // ACT
        var result = await repository.GetAllAsync();

        // ASSERT
        Assert.Equal(assignments, result);
    }

    [Fact]
    public async Task AddAsyncAddsAssignmentToRepository()
    {
        // ARRANGE
        var repository = new InMemoryAssignmentRepository();
        var assignmentId = new AssignmentId(Guid.NewGuid());
        var assignment = new Assignment(assignmentId, "Test Assignment");

        // ACT
        await repository.AddAsync(assignment);
        var result = await repository.GetAsync(assignmentId);

        // ASSERT
        Assert.Equal(assignment, result);
    }

    [Fact]
    public async Task DeleteAsyncRemovesAssignmentFromRepository()
    {
        // ARRANGE
        var repository = new InMemoryAssignmentRepository();
        var assignmentId = new AssignmentId(Guid.NewGuid());
        var assignment = new Assignment(assignmentId, "Test Assignment");
        await repository.AddAsync(assignment);

        // ACT
        await repository.DeleteAsync(assignment);
        var result = await repository.GetAsync(assignmentId);

        // ASSERT
        Assert.Null(result);
    }

    [Fact]
    public async Task UpdateAsyncThrowsNotImplementedException()
    {
        // ARRANGE
        var repository = new InMemoryAssignmentRepository();
        var assignmentId = new AssignmentId(Guid.NewGuid());
        var assignment = new Assignment(assignmentId, "Test Assignment");

        // ACT & ASSERT
        await Assert.ThrowsAsync<NotImplementedException>(() => repository.UpdateAsync(assignment));
    }

    [Fact]
    public async Task AfterAddingAnItemToTheCollectionTheItemShouldExistInTheRepositoryAndHaveCorrectValueAfterUseGet()
    {
        // ARRANGE
        var memoryAssignmentRepository = new InMemoryAssignmentRepository();
        var assignmentId = new AssignmentId(Guid.NewGuid());
        var createdAssignment = new Assignment(assignmentId, "Test Assignment");
        await memoryAssignmentRepository.AddAsync(createdAssignment);

        // ACT

        var assignment = await memoryAssignmentRepository.GetAsync(createdAssignment.Id);

        // ASSERT
        assignment.ShouldNotBeNull();
        assignment.Id.ShouldBe(createdAssignment.Id);
        assignment.Description.ShouldBe(createdAssignment.Description);
    }

    [Fact]
    public async Task AfterAddingAnItemToTheCollectionTheItemShouldExistInTheRepositoryAndHaveCorrectValueAfterUseGetAll()
    {
        // ARRANGE
        var memoryAssignmentRepository = new InMemoryAssignmentRepository();
        var assignmentId = new AssignmentId(Guid.NewGuid());
        var createdAssignment = new Assignment(assignmentId, "Test Assignment");
        await memoryAssignmentRepository.AddAsync(createdAssignment);

        // ACT

        var collection = (await memoryAssignmentRepository.GetAllAsync()).ToList();

        // ASSERT
        collection.ShouldNotBeEmpty();
        collection.ShouldNotBeNull();
        collection.ShouldContain(p => p.Description == "Test Assignment");
        collection.ShouldHaveSingleItem();
        collection.First().Id.ShouldBe(createdAssignment.Id);
    }
}