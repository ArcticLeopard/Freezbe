using Freezbe.Core.Entities;
using Freezbe.Core.Exceptions;
using Freezbe.Core.ValueObjects;
using Shouldly;
using Xunit;

namespace Freezbe.Core.Tests.Unit.Entities;

public class SpaceTests
{
    [Fact]
    public void Constructor_ValidSpaceIdAndDescription_PropertiesInitializedCorrectly()
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
    public void ChangeDescription_WhenCalledWithNewDescription_DescriptionPropertyShouldBeUpdated()
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

    [Fact]
    public void ChangeDescription_WithNullDescription_ThrowsInvalidDescriptionException()
    {
        // ARRANGE
        var spaceId = TestUtils.CreateCorrectSpaceId();
        var initialDescription = new Description("Initial description");
        var space = new Space(spaceId, initialDescription);

        // ACT
        var exception = Record.Exception(() => space.ChangeDescription(null));

        // ASSERT
        exception.ShouldNotBeNull();
        exception.ShouldBeOfType<InvalidDescriptionException>();
    }

    [Fact]
    public void AddProject_WithNullArgument_ThrowsAddedEntityCannotBeNullException()
    {
        // ARRANGE
        var spaceId = TestUtils.CreateCorrectSpaceId();
        var initialDescription = new Description("Initial description");
        var space = new Space(spaceId, initialDescription);

        // ACT
        var exception = Record.Exception(() => space.AddProject(null));

        // ASSERT
        exception.ShouldNotBeNull();
        exception.ShouldBeOfType<AddedEntityCannotBeNullException>();
    }

    [Fact]
    public void AddProject_WithCorrectArgument_ShouldAddElementToCollection()
    {
        // ARRANGE
        var spaceId = TestUtils.CreateCorrectSpaceId();
        var initialDescription = new Description("Initial description");
        var space = new Space(spaceId, initialDescription);

        // ACT
        space.AddProject(new Project(Guid.NewGuid(),"Description"));

        // ASSERT
        space.Projects.ShouldNotBeEmpty();
    }
}