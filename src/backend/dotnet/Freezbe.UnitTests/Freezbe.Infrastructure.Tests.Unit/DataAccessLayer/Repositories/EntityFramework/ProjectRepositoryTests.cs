using Freezbe.Core.Entities;
using Freezbe.Core.ValueObjects;
using Freezbe.Infrastructure.DataAccessLayer.Repositories.EntityFramework;
using Shouldly;
using Xunit;

namespace Freezbe.Infrastructure.Tests.Unit.DataAccessLayer.Repositories.EntityFramework;

public class ProjectRepositoryTests
{
    private readonly TimeProvider _fakeTimeProvider;

    public ProjectRepositoryTests()
    {
        _fakeTimeProvider = TestUtils.FakeTimeProvider();
    }

    [Fact]
    public async Task GetAsync_ShouldReturnProject_WhenProjectExists()
    {
        // ARRANGE
        await using var dbContext = TestUtils.GetDbContext();
        var projectId = new ProjectId(Guid.NewGuid());
        var expectedProject = new Project(projectId, "Test Project", _fakeTimeProvider.GetUtcNow());
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

    [Theory]
    [InlineData(0, 0)]
    [InlineData(10, 10)]
    public async Task GetAllAsync_ShouldReturnAllProjects(int numberOfProjects, int expectedNumberOfProjects)
    {
        // ARRANGE
        await using var dbContext = TestUtils.GetDbContext();
        var expectedProjects = CreateProjects(numberOfProjects);
        dbContext.Projects.AddRange(expectedProjects);
        await dbContext.SaveChangesAsync();

        var repository = new ProjectRepository(dbContext);

        // ACT
        var result = (await repository.GetAllAsync()).ToList();

        // ASSERT
        result.ShouldNotBeNull();
        result.Count.ShouldBe(expectedNumberOfProjects);
        foreach(var expectedProject in expectedProjects)
            result.ShouldContain(a => a.Id == expectedProject.Id);
    }

    [Theory]
    [InlineData(0, 0)]
    [InlineData(10, 10)]
    public async Task GetAllBySpaceIdAsync_ShouldReturnAllProjectsByySpaceId(int numberOfProjects, int expectedNumberOfProjects)
    {
        // ARRANGE
        var spaceId = Guid.NewGuid();
        await using var dbContext = TestUtils.GetDbContext();
        var space = new Space(spaceId, "description");
        var expectedProjects = CreateProjects(numberOfProjects);
        expectedProjects.ForEach(p=>space.AddProject(p));
        dbContext.Spaces.Add(space);
        await dbContext.SaveChangesAsync();

        var repository = new ProjectRepository(dbContext);

        // ACT
        var result = (await repository.GetAllBySpaceIdAsync(spaceId)).ToList();

        // ASSERT
        result.ShouldNotBeNull();
        result.Count.ShouldBe(expectedNumberOfProjects);
        foreach(var expectedProject in expectedProjects)
            result.ShouldContain(a => a.Id == expectedProject.Id);
    }

    [Fact]
    public async Task AddAsync_ShouldAddProject()
    {
        // ARRANGE
        await using var dbContext = TestUtils.GetDbContext();
        var repository = new ProjectRepository(dbContext);
        var projectId = new ProjectId(Guid.NewGuid());
        var projectToAdd = new Project(projectId, new Description("Test Description 1"), _fakeTimeProvider.GetUtcNow());

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
        await using var dbContext = TestUtils.GetDbContext();
        var projectId = new ProjectId(Guid.NewGuid());
        var initialDescription = new Description("Initial Description");
        var updatedDescription = new Description("Updated Description");
        var project = new Project(projectId, initialDescription, _fakeTimeProvider.GetUtcNow());
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
        await using var dbContext = TestUtils.GetDbContext();
        var projectId = new ProjectId(Guid.NewGuid());
        var project = new Project(projectId, new Description("Test Description"), _fakeTimeProvider.GetUtcNow());
        dbContext.Projects.Add(project);
        await dbContext.SaveChangesAsync();

        var repository = new ProjectRepository(dbContext);

        // ACT
        await repository.DeleteAsync(project);

        // ASSERT
        var result = await dbContext.Projects.FindAsync(projectId);
        result.ShouldBeNull();
    }

    private List<Project> CreateProjects(int numberOfProjects)
    {
        var result = new List<Project>();
        for(int i = 0; i < numberOfProjects; i++)
        {
            result.Add(new Project(Guid.NewGuid(), $"Test Project {i}", _fakeTimeProvider.GetUtcNow()));
        }
        return result;
    }
}