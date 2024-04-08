using Freezbe.Core.Exceptions;
using Freezbe.Core.ValueObjects;
using Shouldly;
using Xunit;

namespace Freezbe.Core.Tests.Unit.ValueObjects;

public class CommentStatusTests
{
    [Theory]
    [InlineData(null)]
    [InlineData("")]
    [InlineData(" ")]
    [InlineData("   ")]
    [InlineData("         ")]
    [InlineData("NotExistingStatus")]
    public void Constructor_WhenCommentStatusReceivesInvalidValue_ShouldThrowAnInvalidCommentStatusException(string input)
    {
        //ACT
        var exception = Record.Exception(() => new CommentStatus(input));

        //ASSERT
        exception.ShouldNotBeNull();
        exception.ShouldBeOfType<InvalidCommentStatusException>();
    }

    [Theory]
    [InlineData(CommentStatus.Abandon)]
    [InlineData(CommentStatus.Active)]
    public void ShouldAssignCorrectValue_WhenCommentStatusReceivesValidInput(string input)
    {
        //ACT
        var description = new CommentStatus(input);

        //ASSERT
        description.ShouldNotBeNull();
        description.Value.ShouldNotBeNull();
        description.Value.ShouldNotBeEmpty();
        description.Value.ShouldBe(input);
    }
}