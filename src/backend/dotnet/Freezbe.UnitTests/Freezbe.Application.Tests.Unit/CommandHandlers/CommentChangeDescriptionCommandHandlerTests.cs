using Freezbe.Application.CommandHandlers;
using Freezbe.Application.Commands;
using Freezbe.Core.Entities;
using Freezbe.Core.Repositories;
using Freezbe.Core.ValueObjects;
using Moq;
using Xunit;

namespace Freezbe.Application.Tests.Unit.CommandHandlers;

public class CommentChangeDescriptionCommandHandlerTests
{
    private readonly TimeProvider _fakeTimeProvider;

    public CommentChangeDescriptionCommandHandlerTests()
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

        var handler = new CommentChangeDescriptionCommandHandler(commentRepositoryMock.Object);
        var command = new CommentChangeDescriptionCommand(commentId, newDescription);

        // ACT
        await handler.Handle(command, CancellationToken.None);

        // ASSERT
        Assert.Equal(newDescription, comment.Description);
        commentRepositoryMock.Verify(p => p.UpdateAsync(comment), Times.Once);
    }
}