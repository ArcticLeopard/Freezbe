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
    private readonly TimeProvider _fakeTimeProvider;

    public GetProjectsForSpaceQueryHandlerTests()
    {
        _fakeTimeProvider = TestUtils.FakeTimeProvider();
    }

    [Fact]
    public async Task Handle_ReturnsExpectedProjects()
    {
        // ARRANGE
        var mockRepository = new Mock<IProjectRepository>();
        var createdAt = _fakeTimeProvider.GetUtcNow();
        var projects = new List<Project>
        {
            new (Guid.NewGuid(), "Project 1", createdAt, ProjectStatus.Active),
            new (Guid.NewGuid(), "Project 2", createdAt, ProjectStatus.Active),
            new (Guid.NewGuid(), "Project 3", createdAt, ProjectStatus.Abandon)
        };
        mockRepository.Setup(p => p.GetAllBySpaceIdAsync(It.IsAny<SpaceId>())).ReturnsAsync(projects);

        var handler = new GetProjectsForSpaceQueryHandler(mockRepository.Object);
        var query = new GetProjectsForSpaceQuery(Guid.NewGuid());

        // ACT
        var result = (await handler.Handle(query, CancellationToken.None)).ToList();

        // ASSERT
        Assert.NotNull(result);
        Assert.Equal(projects.Count, result.Count);
        Assert.True(result.All(dto => projects.Any(project => project.Id.Value == dto.Id && project.Description == dto.Description)));
    }
}