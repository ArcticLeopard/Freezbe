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

public class CommentHardDeleteCommandHandlerTests
{
    private readonly TimeProvider _fakeTimeProvider;

    public CommentHardDeleteCommandHandlerTests()
    {
        _fakeTimeProvider = TestUtils.FakeTimeProvider();
    }

    [Fact]
    public async Task HandleAsync_ValidCommand_SuccessfullyDeleteComment()
    {
        // ASSERT
        var assignmentId = Guid.NewGuid();
        var createdAt = _fakeTimeProvider.GetUtcNow();
        var assignment = new Comment(assignmentId, "Description", createdAt, CommentStatus.Active);
        var command = new CommentHardDeleteCommand(assignmentId);
        var assignmentRepositoryMock = new Mock<ICommentRepository>();
        assignmentRepositoryMock.Setup(repo => repo.GetAsync(assignmentId)).ReturnsAsync(assignment);
        assignmentRepositoryMock.Setup(repo => repo.DeleteAsync(assignment)).Returns(Task.CompletedTask);
        var handler = new CommentHardDeleteCommandHandler(assignmentRepositoryMock.Object);

        // ACT
        await handler.Handle(command, CancellationToken.None);

        // ASSERT
        assignmentRepositoryMock.Verify(repo => repo.GetAsync(assignmentId), Times.Once);
        assignmentRepositoryMock.Verify(repo => repo.DeleteAsync(assignment), Times.Once);
    }

    [Fact]
    public async Task HandleAsync_WhenCommentDoesNotExist_ThrowsCommentNotFoundException()
    {
        // ASSERT
        var assignmentId = Guid.NewGuid();
        Comment assignment = null;
        var command = new CommentHardDeleteCommand(assignmentId);
        var assignmentRepositoryMock = new Mock<ICommentRepository>();
        assignmentRepositoryMock.Setup(repo => repo.GetAsync(assignmentId)).ReturnsAsync(assignment);
        assignmentRepositoryMock.Setup(repo => repo.DeleteAsync(assignment)).Returns(Task.CompletedTask);
        var handler = new CommentHardDeleteCommandHandler(assignmentRepositoryMock.Object);

        // ACT
        var exception = await Record.ExceptionAsync(() => handler.Handle(command, CancellationToken.None));

        // ASSERT
        exception.ShouldNotBeNull();
        exception.ShouldBeOfType<CommentNotFoundException>();
        assignmentRepositoryMock.Verify(repo => repo.GetAsync(assignmentId), Times.Once);
        assignmentRepositoryMock.Verify(repo => repo.DeleteAsync(assignment), Times.Never);
    }
}