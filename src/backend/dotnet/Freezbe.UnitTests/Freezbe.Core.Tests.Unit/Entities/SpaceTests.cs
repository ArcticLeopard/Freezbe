using Freezbe.Core.Entities;
using Freezbe.Core.ValueObjects;
using Xunit;

namespace Freezbe.Core.Tests.Unit.Entities;

public class SpaceTests
{
    [Fact]
    public void ConstructorValidSpaceIdAndDescriptionPropertiesInitializedCorrectly()
    {
        // ARRANGE
        var spaceId = TestUtils.CreateCorrectSpaceId();
        var description = new Description("Initial description");

        // ACT
        var space = new Space(spaceId, description);

        // ASSERT
        Assert.Equal(spaceId, space.Id);
        Assert.Equal(description, space.Description);
    }

    [Fact]
    public void WhenChangeDescriptionIsCalledWithNewDescriptionDescriptionPropertyShouldBeUpdated()
    {
        // ARRANGE
        var spaceId = TestUtils.CreateCorrectSpaceId();
        var initialDescription = new Description("Initial description");
        var newDescription = new Description("New description");
        var space = new Space(spaceId, initialDescription);

        // ACT
        space.ChangeDescription(newDescription);

        // ASSERT
        Assert.Equal(newDescription, space.Description);
    }
}