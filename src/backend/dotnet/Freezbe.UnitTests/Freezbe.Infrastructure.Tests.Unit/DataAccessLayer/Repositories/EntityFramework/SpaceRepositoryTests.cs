using Freezbe.Core.Entities;
using Freezbe.Core.ValueObjects;
using Freezbe.Infrastructure.DataAccessLayer;
using Freezbe.Infrastructure.DataAccessLayer.Repositories.EntityFramework;
using Microsoft.EntityFrameworkCore;
using Shouldly;
using Xunit;

namespace Freezbe.Infrastructure.Tests.Unit.DataAccessLayer.Repositories.EntityFramework;

public class SpaceRepositoryTests
{
    [Fact]
    public async Task GetAsync_ShouldReturnSpace_WhenSpaceExists()
    {
        // ARRANGE
        var options = GetDbContextOptionsBuilder();

        await using var dbContext = new FreezbeDbContext(options);
        var spaceId = new SpaceId(Guid.NewGuid());
        var expectedSpace = new Space(spaceId, "Test Space");
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

    [Fact]
    public async Task GetAllAsync_ShouldReturnAllSpaces()
    {
        // ARRANGE
        var options = new DbContextOptionsBuilder<FreezbeDbContext>().UseInMemoryDatabase(Guid.NewGuid().ToString()).Options;

        await using var dbContext = new FreezbeDbContext(options);
        var expectedSpaces = new List<Space>
        {
            new(new SpaceId(Guid.NewGuid()), "Test Space 1"),
            new(new SpaceId(Guid.NewGuid()), "Test Space 2"),
            new(new SpaceId(Guid.NewGuid()), "Test Space 3")
        };
        dbContext.Spaces.AddRange(expectedSpaces);
        await dbContext.SaveChangesAsync();

        var repository = new SpaceRepository(dbContext);

        // ACT
        var result = await repository.GetAllAsync();

        // ASSERT
        result.ShouldNotBeNull();
        result.Count().ShouldBe(expectedSpaces.Count);
        foreach(var expectedSpace in expectedSpaces) result.ShouldContain(a => a.Id == expectedSpace.Id);
    }

    [Fact]
    public async Task AddAsync_ShouldAddSpace()
    {
        // ARRANGE
        var options = new DbContextOptionsBuilder<FreezbeDbContext>().UseInMemoryDatabase(Guid.NewGuid().ToString()).Options;

        await using var dbContext = new FreezbeDbContext(options);
        var repository = new SpaceRepository(dbContext);
        var spaceId = new SpaceId(Guid.NewGuid());
        var spaceToAdd = new Space(spaceId, new Description("Test Description 1"));

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
        var options = new DbContextOptionsBuilder<FreezbeDbContext>().UseInMemoryDatabase(Guid.NewGuid().ToString()).Options;

        await using var dbContext = new FreezbeDbContext(options);
        var spaceId = new SpaceId(Guid.NewGuid());
        var initialDescription = new Description("Initial Description");
        var updatedDescription = new Description("Updated Description");
        var space = new Space(spaceId, initialDescription);
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
        var options = new DbContextOptionsBuilder<FreezbeDbContext>().UseInMemoryDatabase(Guid.NewGuid().ToString()).Options;

        await using var dbContext = new FreezbeDbContext(options);
        var spaceId = new SpaceId(Guid.NewGuid());
        var space = new Space(spaceId, new Description("Test Description"));
        dbContext.Spaces.Add(space);
        await dbContext.SaveChangesAsync();

        var repository = new SpaceRepository(dbContext);

        // ACT
        await repository.DeleteAsync(space);

        // ASSERT
        var result = await dbContext.Spaces.FindAsync(spaceId);
        result.ShouldBeNull();
    }

    private static DbContextOptions<FreezbeDbContext> GetDbContextOptionsBuilder()
    {
        return new DbContextOptionsBuilder<FreezbeDbContext>().UseInMemoryDatabase(Guid.NewGuid().ToString()).Options;
    }
}