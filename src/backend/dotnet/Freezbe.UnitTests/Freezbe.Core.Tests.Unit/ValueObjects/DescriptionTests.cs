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
    public void Constructor_WhenDescriptionReceivesAnIsNullOrWhiteSpace_ShouldThrowAnInvalidDescriptionException(string input)
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
    public void ShouldAssignCorrectValue_WhenDescriptionReceivesValidInput(string input)
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
    public void ImplicitConversionFromDescriptionToString_ShouldReturnCorrectValue(string input)
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
    public void ImplicitConversionFromStringToDescription_ShouldReturnCorrectValue(string input)
    {
        // ACT
        Description result = input;

        // ASSERT
        result.ShouldNotBeNull();
        result.Value.ShouldBe(input);
    }
}