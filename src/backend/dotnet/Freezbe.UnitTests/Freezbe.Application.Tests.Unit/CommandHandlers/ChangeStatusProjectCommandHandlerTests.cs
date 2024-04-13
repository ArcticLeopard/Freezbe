using Freezbe.Application.CommandHandlers;
using Freezbe.Application.Commands;
using Freezbe.Application.Exceptions;
using Freezbe.Core.Entities;
using Freezbe.Core.Repositories;
using Freezbe.Core.ValueObjects;
using Moq;
using Shouldly;
using Xunit;

namespace Freezbe.Application.Tests.Unit.CommandHandlers;

public class ChangeStatusProjectCommandHandlerTests
{
    private readonly TimeProvider _fakeTimeProvider;

    public ChangeStatusProjectCommandHandlerTests()
    {
        _fakeTimeProvider = TestUtils.FakeTimeProvider();
    }

    [Fact]
    public async Task HandleAsync_ValidCommand_SuccessfullyChangesDescription()
    {
        // ASSERT
        var projectId = Guid.NewGuid();
        var project = new Project(projectId, "Old description", _fakeTimeProvider.GetUtcNow(), ProjectStatus.Active);

        var projectRepositoryMock = new Mock<IProjectRepository>();
        projectRepositoryMock.Setup(p => p.GetAsync(projectId)).ReturnsAsync(project);

        var handler = new ChangeStatusProjectCommandHandler(projectRepositoryMock.Object);
        var command = new ChangeStatusProjectCommand(projectId, ProjectStatus.Abandon);

        // ACT
        await handler.Handle(command, CancellationToken.None);

        // ASSERT
        Assert.Equal(ProjectStatus.Abandon, project.ProjectStatus);
        projectRepositoryMock.Verify(p => p.UpdateAsync(project), Times.Once);
    }

    [Fact]
    public async Task HandleAsync_CommandWithNotExistingsProjectId_ShouldThrowProjectNotFoundException()
    {
        // ASSERT
        var projectRepositoryMock = new Mock<IProjectRepository>();
        var existingsProjectId = new ProjectId(Guid.NewGuid());
        var project = new Project(Guid.NewGuid(),"Description", _fakeTimeProvider.GetUtcNow(), ProjectStatus.Active);
        projectRepositoryMock.Setup(p => p.GetAsync(existingsProjectId)).ReturnsAsync(project);
        var handler = new ChangeStatusProjectCommandHandler(projectRepositoryMock.Object);
        var command = new ChangeStatusProjectCommand(Guid.NewGuid(), "Test description");

        //ACT
        var exception = await Record.ExceptionAsync(() => handler.Handle(command, CancellationToken.None));

        //ASSERT
        exception.ShouldNotBeNull();
        exception.ShouldBeOfType<ProjectNotFoundException>();
    }
}