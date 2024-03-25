using Freezbe.Core.Exceptions;
using Freezbe.Core.ValueObjects;
using Shouldly;
using Xunit;

namespace Freezbe.Core.Tests.Unit.ValueObjects;

public class SpaceIdTests
{
    [Fact]
    public void Constructor_WhenSpaceIdReceivesAnEmptyGuid_ShouldThrowAnInvalidEntityIdException()
    {
        //ARRANGE
        var emptyGuid = Guid.Empty;

        //ACT
        var exception = Record.Exception(() => new SpaceId(emptyGuid));

        //ASSERT
        exception.ShouldNotBeNull();
        exception.ShouldBeOfType<InvalidEntityIdException>();
    }

    [Fact]
    public void Constructor_WhenSpaceIdReceivesACorrectGuid_ShouldAssignValue()
    {
        //ARRANGE
        var correctGuid = TestUtils.CreateCorrectGuid();

        //ACT
        var spaceId = new SpaceId(correctGuid);

        //ASSERT
        spaceId.ShouldNotBeNull();
        spaceId.Value.ShouldNotBe(Guid.Empty);
        spaceId.Value.ShouldBe(correctGuid);
    }

    [Fact]
    public void ImplicitConversionFromSpaceIdToGuid_ShouldReturnCorrectValue()
    {
        // ARRANGE
        var correctGuid = TestUtils.CreateCorrectGuid();
        var spaceId = new SpaceId(correctGuid);

        // ACT
        Guid result = spaceId;

        // ASSERT
        result.ShouldBe(correctGuid);
    }

    [Fact]
    public void ImplicitConversionFromGuidToSpaceId_ShouldReturnCorrectValue()
    {
        // ARRANGE
        var correctGuid = TestUtils.CreateCorrectGuid();

        // ACT
        SpaceId result = correctGuid;

        // ASSERT
        result.ShouldNotBeNull();
        result.Value.ShouldBe(correctGuid);
    }
}