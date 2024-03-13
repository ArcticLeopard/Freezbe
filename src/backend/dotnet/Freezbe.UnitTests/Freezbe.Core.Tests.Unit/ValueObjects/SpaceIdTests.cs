using Freezbe.Core.Exceptions;
using Freezbe.Core.ValueObjects;
using Shouldly;
using Xunit;

namespace Freezbe.Core.Tests.Unit.ValueObjects;

public class SpaceIdTests
{
    [Fact]
    public void WhenSpaceIdReceivesAnEmptyGuidItShouldThrowAnInvalidEntityIdException()
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
    public void WhenSpaceIdReceivesAnCorrectGuidItShouldAssignValue()
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
    public void ImplicitConversionFromSpaceIdToGuidShouldReturnCorrectValue()
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
    public void ImplicitConversionFromGuidToSpaceIdShouldReturnCorrectValue()
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