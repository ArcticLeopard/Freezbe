using Freezbe.Core.Entities;
using Freezbe.Core.Exceptions;
using Freezbe.Core.ValueObjects;
using Shouldly;
using Xunit;

namespace Freezbe.Core.Tests.Unit.ValueObjects;

public class AssignmentIdTests
{
    private readonly TimeProvider _fakeTimeProvider;

    public AssignmentIdTests()
    {
        _fakeTimeProvider = TestUtils.FakeTimeProvider();
    }

    [Fact]
    public void Constructor_WhenAssignmentIdReceivesAnEmptyGuid_ShouldThrowAnInvalidEntityIdException()
    {
        //ARRANGE
        var emptyGuid = Guid.Empty;

        //ACT
        var exception = Record.Exception(() => new AssignmentId(emptyGuid));

        //ASSERT
        exception.ShouldNotBeNull();
        exception.ShouldBeOfType<InvalidEntityIdException>();
    }

    [Fact]
    public void Constructor_WhenAssignmentIdReceivesACorrectGuid_ShouldAssignValue()
    {
        //ARRANGE
        var correctGuid = TestUtils.CreateCorrectGuid();

        //ACT
        var assignmentId = new AssignmentId(correctGuid);

        //ASSERT
        assignmentId.ShouldNotBeNull();
        assignmentId.Value.ShouldNotBe(Guid.Empty);
        assignmentId.Value.ShouldBe(correctGuid);
    }

    [Fact]
    public void ImplicitConversionFromAssignmentIdToGuid_ShouldReturnCorrectValue()
    {
        // ARRANGE
        var correctGuid = TestUtils.CreateCorrectGuid();
        var assignmentId = new AssignmentId(correctGuid);

        // ACT
        Guid result = assignmentId;

        // ASSERT
        result.ShouldBe(correctGuid);
    }

    [Fact]
    public void ImplicitConversionFromGuidToAssignmentId_ShouldReturnCorrectValue()
    {
        // ARRANGE
        var correctGuid = TestUtils.CreateCorrectGuid();

        // ACT
        AssignmentId result = correctGuid;

        // ASSERT
        result.ShouldNotBeNull();
        result.Value.ShouldBe(correctGuid);
    }

    [Fact]
    public void AddComment_WithNullArgument_ThrowsAddedEntityCannotBeNullException()
    {
        // ARRANGE
        var assignmentId = TestUtils.CreateCorrectAssignmentId();
        var initialDescription = new Description("Initial description");
        var assignment = new Assignment(assignmentId, initialDescription, _fakeTimeProvider.GetUtcNow(), AssignmentStatus.Active, false);

        // ACT
        var exception = Record.Exception(() => assignment.AddComment(null));

        // ASSERT
        exception.ShouldNotBeNull();
        exception.ShouldBeOfType<AddedEntityCannotBeNullException>();
    }

    [Fact]
    public void AddComment_WithCorrectArgument_ShouldAddElementToCollection()
    {
        // ARRANGE
        var assignmentId = TestUtils.CreateCorrectAssignmentId();
        var initialDescription = new Description("Initial description");
        var createdAt = _fakeTimeProvider.GetUtcNow();
        var assignment = new Assignment(assignmentId, initialDescription, createdAt, AssignmentStatus.Active, false);

        // ACT
        assignment.AddComment(new Comment(Guid.NewGuid(),"Description", createdAt, CommentStatus.Active));

        // ASSERT
        assignment.Comments.ShouldNotBeEmpty();
    }
}