using Freezbe.Core.Entities;
using Freezbe.Core.Exceptions;
using Freezbe.Core.ValueObjects;
using Shouldly;
using Xunit;

namespace Freezbe.Core.Tests.Unit.Entities;

public class CommentTests
{
    private readonly TimeProvider _fakeTimeProvider;

    public CommentTests()
    {
        _fakeTimeProvider = TestUtils.FakeTimeProvider();
    }

    [Fact]
    public void Constructor_WithValidAttribues_ShouldPropertiesInitializedCorrectly()
    {
        // ARRANGE
        var commentId = TestUtils.CreateCorrectCommentId();
        var description = new Description("Initial description");
        var createdAt = _fakeTimeProvider.GetUtcNow();
        var commentStatus = (CommentStatus)CommentStatus.Active;

        // ACT
        var comment = new Comment(commentId, description, createdAt, commentStatus);

        // ASSERT
        comment.Id.ShouldBe(commentId);
        comment.Description.ShouldBe(description);
        comment.CommentStatus.ShouldBe(commentStatus);
        comment.CommentStatus.Value.ShouldBe((string)commentStatus);
        comment.CreatedAt.ShouldBe(createdAt);
    }

    [Fact]
    public void ChangeDescription_WhenCalledWithNewDescription_DescriptionPropertyShouldBeUpdated()
    {
        // ARRANGE
        var commentId = TestUtils.CreateCorrectCommentId();
        var initialDescription = new Description("Initial description");
        var newDescription = new Description("New description");
        var createdAt = _fakeTimeProvider.GetUtcNow();
        var commentStatus = CommentStatus.Active;
        var comment = new Comment(commentId, initialDescription, createdAt, commentStatus);

        // ACT
        comment.ChangeDescription(newDescription);

        // ASSERT
        comment.Description.ShouldBe(newDescription);
    }

    [Fact]
    public void ChangeDescription_WithNullDescription_ThrowsInvalidDescriptionException()
    {
        // ARRANGE
        var commentId = TestUtils.CreateCorrectCommentId();
        var initialDescription = new Description("Initial description");
        var createdAt = _fakeTimeProvider.GetUtcNow();
        var commentStatus = CommentStatus.Active;
        var comment = new Comment(commentId, initialDescription, createdAt, commentStatus);

        // ACT
        var exception = Record.Exception(() => comment.ChangeDescription(null));

        // ASSERT
        exception.ShouldNotBeNull();
        exception.ShouldBeOfType<InvalidDescriptionException>();
    }

    [Theory]
    [InlineData(CommentStatus.Active)]
    public void Abandon_ShouldChangeCommentStatusToAbandon(string startedState)
    {
        // ARRANGE
        var assignmentId = TestUtils.CreateCorrectCommentId();
        var description = new Description("Initial description");
        var createdAt = _fakeTimeProvider.GetUtcNow();
        var assignment = new Comment(assignmentId, description, createdAt, startedState);
        // ACT

        assignment.Abandon();

        // ASSERT
        assignment.CommentStatus.Value.ShouldBe(CommentStatus.Abandon);
    }

    [Theory]
    [InlineData(CommentStatus.Abandon)]
    public void Restore_ShouldChangeCommentStatusToActive(string startedState)
    {
        // ARRANGE
        var assignmentId = TestUtils.CreateCorrectCommentId();
        var description = new Description("Initial description");
        var createdAt = _fakeTimeProvider.GetUtcNow();
        var assignment = new Comment(assignmentId, description, createdAt, startedState);
        // ACT

        assignment.Restore();

        // ASSERT
        assignment.CommentStatus.Value.ShouldBe(CommentStatus.Active);
    }

    [Fact]
    public void ChangeStatus_WhenAbandon_ShouldCallAbandon()
    {
        // ARRANGE
        var commentId = TestUtils.CreateCorrectCommentId();
        var description = new Description("Initial description");
        var createdAt = _fakeTimeProvider.GetUtcNow();
        var startedState = CommentStatus.Active;
        var requestedStatus = CommentStatus.Abandon;
        var expectedStatus = CommentStatus.Abandon;
        var comment = new Comment(commentId, description, createdAt, startedState);

        // ACT
        comment.ChangeStatus(requestedStatus);

        // ASSERT
        Assert.Equal(expectedStatus, comment.CommentStatus);
    }

    [Fact]
    public void ChangeStatus_WhenActive_ShouldCallRestore()
    {
        // ARRANGE
        var commentId = TestUtils.CreateCorrectCommentId();
        var description = new Description("Initial description");
        var createdAt = _fakeTimeProvider.GetUtcNow();
        var startedState = CommentStatus.Abandon;
        var requestedStatus = CommentStatus.Active;
        var expectedStatus = CommentStatus.Active;
        var comment = new Comment(commentId, description, createdAt, startedState);

        // ACT
        comment.ChangeStatus(requestedStatus);

        // ASSERT
        Assert.Equal(expectedStatus, comment.CommentStatus);
    }

    [Fact]
    public void ChangeStatus_WhenInvalidStatus_ThrowsInvalidCommentStatusException()
    {
        // ARRANGE
        var commentId = TestUtils.CreateCorrectCommentId();
        var description = new Description("Initial description");
        var createdAt = _fakeTimeProvider.GetUtcNow();
        var startedState = CommentStatus.Abandon;
        var comment = new Comment(commentId, description, createdAt, startedState);

        // ACT
        var exception = Record.Exception(() => comment.ChangeStatus("NotExistingStatus"));

        // ASSERT
        exception.ShouldNotBeNull();
        exception.ShouldBeOfType<InvalidCommentStatusException>();
    }
}