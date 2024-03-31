using Freezbe.Core.Entities;
using Freezbe.Core.Exceptions;
using Freezbe.Core.ValueObjects;
using Shouldly;
using Xunit;

namespace Freezbe.Core.Tests.Unit.Entities;

public class AssignmentTests
{
    private readonly TimeProvider _fakeTimeProvider;
    public AssignmentTests()
    {
        _fakeTimeProvider = TestUtils.FakeTimeProvider();
    }

    [Fact]
    public void Constructor_ValidAssignmentIdAndDescription_PropertiesInitializedCorrectly()
    {
        // ARRANGE
        var assignmentId = TestUtils.CreateCorrectAssignmentId();
        var description = new Description("Initial description");

        // ACT
        var assignment = new Assignment(assignmentId, description, _fakeTimeProvider.GetUtcNow());

        // ASSERT
        assignment.Id.ShouldBe(assignmentId);
        assignment.Description.ShouldBe(description);
    }

    [Fact]
    public void ChangeDescription_WhenCalledWithNewDescription_DescriptionPropertyShouldBeUpdated()
    {
        // ARRANGE
        var assignmentId = TestUtils.CreateCorrectAssignmentId();
        var initialDescription = new Description("Initial description");
        var newDescription = new Description("New description");
        var assignment = new Assignment(assignmentId, initialDescription, _fakeTimeProvider.GetUtcNow());

        // ACT
        assignment.ChangeDescription(newDescription);

        // ASSERT
        assignment.Description.ShouldBe(newDescription);
    }

    [Fact]
    public void ChangeDescription_WithNullDescription_ThrowsInvalidDescriptionException()
    {
        // ARRANGE
        var assignmentId = TestUtils.CreateCorrectAssignmentId();
        var initialDescription = new Description("Initial description");
        var assignment = new Assignment(assignmentId, initialDescription, _fakeTimeProvider.GetUtcNow());

        // ACT
        var exception = Record.Exception(() => assignment.ChangeDescription(null));

        // ASSERT
        exception.ShouldNotBeNull();
        exception.ShouldBeOfType<InvalidDescriptionException>();
    }
}