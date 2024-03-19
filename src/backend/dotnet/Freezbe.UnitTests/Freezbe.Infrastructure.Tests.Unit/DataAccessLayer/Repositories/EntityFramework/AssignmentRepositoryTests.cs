using Freezbe.Core.Entities;
using Freezbe.Core.ValueObjects;
using Freezbe.Infrastructure.DataAccessLayer;
using Freezbe.Infrastructure.DataAccessLayer.Repositories.EntityFramework;
using Microsoft.EntityFrameworkCore;
using Shouldly;
using Xunit;

namespace Freezbe.Infrastructure.Tests.Unit.DataAccessLayer.Repositories.EntityFramework;

public class AssignmentRepositoryTests
{
    [Fact]
    public async Task GetAsync_ShouldReturnAssignment_WhenAssignmentExists()
    {
        // ARRANGE
        var options = GetDbContextOptionsBuilder();

        await using var dbContext = new FreezbeDbContext(options);
        var assignmentId = new AssignmentId(Guid.NewGuid());
        var expectedAssignment = new Assignment(assignmentId, "Test Assignment");
        dbContext.Assignments.Add(expectedAssignment);
        await dbContext.SaveChangesAsync();

        var repository = new AssignmentRepository(dbContext);

        // ACT
        var result = await repository.GetAsync(assignmentId);

        // ASSERT
        result.ShouldNotBeNull();
        result.Id.ShouldBe(expectedAssignment.Id);
        result.Description.ShouldBe(expectedAssignment.Description);
    }

    [Fact]
    public async Task GetAllAsync_ShouldReturnAllAssignments()
    {
        // ARRANGE
        var options = new DbContextOptionsBuilder<FreezbeDbContext>().UseInMemoryDatabase(Guid.NewGuid().ToString()).Options;

        await using var dbContext = new FreezbeDbContext(options);
        var expectedAssignments = new List<Assignment>
        {
            new(new AssignmentId(Guid.NewGuid()), "Test Assignment 1"),
            new(new AssignmentId(Guid.NewGuid()), "Test Assignment 2"),
            new(new AssignmentId(Guid.NewGuid()), "Test Assignment 3")
        };
        dbContext.Assignments.AddRange(expectedAssignments);
        await dbContext.SaveChangesAsync();

        var repository = new AssignmentRepository(dbContext);

        // ACT
        var result = await repository.GetAllAsync();

        // ASSERT
        result.ShouldNotBeNull();
        result.Count().ShouldBe(expectedAssignments.Count);
        foreach(var expectedAssignment in expectedAssignments) result.ShouldContain(a => a.Id == expectedAssignment.Id);
    }

    [Fact]
    public async Task AddAsync_ShouldAddAssignment()
    {
        // ARRANGE
        var options = new DbContextOptionsBuilder<FreezbeDbContext>().UseInMemoryDatabase(Guid.NewGuid().ToString()).Options;

        await using var dbContext = new FreezbeDbContext(options);
        var repository = new AssignmentRepository(dbContext);
        var assignmentId = new AssignmentId(Guid.NewGuid());
        var assignmentToAdd = new Assignment(assignmentId, new Description("Test Description 1"));

        // ACT
        await repository.AddAsync(assignmentToAdd);

        // ASSERT
        var result = await dbContext.Assignments.FindAsync(assignmentId);
        result.ShouldNotBeNull();
        result.Id.ShouldBe(assignmentId);
    }

    [Fact]
    public async Task UpdateAsync_ShouldUpdateAssignment()
    {
        // ARRANGE
        var options = new DbContextOptionsBuilder<FreezbeDbContext>().UseInMemoryDatabase(Guid.NewGuid().ToString()).Options;

        await using var dbContext = new FreezbeDbContext(options);
        var assignmentId = new AssignmentId(Guid.NewGuid());
        var initialDescription = new Description("Initial Description");
        var updatedDescription = new Description("Updated Description");
        var assignment = new Assignment(assignmentId, initialDescription);
        dbContext.Assignments.Add(assignment);
        await dbContext.SaveChangesAsync();

        var repository = new AssignmentRepository(dbContext);

        // ACT
        assignment.ChangeDescription(updatedDescription);
        await repository.UpdateAsync(assignment);

        // ASSERT
        var result = await dbContext.Assignments.FindAsync(assignmentId);
        result.ShouldNotBeNull();
        result.Description.ShouldBe(updatedDescription);
    }

    [Fact]
    public async Task DeleteAsync_ShouldDeleteAssignment()
    {
        // ARRANGE
        var options = new DbContextOptionsBuilder<FreezbeDbContext>().UseInMemoryDatabase(Guid.NewGuid().ToString()).Options;

        await using var dbContext = new FreezbeDbContext(options);
        var assignmentId = new AssignmentId(Guid.NewGuid());
        var assignment = new Assignment(assignmentId, new Description("Test Description"));
        dbContext.Assignments.Add(assignment);
        await dbContext.SaveChangesAsync();

        var repository = new AssignmentRepository(dbContext);

        // ACT
        await repository.DeleteAsync(assignment);

        // ASSERT
        var result = await dbContext.Assignments.FindAsync(assignmentId);
        result.ShouldBeNull();
    }

    private static DbContextOptions<FreezbeDbContext> GetDbContextOptionsBuilder()
    {
        return new DbContextOptionsBuilder<FreezbeDbContext>().UseInMemoryDatabase(Guid.NewGuid().ToString()).Options;
    }
}