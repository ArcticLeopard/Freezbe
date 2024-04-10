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

public class ProjectHardDeleteCommandHandlerTests
{
    private readonly TimeProvider _fakeTimeProvider;

    public ProjectHardDeleteCommandHandlerTests()
    {
        _fakeTimeProvider = TestUtils.FakeTimeProvider();
    }

    [Fact]
    public async Task HandleAsync_ValidCommand_SuccessfullyDeleteProject()
    {
        // ASSERT
        var assignmentId = Guid.NewGuid();
        var createdAt = _fakeTimeProvider.GetUtcNow();
        var assignment = new Project(assignmentId, "Description", createdAt, ProjectStatus.Active);
        var command = new ProjectHardDeleteCommand(assignmentId);
        var assignmentRepositoryMock = new Mock<IProjectRepository>();
        assignmentRepositoryMock.Setup(repo => repo.GetAsync(assignmentId)).ReturnsAsync(assignment);
        assignmentRepositoryMock.Setup(repo => repo.DeleteAsync(assignment)).Returns(Task.CompletedTask);
        var handler = new ProjectHardDeleteCommandHandler(assignmentRepositoryMock.Object);

        // ACT
        await handler.Handle(command, CancellationToken.None);

        // ASSERT
        assignmentRepositoryMock.Verify(repo => repo.GetAsync(assignmentId), Times.Once);
        assignmentRepositoryMock.Verify(repo => repo.DeleteAsync(assignment), Times.Once);
    }

    [Fact]
    public async Task HandleAsync_WhenProjectDoesNotExist_ThrowsProjectNotFoundException()
    {
        // ASSERT
        var assignmentId = Guid.NewGuid();
        Project assignment = null;
        var command = new ProjectHardDeleteCommand(assignmentId);
        var assignmentRepositoryMock = new Mock<IProjectRepository>();
        assignmentRepositoryMock.Setup(repo => repo.GetAsync(assignmentId)).ReturnsAsync(assignment);
        assignmentRepositoryMock.Setup(repo => repo.DeleteAsync(assignment)).Returns(Task.CompletedTask);
        var handler = new ProjectHardDeleteCommandHandler(assignmentRepositoryMock.Object);

        // ACT
        var exception = await Record.ExceptionAsync(() => handler.Handle(command, CancellationToken.None));

        // ASSERT
        exception.ShouldNotBeNull();
        exception.ShouldBeOfType<ProjectNotFoundException>();
        assignmentRepositoryMock.Verify(repo => repo.GetAsync(assignmentId), Times.Once);
        assignmentRepositoryMock.Verify(repo => repo.DeleteAsync(assignment), Times.Never);
    }
}