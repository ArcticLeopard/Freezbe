using Freezbe.Core.Exceptions;
using Shouldly;
using Xunit;

namespace Freezbe.Core.Tests.Unit.Exceptions;

public class AddedEntityCannotBeNullExceptionTests
{
    [Fact]
    public void AddedEntityCannotBeNullExceptionShouldContainCorrectDescription()
    {
        // ARRANGE
        string entity = null;

        // ACT
        var exception = new AddedEntityCannotBeNullException(entity);

        // ASSERT
        exception.ShouldNotBeNull();
        exception.Entity.ShouldBe(entity);
        exception.Message.ShouldBe($"Created entity cannot be Null");   
    }
}