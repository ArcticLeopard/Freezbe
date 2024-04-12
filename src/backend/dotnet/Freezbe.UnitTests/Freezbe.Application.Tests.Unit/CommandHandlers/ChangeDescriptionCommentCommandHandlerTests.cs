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

public class ChangeDescriptionCommentCommandHandlerTests
{
    private readonly TimeProvider _fakeTimeProvider;

    public ChangeDescriptionCommentCommandHandlerTests()
    {
        _fakeTimeProvider = TestUtils.FakeTimeProvider();
    }

    [Fact]
    public async Task HandleAsync_ValidCommand_SuccessfullyChangesDescription()
    {
        // ASSERT
        var commentId = Guid.NewGuid();
        var newDescription = "New description";
        var createdAt = _fakeTimeProvider.GetUtcNow();
        var comment = new Comment(commentId, "Old description", createdAt, CommentStatus.Active);

        var commentRepositoryMock = new Mock<ICommentRepository>();
        commentRepositoryMock.Setup(p => p.GetAsync(commentId)).ReturnsAsync(comment);

        var handler = new ChangeDescriptionCommentCommandHandler(commentRepositoryMock.Object);
        var command = new ChangeDescriptionCommentCommand(commentId, newDescription);

        // ACT
        await handler.Handle(command, CancellationToken.None);

        // ASSERT
        Assert.Equal(newDescription, comment.Description);
        commentRepositoryMock.Verify(p => p.UpdateAsync(comment), Times.Once);
    }

    [Fact]
    public async Task HandleAsync_CommandWithNotExistingsCommentId_ShouldThrowCommentNotFoundException()
    {
        // ASSERT
        var assignmentRepositoryMock = new Mock<ICommentRepository>();
        var existingsCommentId = new CommentId(Guid.NewGuid());
        var assignment = new Comment(Guid.NewGuid(),"Description", _fakeTimeProvider.GetUtcNow(), CommentStatus.Active);
        assignmentRepositoryMock.Setup(p => p.GetAsync(existingsCommentId)).ReturnsAsync(assignment);
        var handler = new ChangeDescriptionCommentCommandHandler(assignmentRepositoryMock.Object);
        var command = new ChangeDescriptionCommentCommand(Guid.NewGuid(), "Test description");

        //ACT
        var exception = await Record.ExceptionAsync(() => handler.Handle(command, CancellationToken.None));

        //ASSERT
        exception.ShouldNotBeNull();
        exception.ShouldBeOfType<CommentNotFoundException>();
    }
}