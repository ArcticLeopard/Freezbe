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
    public void Constructor_ValidCommentIdAndDescription_PropertiesInitializedCorrectly()
    {
        // ARRANGE
        var commentId = TestUtils.CreateCorrectCommentId();
        var description = new Description("Initial description");

        // ACT
        var comment = new Comment(commentId, description, _fakeTimeProvider.GetUtcNow());

        // ASSERT
        Assert.Equal(commentId, comment.Id);
        Assert.Equal(description, comment.Description);
    }

    [Fact]
    public void ChangeDescription_WhenCalledWithNewDescription_DescriptionPropertyShouldBeUpdated()
    {
        // ARRANGE
        var commentId = TestUtils.CreateCorrectCommentId();
        var initialDescription = new Description("Initial description");
        var newDescription = new Description("New description");
        var comment = new Comment(commentId, initialDescription, _fakeTimeProvider.GetUtcNow());

        // ACT
        comment.ChangeDescription(newDescription);

        // ASSERT
        Assert.Equal(newDescription, comment.Description);
    }

    [Fact]
    public void ChangeDescription_WithNullDescription_ThrowsInvalidDescriptionException()
    {
        // ARRANGE
        var commentId = TestUtils.CreateCorrectCommentId();
        var initialDescription = new Description("Initial description");
        var comment = new Comment(commentId, initialDescription, _fakeTimeProvider.GetUtcNow());

        // ACT
        var exception = Record.Exception(() => comment.ChangeDescription(null));

        // ASSERT
        exception.ShouldNotBeNull();
        exception.ShouldBeOfType<InvalidDescriptionException>();
    }
}