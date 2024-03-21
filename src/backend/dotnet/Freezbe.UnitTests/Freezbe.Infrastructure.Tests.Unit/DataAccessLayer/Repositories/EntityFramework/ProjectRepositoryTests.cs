using Freezbe.Core.Entities;
using Freezbe.Core.ValueObjects;
using Freezbe.Infrastructure.DataAccessLayer;
using Freezbe.Infrastructure.DataAccessLayer.Repositories.EntityFramework;
using Microsoft.EntityFrameworkCore;
using Shouldly;
using Xunit;

namespace Freezbe.Infrastructure.Tests.Unit.DataAccessLayer.Repositories.EntityFramework;

public class ProjectRepositoryTests
{
    [Fact]
    public async Task GetAsync_ShouldReturnProject_WhenProjectExists()
    {
        // ARRANGE
        var options = GetDbContextOptionsBuilder();

        await using var dbContext = new FreezbeDbContext(options);
        var projectId = new ProjectId(Guid.NewGuid());
        var expectedProject = new Project(projectId, "Test Project");
        dbContext.Projects.Add(expectedProject);
        await dbContext.SaveChangesAsync();

        var repository = new ProjectRepository(dbContext);

        // ACT
        var result = await repository.GetAsync(projectId);

        // ASSERT
        result.ShouldNotBeNull();
        result.Id.ShouldBe(expectedProject.Id);
        result.Description.ShouldBe(expectedProject.Description);
    }

    [Fact]
    public async Task GetAllAsync_ShouldReturnAllProjects()
    {
        // ARRANGE
        var options = new DbContextOptionsBuilder<FreezbeDbContext>().UseInMemoryDatabase(Guid.NewGuid().ToString()).Options;

        await using var dbContext = new FreezbeDbContext(options);
        var expectedProjects = new List<Project>
        {
            new(new ProjectId(Guid.NewGuid()), "Test Project 1"),
            new(new ProjectId(Guid.NewGuid()), "Test Project 2"),
            new(new ProjectId(Guid.NewGuid()), "Test Project 3")
        };
        dbContext.Projects.AddRange(expectedProjects);
        await dbContext.SaveChangesAsync();

        var repository = new ProjectRepository(dbContext);

        // ACT
        var result = (await repository.GetAllAsync()).ToList();

        // ASSERT
        result.ShouldNotBeNull();
        result.Count.ShouldBe(expectedProjects.Count);
        foreach(var expectedProject in expectedProjects) result.ShouldContain(a => a.Id == expectedProject.Id);
    }

    [Fact]
    public async Task AddAsync_ShouldAddProject()
    {
        // ARRANGE
        var options = new DbContextOptionsBuilder<FreezbeDbContext>().UseInMemoryDatabase(Guid.NewGuid().ToString()).Options;

        await using var dbContext = new FreezbeDbContext(options);
        var repository = new ProjectRepository(dbContext);
        var projectId = new ProjectId(Guid.NewGuid());
        var projectToAdd = new Project(projectId, new Description("Test Description 1"));

        // ACT
        await repository.AddAsync(projectToAdd);

        // ASSERT
        var result = await dbContext.Projects.FindAsync(projectId);
        result.ShouldNotBeNull();
        result.Id.ShouldBe(projectId);
    }

    [Fact]
    public async Task UpdateAsync_ShouldUpdateProject()
    {
        // ARRANGE
        var options = new DbContextOptionsBuilder<FreezbeDbContext>().UseInMemoryDatabase(Guid.NewGuid().ToString()).Options;

        await using var dbContext = new FreezbeDbContext(options);
        var projectId = new ProjectId(Guid.NewGuid());
        var initialDescription = new Description("Initial Description");
        var updatedDescription = new Description("Updated Description");
        var project = new Project(projectId, initialDescription);
        dbContext.Projects.Add(project);
        await dbContext.SaveChangesAsync();

        var repository = new ProjectRepository(dbContext);

        // ACT
        project.ChangeDescription(updatedDescription);
        await repository.UpdateAsync(project);

        // ASSERT
        var result = await dbContext.Projects.FindAsync(projectId);
        result.ShouldNotBeNull();
        result.Description.ShouldBe(updatedDescription);
    }

    [Fact]
    public async Task DeleteAsync_ShouldDeleteProject()
    {
        // ARRANGE
        var options = new DbContextOptionsBuilder<FreezbeDbContext>().UseInMemoryDatabase(Guid.NewGuid().ToString()).Options;

        await using var dbContext = new FreezbeDbContext(options);
        var projectId = new ProjectId(Guid.NewGuid());
        var project = new Project(projectId, new Description("Test Description"));
        dbContext.Projects.Add(project);
        await dbContext.SaveChangesAsync();

        var repository = new ProjectRepository(dbContext);

        // ACT
        await repository.DeleteAsync(project);

        // ASSERT
        var result = await dbContext.Projects.FindAsync(projectId);
        result.ShouldBeNull();
    }

    private static DbContextOptions<FreezbeDbContext> GetDbContextOptionsBuilder()
    {
        return new DbContextOptionsBuilder<FreezbeDbContext>().UseInMemoryDatabase(Guid.NewGuid().ToString()).Options;
    }
}