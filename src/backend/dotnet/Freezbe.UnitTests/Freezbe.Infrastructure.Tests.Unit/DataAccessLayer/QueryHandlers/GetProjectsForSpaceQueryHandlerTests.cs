using Freezbe.Application.Queries;
using Freezbe.Core.Entities;
using Freezbe.Core.Repositories;
using Freezbe.Core.ValueObjects;
using Freezbe.Infrastructure.DataAccessLayer.QueryHandlers;
using Moq;
using Xunit;

namespace Freezbe.Infrastructure.Tests.Unit.DataAccessLayer.QueryHandlers;

public class GetProjectsForSpaceQueryHandlerTests
{
    [Fact]
    public async Task Handle_ReturnsExpectedProjects()
    {
        // ARRANGE
        var mockRepository = new Mock<IProjectRepository>();
        var projects = new List<Project>
        {
            new (Guid.NewGuid(), "Project 1"),
            new (Guid.NewGuid(), "Project 2"),
            new (Guid.NewGuid(), "Project 3")
        };
        mockRepository.Setup(p => p.GetAllBySpaceIdAsync(It.IsAny<SpaceId>())).ReturnsAsync(projects);

        var handler = new GetProjectsForSpaceQueryHandler(mockRepository.Object);
        var query = new GetProjectsForSpaceQuery(Guid.NewGuid());

        // ACT
        var result = await handler.Handle(query, CancellationToken.None);

        // ASSERT
        Assert.NotNull(result);
        Assert.Equal(projects.Count, result.Count());
        Assert.True(result.All(dto => projects.Any(project => project.Id.Value == dto.Id && project.Description == dto.Description)));
    }
}