using Freezbe.Core.Exceptions;
using Freezbe.Core.ValueObjects;
using Shouldly;
using Xunit;

namespace Freezbe.Core.Tests.Unit.ValueObjects;

public class AssignmentStatusTests
{
    [Theory]
    [InlineData(null)]
    [InlineData("")]
    [InlineData(" ")]
    [InlineData("   ")]
    [InlineData("         ")]
    [InlineData("NotExistingStatus")]
    public void Constructor_WhenAssignmentStatusReceivesInvalidValue_ShouldThrowAnInvalidAssignmentStatusException(string input)
    {
        //ACT
        var exception = Record.Exception(() => new AssignmentStatus(input));

        //ASSERT
        exception.ShouldNotBeNull();
        exception.ShouldBeOfType<InvalidAssignmentStatusException>();
    }

    [Theory]
    [InlineData(AssignmentStatus.Abandon)]
    [InlineData(AssignmentStatus.Complited)]
    [InlineData(AssignmentStatus.ToDo)]
    public void ShouldAssignCorrectValue_WhenAssignmentStatusReceivesValidInput(string input)
    {
        //ACT
        var description = new AssignmentStatus(input);

        //ASSERT
        description.ShouldNotBeNull();
        description.Value.ShouldNotBeNull();
        description.Value.ShouldNotBeEmpty();
        description.Value.ShouldBe(input);
    }
}