using Freezbe.Core.Exceptions;
using Freezbe.Core.ValueObjects;
using Shouldly;
using Xunit;

namespace Freezbe.Core.Tests.Unit.ValueObjects;

public class ProjectStatusTests
{
    [Theory]
    [InlineData(null)]
    [InlineData("")]
    [InlineData(" ")]
    [InlineData("   ")]
    [InlineData("         ")]
    [InlineData("NotExistingStatus")]
    public void Constructor_WhenProjectStatusReceivesInvalidValue_ShouldThrowAnInvalidProjectStatusException(string input)
    {
        //ACT
        var exception = Record.Exception(() => new ProjectStatus(input));

        //ASSERT
        exception.ShouldNotBeNull();
        exception.ShouldBeOfType<InvalidProjectStatusException>();
    }

    [Theory]
    [InlineData(ProjectStatus.Abandon)]
    [InlineData(ProjectStatus.Active)]
    public void ShouldAssignCorrectValue_WhenProjectStatusReceivesValidInput(string input)
    {
        //ACT
        var description = new ProjectStatus(input);

        //ASSERT
        description.ShouldNotBeNull();
        description.Value.ShouldNotBeNull();
        description.Value.ShouldNotBeEmpty();
        description.Value.ShouldBe(input);
    }
}