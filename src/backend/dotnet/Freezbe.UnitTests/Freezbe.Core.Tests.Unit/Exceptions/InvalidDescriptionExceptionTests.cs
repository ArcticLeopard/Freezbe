using Freezbe.Core.Exceptions;
using Shouldly;
using Xunit;

namespace Freezbe.Core.Tests.Unit.Exceptions;

public class InvalidDescriptionExceptionTests
{
    [Fact]
    public void InvalidDescriptionExceptionShouldContainCorrectDescription()
    {
        // ARRANGE
        string description = "Invalid description";

        // ACT
        var exception = new InvalidDescriptionException(description);

        // ASSERT
        exception.ShouldNotBeNull();
        exception.Description.ShouldBe(description);
        exception.Message.ShouldBe($"Cannot set: \"{description}\" as description.");
    }
}