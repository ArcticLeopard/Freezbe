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

public class ChangeStatusCommentCommandHandlerTests
{
    private readonly TimeProvider _fakeTimeProvider;

    public ChangeStatusCommentCommandHandlerTests()
    {
        _fakeTimeProvider = TestUtils.FakeTimeProvider();
    }

    [Fact]
    public async Task HandleAsync_ValidCommand_SuccessfullyChangesDescription()
    {
        // ASSERT
        var commentId = Guid.NewGuid();
        var comment = new Comment(commentId, "Old description", _fakeTimeProvider.GetUtcNow(), CommentStatus.Active);

        var commentRepositoryMock = new Mock<ICommentRepository>();
        commentRepositoryMock.Setup(p => p.GetAsync(commentId)).ReturnsAsync(comment);

        var handler = new ChangeStatusCommentCommandHandler(commentRepositoryMock.Object);
        var command = new ChangeStatusCommentCommand(commentId, CommentStatus.Abandon);

        // ACT
        await handler.Handle(command, CancellationToken.None);

        // ASSERT
        Assert.Equal(CommentStatus.Abandon, comment.CommentStatus);
        commentRepositoryMock.Verify(p => p.UpdateAsync(comment), Times.Once);
    }

    [Fact]
    public async Task HandleAsync_CommandWithNotExistingsCommentId_ShouldThrowCommentNotFoundException()
    {
        // ASSERT
        var commentRepositoryMock = new Mock<ICommentRepository>();
        var existingsCommentId = new CommentId(Guid.NewGuid());
        var comment = new Comment(Guid.NewGuid(),"Description", _fakeTimeProvider.GetUtcNow(), CommentStatus.Active);
        commentRepositoryMock.Setup(p => p.GetAsync(existingsCommentId)).ReturnsAsync(comment);
        var handler = new ChangeStatusCommentCommandHandler(commentRepositoryMock.Object);
        var command = new ChangeStatusCommentCommand(Guid.NewGuid(), "Test description");

        //ACT
        var exception = await Record.ExceptionAsync(() => handler.Handle(command, CancellationToken.None));

        //ASSERT
        exception.ShouldNotBeNull();
        exception.ShouldBeOfType<CommentNotFoundException>();
    }
}