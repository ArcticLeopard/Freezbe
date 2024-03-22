using Freezbe.Core.Entities;
using Freezbe.Core.Exceptions;
using Freezbe.Core.ValueObjects;
using Shouldly;
using Xunit;

namespace Freezbe.Core.Tests.Unit.Entities;

public class CommentTests
{
    [Fact]
    public void ConstructorValidCommentIdAndDescriptionPropertiesInitializedCorrectly()
    {
        // ARRANGE
        var commentId = TestUtils.CreateCorrectCommentId();
        var description = new Description("Initial description");

        // ACT
        var comment = new Comment(commentId, description);

        // ASSERT
        Assert.Equal(commentId, comment.Id);
        Assert.Equal(description, comment.Description);
    }

    [Fact]
    public void WhenChangeDescriptionIsCalledWithNewDescriptionDescriptionPropertyShouldBeUpdated()
    {
        // ARRANGE
        var commentId = TestUtils.CreateCorrectCommentId();
        var initialDescription = new Description("Initial description");
        var newDescription = new Description("New description");
        var comment = new Comment(commentId, initialDescription);

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
        var comment = new Comment(commentId, initialDescription);

        // ACT
        var exception = Record.Exception(() => comment.ChangeDescription(null));

        // ASSERT
        exception.ShouldNotBeNull();
        exception.ShouldBeOfType<InvalidDescriptionException>();
    }
}