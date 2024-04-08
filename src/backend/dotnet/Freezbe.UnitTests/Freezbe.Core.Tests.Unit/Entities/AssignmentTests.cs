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
    public void Constructor_WithValidAttribues_ShouldPropertiesInitializedCorrectly()
    {
        // ARRANGE
        var assignmentId = TestUtils.CreateCorrectAssignmentId();
        var description = new Description("Initial description");
        var createdAt = _fakeTimeProvider.GetUtcNow();
        AssignmentStatus assignmentStatus = AssignmentStatus.Active;

        // ACT

        var assignment = new Assignment(assignmentId, description, createdAt, assignmentStatus);

        // ASSERT
        assignment.Id.ShouldBe(assignmentId);
        assignment.Description.ShouldBe(description);
        assignment.AssignmentStatus.ShouldBe(assignmentStatus);
        assignment.AssignmentStatus.Value.ShouldBe((string)assignmentStatus);
        assignment.CreatedAt.ShouldBe(createdAt);
    }

    [Fact]
    public void ChangeDescription_WhenCalledWithNewDescription_DescriptionPropertyShouldBeUpdated()
    {
        // ARRANGE
        var assignmentId = TestUtils.CreateCorrectAssignmentId();
        var initialDescription = new Description("Initial description");
        var newDescription = new Description("New description");
        var dateTimeOffset = _fakeTimeProvider.GetUtcNow();
        var assignment = new Assignment(assignmentId, initialDescription, dateTimeOffset, AssignmentStatus.Active);

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
        var assignment = new Assignment(assignmentId, initialDescription, _fakeTimeProvider.GetUtcNow(), AssignmentStatus.Active);

        // ACT
        var exception = Record.Exception(() => assignment.ChangeDescription(null));

        // ASSERT
        exception.ShouldNotBeNull();
        exception.ShouldBeOfType<InvalidDescriptionException>();
    }

    [Theory]
    [InlineData(AssignmentStatus.Active)]
    [InlineData(AssignmentStatus.Complited)]
    public void Abandon_ShouldChangeAssignmentStatusToAbandon(string startedState)
    {
        // ARRANGE
        var assignmentId = TestUtils.CreateCorrectAssignmentId();
        var description = new Description("Initial description");
        var createdAt = _fakeTimeProvider.GetUtcNow();
        var assignment = new Assignment(assignmentId, description, createdAt, startedState);
        // ACT

        assignment.Abandon();

        // ASSERT
        assignment.AssignmentStatus.Value.ShouldBe(AssignmentStatus.Abandon);
    }

    [Theory]
    [InlineData(AssignmentStatus.Active)]
    [InlineData(AssignmentStatus.Abandon)]
    public void Complited_ShouldChangeAssignmentStatusToComplited(string startedState)
    {
        // ARRANGE
        var assignmentId = TestUtils.CreateCorrectAssignmentId();
        var description = new Description("Initial description");
        var createdAt = _fakeTimeProvider.GetUtcNow();
        var assignment = new Assignment(assignmentId, description, createdAt, startedState);
        // ACT

        assignment.Complited();

        // ASSERT
        assignment.AssignmentStatus.Value.ShouldBe(AssignmentStatus.Complited);
    }

    [Theory]
    [InlineData(AssignmentStatus.Abandon)]
    [InlineData(AssignmentStatus.Complited)]
    public void Restore_ShouldChangeAssignmentStatusToActive(string startedState)
    {
        // ARRANGE
        var assignmentId = TestUtils.CreateCorrectAssignmentId();
        var description = new Description("Initial description");
        var createdAt = _fakeTimeProvider.GetUtcNow();
        var assignment = new Assignment(assignmentId, description, createdAt, startedState);
        // ACT

        assignment.Restore();

        // ASSERT
        assignment.AssignmentStatus.Value.ShouldBe(AssignmentStatus.Active);
    }
}