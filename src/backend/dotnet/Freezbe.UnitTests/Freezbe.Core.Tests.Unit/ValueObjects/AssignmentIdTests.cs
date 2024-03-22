using Freezbe.Core.Entities;
using Freezbe.Core.Exceptions;
using Freezbe.Core.ValueObjects;
using Shouldly;
using Xunit;

namespace Freezbe.Core.Tests.Unit.ValueObjects;

public class AssignmentIdTests
{
    [Fact]
    public void WhenAssignmentIdReceivesAnEmptyGuidItShouldThrowAnInvalidEntityIdException()
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
    public void WhenAssignmentIdReceivesAnCorrectGuidItShouldAssignValue()
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
    public void ImplicitConversionFromAssignmentIdToGuidShouldReturnCorrectValue()
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
    public void ImplicitConversionFromGuidToAssignmentIdShouldReturnCorrectValue()
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
        var assignment = new Assignment(assignmentId, initialDescription);

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
        var assignment = new Assignment(assignmentId, initialDescription);

        // ACT
        assignment.AddComment(new Comment(Guid.NewGuid(),"Description"));

        // ASSERT
        assignment.Comments.ShouldNotBeEmpty();
    }
}