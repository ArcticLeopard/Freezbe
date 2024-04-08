using Freezbe.Application.Queries;
using Freezbe.Core.Entities;
using Freezbe.Core.Repositories;
using Freezbe.Core.ValueObjects;
using Freezbe.Infrastructure.DataAccessLayer.QueryHandlers;
using Moq;
using Xunit;

namespace Freezbe.Infrastructure.Tests.Unit.DataAccessLayer.QueryHandlers;

public class GetCommentsForAssignmentQueryHandlerTests
{
    private readonly TimeProvider _fakeTimeProvider;

    public GetCommentsForAssignmentQueryHandlerTests()
    {
        _fakeTimeProvider = TestUtils.FakeTimeProvider();
    }

    [Fact]
    public async Task Handle_ReturnsExpectedComments()
    {
        // ARRANGE
        var mockRepository = new Mock<ICommentRepository>();
        var createdAt = _fakeTimeProvider.GetUtcNow();
        var comments = new List<Comment>
        {
            new(Guid.NewGuid(), "Comment 1", createdAt, CommentStatus.Active),
            new(Guid.NewGuid(), "Comment 2", createdAt, CommentStatus.Active),
            new(Guid.NewGuid(), "Comment 3", createdAt, CommentStatus.Abandon)
        };
        mockRepository.Setup(p => p.GetAllByAssignmentIdAsync(It.IsAny<AssignmentId>())).ReturnsAsync(comments);

        var handler = new GetCommentsForAssignmentQueryHandler(mockRepository.Object);
        var query = new GetCommentsForAssignmentQuery(Guid.NewGuid());

        // ACT
        var result = (await handler.Handle(query, CancellationToken.None)).ToList();

        // ASSERT
        Assert.NotNull(result);
        Assert.Equal(comments.Count, result.Count);
        Assert.True(result.All(dto => comments.Any(comment => comment.Id.Value == dto.Id && comment.Description == dto.Description)));
    }
}