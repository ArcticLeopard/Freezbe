using Freezbe.Core.Entities;
using Freezbe.Core.ValueObjects;
using Freezbe.Infrastructure.DataAccessLayer.Repositories.InMemory;
using Shouldly;
using Xunit;

namespace Freezbe.Infrastructure.Tests.Unit.DataAccessLayer.Repositories.InMemory;

public class SpaceRepositoryTests
{
    [Fact]
    public async Task GetAsyncReturnsCorrectSpace()
    {
        // ARRANGE
        var repository = new SpaceRepository();
        var spaceId = new SpaceId(Guid.NewGuid());
        var space = new Space(spaceId, "Test Space");
        await repository.AddAsync(space);

        // ACT
        var result = await repository.GetAsync(spaceId);

        // ASSERT
        Assert.Equal(space, result);
    }

    [Fact]
    public async Task GetAllAsyncReturnsAllSpaces()
    {
        // ARRANGE
        var repository = new SpaceRepository();
        var spaces = new List<Space>
        {
            new(new SpaceId(Guid.NewGuid()), "Space 1"),
            new(new SpaceId(Guid.NewGuid()), "Space 2"),
            new(new SpaceId(Guid.NewGuid()), "Space 3")
        };
        foreach(var space in spaces) await repository.AddAsync(space);

        // ACT
        var result = await repository.GetAllAsync();

        // ASSERT
        Assert.Equal(spaces, result);
    }

    [Fact]
    public async Task AddAsyncAddsSpaceToRepository()
    {
        // ARRANGE
        var repository = new SpaceRepository();
        var spaceId = new SpaceId(Guid.NewGuid());
        var space = new Space(spaceId, "Test Space");

        // ACT
        await repository.AddAsync(space);
        var result = await repository.GetAsync(spaceId);

        // ASSERT
        Assert.Equal(space, result);
    }

    [Fact]
    public async Task DeleteAsyncRemovesSpaceFromRepository()
    {
        // ARRANGE
        var repository = new SpaceRepository();
        var spaceId = new SpaceId(Guid.NewGuid());
        var space = new Space(spaceId, "Test Space");
        await repository.AddAsync(space);

        // ACT
        await repository.DeleteAsync(space);
        var result = await repository.GetAsync(spaceId);

        // ASSERT
        Assert.Null(result);
    }

    [Fact]
    public async Task UpdateAsyncThrowsNotImplementedException()
    {
        // ARRANGE
        var repository = new SpaceRepository();
        var spaceId = new SpaceId(Guid.NewGuid());
        var space = new Space(spaceId, "Test Space");

        // ACT & ASSERT
        await Assert.ThrowsAsync<NotImplementedException>(() => repository.UpdateAsync(space));
    }

    [Fact]
    public async Task AfterAddingAnItemToTheCollectionTheItemShouldExistInTheRepositoryAndHaveCorrectValueAfterUseGet()
    {
        // ARRANGE
        var memorySpaceRepository = new SpaceRepository();
        var spaceId = new SpaceId(Guid.NewGuid());
        var createdSpace = new Space(spaceId, "Test Space");
        await memorySpaceRepository.AddAsync(createdSpace);

        // ACT

        var space = await memorySpaceRepository.GetAsync(createdSpace.Id);

        // ASSERT
        space.ShouldNotBeNull();
        space.Id.ShouldBe(createdSpace.Id);
        space.Description.ShouldBe(createdSpace.Description);
    }

    [Fact]
    public async Task AfterAddingAnItemToTheCollectionTheItemShouldExistInTheRepositoryAndHaveCorrectValueAfterUseGetAll()
    {
        // ARRANGE
        var memorySpaceRepository = new SpaceRepository();
        var spaceId = new SpaceId(Guid.NewGuid());
        var createdSpace = new Space(spaceId, "Test Space");
        await memorySpaceRepository.AddAsync(createdSpace);

        // ACT

        var collection = (await memorySpaceRepository.GetAllAsync()).ToList();

        // ASSERT
        collection.ShouldNotBeEmpty();
        collection.ShouldNotBeNull();
        collection.ShouldContain(p => p.Description == "Test Space");
        collection.ShouldHaveSingleItem();
        collection.First().Id.ShouldBe(createdSpace.Id);
    }
}