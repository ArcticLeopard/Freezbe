using Freezbe.Application.Queries;
using Freezbe.Core.Entities;
using Freezbe.Core.Repositories;
using Freezbe.Infrastructure.DataAccessLayer.QueryHandlers;
using Moq;
using Xunit;

namespace Freezbe.Infrastructure.Tests.Unit.DataAccessLayer.QueryHandlers;

public class GetSpacesQueryHandlerTests
{
    [Fact]
    public async Task Handle_ReturnsExpectedSpaces()
    {
        // ARRANGE
        var mockRepository = new Mock<ISpaceRepository>();
        var spaces = new List<Space>
        {
            new (Guid.NewGuid(), "Space 1"),
            new (Guid.NewGuid(), "Space 2"),
            new (Guid.NewGuid(), "Space 3")
        };
        mockRepository.Setup(p => p.GetAllAsync()).ReturnsAsync(spaces);

        var handler = new GetSpacesQueryHandler(mockRepository.Object);
        var query = new GetSpacesQuery();

        // ACT
        var result = (await handler.Handle(query, CancellationToken.None)).ToList();

        // ASSERT
        Assert.NotNull(result);
        Assert.Equal(spaces.Count, result.Count);
        Assert.True(result.All(dto => spaces.Any(space => space.Id.Value == dto.Id && space.Description == dto.Description)));
    }
}