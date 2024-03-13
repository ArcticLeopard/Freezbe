using Freezbe.Core.Entities;
using Freezbe.Core.ValueObjects;
using Xunit;

namespace Freezbe.Core.Tests.Unit.Entities;

public class ProjectTests
{
    [Fact]
    public void ConstructorValidProjectIdAndDescriptionPropertiesInitializedCorrectly()
    {
        // ARRANGE
        var projectId = TestUtils.CreateCorrectProjectId();
        var description = new Description("Initial description");

        // ACT
        var project = new Project(projectId, description);

        // ASSERT
        Assert.Equal(projectId, project.Id);
        Assert.Equal(description, project.Description);
    }
    
    [Fact]
    public void WhenChangeDescriptionIsCalledWithNewDescriptionDescriptionPropertyShouldBeUpdated()
    {
        // ARRANGE
        var projectId = TestUtils.CreateCorrectProjectId();
        var initialDescription = new Description("Initial description");
        var newDescription = new Description("New description");
        var project = new Project(projectId, initialDescription);

        // ACT
        project.ChangeDescription(newDescription);

        // ASSERT
        Assert.Equal(newDescription, project.Description);
    }
}