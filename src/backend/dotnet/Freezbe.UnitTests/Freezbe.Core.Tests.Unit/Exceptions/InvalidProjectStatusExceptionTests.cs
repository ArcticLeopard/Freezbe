using Freezbe.Core.Exceptions;
using Shouldly;
using Xunit;

namespace Freezbe.Core.Tests.Unit.Exceptions;

public class InvalidProjectStatusExceptionTests
{
    [Fact]
    public void InvalidProjectStatusException_ShouldContainCorrectProjectStatus()
    {
        // ARRANGE
        string projectStatus = "Invalid projectStatus";

        // ACT
        var exception = new InvalidProjectStatusException(projectStatus);

        // ASSERT
        exception.ShouldNotBeNull();
        exception.ProjectStatus.ShouldBe(projectStatus);
        exception.Message.ShouldBe($"Cannot set: \"{projectStatus}\" as projectStatus.");
    }
}