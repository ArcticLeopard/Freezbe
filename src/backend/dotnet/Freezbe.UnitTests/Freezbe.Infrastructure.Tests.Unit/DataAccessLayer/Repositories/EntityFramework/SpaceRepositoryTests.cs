using Freezbe.Core.Entities;
using Freezbe.Core.ValueObjects;
using Freezbe.Infrastructure.DataAccessLayer.Repositories.EntityFramework;
using Shouldly;
using Xunit;

namespace Freezbe.Infrastructure.Tests.Unit.DataAccessLayer.Repositories.EntityFramework;

public class SpaceRepositoryTests
{
    private readonly TimeProvider _fakeTimeProvider;

    public SpaceRepositoryTests()
    {
        _fakeTimeProvider = TestUtils.FakeTimeProvider();
    }

    [Fact]
    public async Task GetAsync_ShouldReturnSpace_WhenSpaceExists()
    {
        // ARRANGE
        await using var dbContext = TestUtils.GetDbContext();
        var spaceId = new SpaceId(Guid.NewGuid());
        var expectedSpace = new Space(spaceId, "Test Space", _fakeTimeProvider.GetUtcNow());
        dbContext.Spaces.Add(expectedSpace);
        await dbContext.SaveChangesAsync();

        var repository = new SpaceRepository(dbContext);

        // ACT
        var result = await repository.GetAsync(spaceId);

        // ASSERT
        result.ShouldNotBeNull();
        result.Id.ShouldBe(expectedSpace.Id);
        result.Description.ShouldBe(expectedSpace.Description);
    }

    [Theory]
    [InlineData(0, 0)]
    [InlineData(10, 10)]
    public async Task GetAllAsync_ShouldReturnAllSpaces(int numberOfSpaces, int expectedNumberOfSpaces)
    {
        // ARRANGE
        await using var dbContext = TestUtils.GetDbContext();
        var expectedSpaces = CreateSpaces(numberOfSpaces);
        dbContext.Spaces.AddRange(expectedSpaces);
        await dbContext.SaveChangesAsync();

        var repository = new SpaceRepository(dbContext);

        // ACT
        var result = (await repository.GetAllAsync()).ToList();

        // ASSERT
        result.ShouldNotBeNull();
        result.Count.ShouldBe(expectedNumberOfSpaces);
        foreach(var expectedSpace in expectedSpaces) result.ShouldContain(a => a.Id == expectedSpace.Id);
    }

    [Fact]
    public async Task AddAsync_ShouldAddSpace()
    {
        // ARRANGE
        await using var dbContext = TestUtils.GetDbContext();
        var repository = new SpaceRepository(dbContext);
        var spaceId = new SpaceId(Guid.NewGuid());
        var spaceToAdd = new Space(spaceId, new Description("Test Description 1"), _fakeTimeProvider.GetUtcNow());

        // ACT
        await repository.AddAsync(spaceToAdd);

        // ASSERT
        var result = await dbContext.Spaces.FindAsync(spaceId);
        result.ShouldNotBeNull();
        result.Id.ShouldBe(spaceId);
    }

    [Fact]
    public async Task UpdateAsync_ShouldUpdateSpace()
    {
        // ARRANGE
        await using var dbContext = TestUtils.GetDbContext();
        var spaceId = new SpaceId(Guid.NewGuid());
        var initialDescription = new Description("Initial Description");
        var updatedDescription = new Description("Updated Description");
        var space = new Space(spaceId, initialDescription, _fakeTimeProvider.GetUtcNow());
        dbContext.Spaces.Add(space);
        await dbContext.SaveChangesAsync();

        var repository = new SpaceRepository(dbContext);

        // ACT
        space.ChangeDescription(updatedDescription);
        await repository.UpdateAsync(space);

        // ASSERT
        var result = await dbContext.Spaces.FindAsync(spaceId);
        result.ShouldNotBeNull();
        result.Description.ShouldBe(updatedDescription);
    }

    [Fact]
    public async Task DeleteAsync_ShouldDeleteSpace()
    {
        // ARRANGE
        await using var dbContext = TestUtils.GetDbContext();
        var spaceId = new SpaceId(Guid.NewGuid());
        var space = new Space(spaceId, new Description("Test Description"), _fakeTimeProvider.GetUtcNow());
        dbContext.Spaces.Add(space);
        await dbContext.SaveChangesAsync();

        var repository = new SpaceRepository(dbContext);

        // ACT
        await repository.DeleteAsync(space);

        // ASSERT
        var result = await dbContext.Spaces.FindAsync(spaceId);
        result.ShouldBeNull();
    }

    private List<Space> CreateSpaces(int numberOfSpaces)
    {
        var result = new List<Space>();
        for(int i = 0; i < numberOfSpaces; i++)
        {
            result.Add(new Space(Guid.NewGuid(), $"Test Space {i}", _fakeTimeProvider.GetUtcNow()));
        }
        return result;
    }
}