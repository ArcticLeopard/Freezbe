using Freezbe.Core.Exceptions;
using Freezbe.Core.ValueObjects;
using Shouldly;
using Xunit;

namespace Freezbe.Core.Tests.Unit.ValueObjects;

public class CommentIdTests
{
    [Fact]
    public void Constructor_WhenCommentIdReceivesAnEmptyGuid_ShouldThrowAnInvalidEntityIdException()
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
    public void Constructor_WhenCommentIdReceivesACorrectGuid_ShouldAssignValue()
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
    public void ImplicitConversionFromCommentIdToGuid_ShouldReturnCorrectValue()
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
    public void ImplicitConversionFromGuidToCommentId_ShouldReturnCorrectValue()
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