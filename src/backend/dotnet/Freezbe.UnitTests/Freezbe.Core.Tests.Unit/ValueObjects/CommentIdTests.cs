using Freezbe.Core.Exceptions;
using Freezbe.Core.ValueObjects;
using Shouldly;
using Xunit;

namespace Freezbe.Core.Tests.Unit.ValueObjects;

public class CommentIdTests
{
    [Fact]
    public void WhenCommentIdReceivesAnEmptyGuidItShouldThrowAnInvalidEntityIdException()
    {
        //ARRANGE
        var emptyGuid = Guid.Empty;

        //ACT
        var exception = Record.Exception(() => new CommentId(emptyGuid));

        //ASSERT
        exception.ShouldNotBeNull();
        exception.ShouldBeOfType<InvalidEntityIdException>();
    }

    [Fact]
    public void WhenCommentIdReceivesAnCorrectGuidItShouldAssignValue()
    {
        //ARRANGE
        var correctGuid = TestUtils.CreateCorrectGuid();

        //ACT
        var commentId = new CommentId(correctGuid);

        //ASSERT
        commentId.ShouldNotBeNull();
        commentId.Value.ShouldNotBe(Guid.Empty);
        commentId.Value.ShouldBe(correctGuid);
    }

    [Fact]
    public void ImplicitConversionFromCommentIdToGuidShouldReturnCorrectValue()
    {
        // ARRANGE
        var correctGuid = TestUtils.CreateCorrectGuid();
        var commentId = new CommentId(correctGuid);

        // ACT
        Guid result = commentId;

        // ASSERT
        result.ShouldBe(correctGuid);
    }

    [Fact]
    public void ImplicitConversionFromGuidToCommentIdShouldReturnCorrectValue()
    {
        // ARRANGE
        var correctGuid = TestUtils.CreateCorrectGuid();

        // ACT
        CommentId result = correctGuid;

        // ASSERT
        result.ShouldNotBeNull();
        result.Value.ShouldBe(correctGuid);
    }
}