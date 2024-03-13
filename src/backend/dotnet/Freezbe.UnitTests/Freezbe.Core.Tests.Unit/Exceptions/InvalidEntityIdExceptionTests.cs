using Freezbe.Core.Exceptions;
using Shouldly;
using Xunit;

namespace Freezbe.Core.Tests.Unit.Exceptions;

public class InvalidEntityIdExceptionTests
{
    [Fact]
    public void InvalidEntityIdExceptionShouldContainCorrectId()
    {
        // ARRANGE
        object entityId = 123;

        // ACT
        var exception = new InvalidEntityIdException(entityId);

        // ASSERT
        exception.ShouldNotBeNull();
        exception.Id.ShouldBe(entityId);
        exception.Message.ShouldBe($"Cannot set: \"{entityId}\" as entity identifier.");
    }
}