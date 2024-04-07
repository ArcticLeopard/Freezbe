using Freezbe.Core.Exceptions;
using Shouldly;
using Xunit;

namespace Freezbe.Core.Tests.Unit.Exceptions;

public class InvalidAssignmentStatusExceptionTests
{
    [Fact]
    public void InvalidAssignmentStatusException_ShouldContainCorrectAssignmentStatus()
    {
        // ARRANGE
        string assignmentStatus = "Invalid assignmentStatus";

        // ACT
        var exception = new InvalidAssignmentStatusException(assignmentStatus);

        // ASSERT
        exception.ShouldNotBeNull();
        exception.AssignmentStatus.ShouldBe(assignmentStatus);
        exception.Message.ShouldBe($"Cannot set: \"{assignmentStatus}\" as assignmentStatus.");
    }
}