using Freezbe.Core.Entities;
using Freezbe.Core.ValueObjects;
using Xunit;

namespace Freezbe.Core.Tests.Unit.Entities;

public class AssignmentTests
{
    [Fact]
    public void ConstructorValidAssignmentIdAndDescriptionPropertiesInitializedCorrectly()
    {
        // ARRANGE
        var assignmentId = TestUtils.CreateCorrectAssignmentId();
        var description = new Description("Initial description");

        // ACT
        var assignment = new Assignment(assignmentId, description);

        // ASSERT
        Assert.Equal(assignmentId, assignment.Id);
        Assert.Equal(description, assignment.Description);
    }
    
    [Fact]
    public void WhenChangeDescriptionIsCalledWithNewDescriptionDescriptionPropertyShouldBeUpdated()
    {
        // ARRANGE
        var assignmentId = TestUtils.CreateCorrectAssignmentId();
        var initialDescription = new Description("Initial description");
        var newDescription = new Description("New description");
        var assignment = new Assignment(assignmentId, initialDescription);

        // ACT
        assignment.ChangeDescription(newDescription);

        // ASSERT
        Assert.Equal(newDescription, assignment.Description);
    }
}