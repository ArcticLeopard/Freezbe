using Freezbe.Application.Exceptions;
using Freezbe.Application.Queries;
using Freezbe.Core.Entities;
using Freezbe.Core.Repositories;
using Freezbe.Infrastructure.DataAccessLayer.QueryHandlers;
using Moq;
using Shouldly;
using Xunit;

namespace Freezbe.Infrastructure.Tests.Unit.DataAccessLayer.QueryHandlers;

public class GetSpaceQueryHandlerTests
{
    private readonly TimeProvider _fakeTimeProvider;

    public GetSpaceQueryHandlerTests()
    {
        _fakeTimeProvider = TestUtils.FakeTimeProvider();
    }

    [Fact]
    public async Task Handle_ValidSpaceId_ReturnsSpaceDto()
    {
        // ARRANGE
        var spaceId = Guid.NewGuid();
        var createdAt = _fakeTimeProvider.GetUtcNow();
        var space = new Space(spaceId, "Description", createdAt);

        var mockSpaceRepository = new Mock<ISpaceRepository>();
        mockSpaceRepository.Setup(repo => repo.GetAsync(spaceId)).ReturnsAsync(space);

        var handler = new GetSpaceQueryHandler(mockSpaceRepository.Object);
        var query = new GetSpaceQuery(spaceId);

        // ACT
        var result = await handler.Handle(query, CancellationToken.None);

        // ASSERT
        Assert.NotNull(result);
        Assert.Equal(spaceId, result.Id);
        Assert.Equal(space.Description, result.Description);
    }

    [Fact]
    public async Task Handle_InvalidSpaceId_ThrowsSpaceNotFoundException()
    {
        // ARRANGE
        var spaceId = Guid.NewGuid();

        var mockSpaceRepository = new Mock<ISpaceRepository>();
        mockSpaceRepository.Setup(repo => repo.GetAsync(spaceId)).ReturnsAsync((Space)null);

        var handler = new GetSpaceQueryHandler(mockSpaceRepository.Object);
        var query = new GetSpaceQuery(spaceId);

        //ACT
        var exception = await Record.ExceptionAsync(() => handler.Handle(query, CancellationToken.None));

        //ASSERT
        exception.ShouldNotBeNull();
        exception.ShouldBeOfType<SpaceNotFoundException>();
    }
}