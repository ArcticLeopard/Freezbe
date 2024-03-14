using Freezbe.Core.Entities;
using Freezbe.Core.ValueObjects;
using Freezbe.Infrastructure.DataAccessLayer.Repositories;
using Shouldly;
using Xunit;

namespace Freezbe.Infrastructure.Tests.Unit.DataAccessLayer.Repositories;

public class InMemoryProjectRepositoryTests
{
    [Fact]
    public async Task GetAsyncReturnsCorrectProject()
    {
        // ARRANGE
        var repository = new InMemoryProjectRepository();
        var projectId = new ProjectId(Guid.NewGuid());
        var project = new Project(projectId, "Test Project");
        await repository.AddAsync(project);

        // ACT
        var result = await repository.GetAsync(projectId);

        // ASSERT
        Assert.Equal(project, result);
    }

    [Fact]
    public async Task GetAllAsyncReturnsAllProjects()
    {
        // ARRANGE
        var repository = new InMemoryProjectRepository();
        var projects = new List<Project>
        {
            new(new ProjectId(Guid.NewGuid()), "Project 1"),
            new(new ProjectId(Guid.NewGuid()), "Project 2"),
            new(new ProjectId(Guid.NewGuid()), "Project 3")
        };
        foreach(var project in projects) await repository.AddAsync(project);

        // ACT
        var result = await repository.GetAllAsync();

        // ASSERT
        Assert.Equal(projects, result);
    }

    [Fact]
    public async Task AddAsyncAddsProjectToRepository()
    {
        // ARRANGE
        var repository = new InMemoryProjectRepository();
        var projectId = new ProjectId(Guid.NewGuid());
        var project = new Project(projectId, "Test Project");

        // ACT
        await repository.AddAsync(project);
        var result = await repository.GetAsync(projectId);

        // ASSERT
        Assert.Equal(project, result);
    }

    [Fact]
    public async Task DeleteAsyncRemovesProjectFromRepository()
    {
        // ARRANGE
        var repository = new InMemoryProjectRepository();
        var projectId = new ProjectId(Guid.NewGuid());
        var project = new Project(projectId, "Test Project");
        await repository.AddAsync(project);

        // ACT
        await repository.DeleteAsync(project);
        var result = await repository.GetAsync(projectId);

        // ASSERT
        Assert.Null(result);
    }

    [Fact]
    public async Task UpdateAsyncThrowsNotImplementedException()
    {
        // ARRANGE
        var repository = new InMemoryProjectRepository();
        var projectId = new ProjectId(Guid.NewGuid());
        var project = new Project(projectId, "Test Project");

        // ACT & ASSERT
        await Assert.ThrowsAsync<NotImplementedException>(() => repository.UpdateAsync(project));
    }

    [Fact]
    public async Task AfterAddingAnItemToTheCollectionTheItemShouldExistInTheRepositoryAndHaveCorrectValueAfterUseGet()
    {
        // ARRANGE
        var memoryProjectRepository = new InMemoryProjectRepository();
        var projectId = new ProjectId(Guid.NewGuid());
        var createdProject = new Project(projectId, "Test Project");
        await memoryProjectRepository.AddAsync(createdProject);

        // ACT

        var project = await memoryProjectRepository.GetAsync(createdProject.Id);

        // ASSERT
        project.ShouldNotBeNull();
        project.Id.ShouldBe(createdProject.Id);
        project.Description.ShouldBe(createdProject.Description);
    }

    [Fact]
    public async Task AfterAddingAnItemToTheCollectionTheItemShouldExistInTheRepositoryAndHaveCorrectValueAfterUseGetAll()
    {
        // ARRANGE
        var memoryProjectRepository = new InMemoryProjectRepository();
        var projectId = new ProjectId(Guid.NewGuid());
        var createdProject = new Project(projectId, "Test Project");
        await memoryProjectRepository.AddAsync(createdProject);

        // ACT

        var collection = (await memoryProjectRepository.GetAllAsync()).ToList();

        // ASSERT
        collection.ShouldNotBeEmpty();
        collection.ShouldNotBeNull();
        collection.ShouldContain(p => p.Description == "Test Project");
        collection.ShouldHaveSingleItem();
        collection.First().Id.ShouldBe(createdProject.Id);
    }
}