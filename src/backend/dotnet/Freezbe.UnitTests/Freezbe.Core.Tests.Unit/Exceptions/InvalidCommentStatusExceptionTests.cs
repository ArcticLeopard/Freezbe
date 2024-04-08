using Freezbe.Core.Exceptions;
using Shouldly;
using Xunit;

namespace Freezbe.Core.Tests.Unit.Exceptions;

public class InvalidCommentStatusExceptionTests
{
    [Fact]
    public void InvalidCommentStatusException_ShouldContainCorrectCommentStatus()
    {
        // ARRANGE
        string commentStatus = "Invalid commentStatus";

        // ACT
        var exception = new InvalidCommentStatusException(commentStatus);

        // ASSERT
        exception.ShouldNotBeNull();
        exception.CommentStatus.ShouldBe(commentStatus);
        exception.Message.ShouldBe($"Cannot set: \"{commentStatus}\" as commentStatus.");
    }
}