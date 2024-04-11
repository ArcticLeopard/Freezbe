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

public class GetCommentQueryHandlerTests
{
    private readonly TimeProvider _fakeTimeProvider;

    public GetCommentQueryHandlerTests()
    {
        _fakeTimeProvider = TestUtils.FakeTimeProvider();
    }

    [Fact]
    public async Task Handle_ValidCommentId_ReturnsCommentDto()
    {
        // ARRANGE
        var commentId = Guid.NewGuid();
        var createdAt = _fakeTimeProvider.GetUtcNow();
        var comment = new Comment(commentId, "Description", createdAt, CommentStatus.Active);

        var mockCommentRepository = new Mock<ICommentRepository>();
        mockCommentRepository.Setup(repo => repo.GetAsync(commentId)).ReturnsAsync(comment);

        var handler = new GetCommentQueryHandler(mockCommentRepository.Object);
        var query = new GetCommentQuery(commentId);

        // ACT
        var result = await handler.Handle(query, CancellationToken.None);

        // ASSERT
        Assert.NotNull(result);
        Assert.Equal(commentId, result.Id);
        Assert.Equal(comment.Description, result.Description);
    }

    [Fact]
    public async Task Handle_InvalidCommentId_ThrowsCommentNotFoundException()
    {
        // ARRANGE
        var commentId = Guid.NewGuid();

        var mockCommentRepository = new Mock<ICommentRepository>();
        mockCommentRepository.Setup(repo => repo.GetAsync(commentId)).ReturnsAsync((Comment)null);

        var handler = new GetCommentQueryHandler(mockCommentRepository.Object);
        var query = new GetCommentQuery(commentId);

        //ACT
        var exception = await Record.ExceptionAsync(() => handler.Handle(query, CancellationToken.None));

        //ASSERT
        exception.ShouldNotBeNull();
        exception.ShouldBeOfType<CommentNotFoundException>();
    }
}