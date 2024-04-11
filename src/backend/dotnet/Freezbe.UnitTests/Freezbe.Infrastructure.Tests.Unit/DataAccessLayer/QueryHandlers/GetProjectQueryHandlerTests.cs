using Freezbe.Application.Exceptions;
using Freezbe.Application.Queries;
using Freezbe.Core.Entities;
using Freezbe.Core.Repositories;
using Freezbe.Core.ValueObjects;
using Freezbe.Infrastructure.DataAccessLayer.QueryHandlers;
using Moq;
using Shouldly;
using Xunit;

namespace Freezbe.Infrastructure.Tests.Unit.DataAccessLayer.QueryHandlers;

public class GetProjectQueryHandlerTests
{
    private readonly TimeProvider _fakeTimeProvider;

    public GetProjectQueryHandlerTests()
    {
        _fakeTimeProvider = TestUtils.FakeTimeProvider();
    }

    [Fact]
    public async Task Handle_ValidProjectId_ReturnsProjectDto()
    {
        // ARRANGE
        var projectId = Guid.NewGuid();
        var createdAt = _fakeTimeProvider.GetUtcNow();
        var project = new Project(projectId, "Description", createdAt, ProjectStatus.Active);

        var mockProjectRepository = new Mock<IProjectRepository>();
        mockProjectRepository.Setup(repo => repo.GetAsync(projectId)).ReturnsAsync(project);

        var handler = new GetProjectQueryHandler(mockProjectRepository.Object);
        var query = new GetProjectQuery(projectId);

        // ACT
        var result = await handler.Handle(query, CancellationToken.None);

        // ASSERT
        Assert.NotNull(result);
        Assert.Equal(projectId, result.Id);
        Assert.Equal(project.Description, result.Description);
    }

    [Fact]
    public async Task Handle_InvalidProjectId_ThrowsProjectNotFoundException()
    {
        // ARRANGE
        var projectId = Guid.NewGuid();

        var mockProjectRepository = new Mock<IProjectRepository>();
        mockProjectRepository.Setup(repo => repo.GetAsync(projectId)).ReturnsAsync((Project)null);

        var handler = new GetProjectQueryHandler(mockProjectRepository.Object);
        var query = new GetProjectQuery(projectId);

        //ACT
        var exception = await Record.ExceptionAsync(() => handler.Handle(query, CancellationToken.None));

        //ASSERT
        exception.ShouldNotBeNull();
        exception.ShouldBeOfType<ProjectNotFoundException>();
    }
}