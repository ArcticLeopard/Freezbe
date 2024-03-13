using Freezbe.Core.Exceptions;
using Freezbe.Core.ValueObjects;
using Shouldly;
using Xunit;

namespace Freezbe.Core.Tests.Unit.ValueObjects;

public class DescriptionTests
{
    [Theory]
    [InlineData(null)]
    [InlineData("")]
    [InlineData(" ")]
    [InlineData("   ")]
    [InlineData("         ")]
    public void WhenDescriptionReceivesAnIsNullOrWhiteSpaceItShouldThrowAnInvalidDescriptionException(string input)
    {
        //ACT
        var exception = Record.Exception(() => new Description(input));

        //ASSERT
        exception.ShouldNotBeNull();
        exception.ShouldBeOfType<InvalidDescriptionException>();
    }

    [Theory]
    [InlineData("Lorem ipsum")]
    [InlineData("Example")]
    public void ShouldAssignCorrectValueWhenDescriptionReceivesValidInput(string input)
    {
        //ACT
        var description = new Description(input);

        //ASSERT
        description.ShouldNotBeNull();
        description.Value.ShouldNotBeNull();
        description.Value.ShouldNotBeEmpty();
        description.Value.ShouldBe(input);
    }
    
    [Theory]
    [InlineData("Lorem ipsum")]
    [InlineData("Example")]
    public void ImplicitConversionFromDescriptionToStringShouldReturnCorrectValue(string input)
    {
        // ARRANGE
        var description = new Description(input);

        // ACT
        string result = description;

        // ASSERT
        result.ShouldBe(description);
    }
    
    [Theory]
    [InlineData("Lorem ipsum")]
    [InlineData("Example")]
    public void ImplicitConversionFromStringToDescriptionShouldReturnCorrectValue(string input)
    {
        // ACT
        Description result = input;

        // ASSERT
        result.ShouldNotBeNull();
        result.Value.ShouldBe(input);
    }
}