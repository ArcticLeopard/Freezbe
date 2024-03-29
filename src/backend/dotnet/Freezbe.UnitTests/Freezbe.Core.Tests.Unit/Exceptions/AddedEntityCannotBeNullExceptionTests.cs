﻿using Freezbe.Core.Exceptions;
using Shouldly;
using Xunit;

namespace Freezbe.Core.Tests.Unit.Exceptions;

public class AddedEntityCannotBeNullExceptionTests
{
    [Fact]
    public void AddedEntityCannotBeNullException_ShouldContainCorrectDescription()
    {
        // ACT
        var exception = new AddedEntityCannotBeNullException();

        // ASSERT
        exception.ShouldNotBeNull();
        exception.Message.ShouldBe($"Created entity cannot be Null");
    }
}