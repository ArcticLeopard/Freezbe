using Freezbe.Core.Entities;
using Freezbe.Core.Exceptions;
using Freezbe.Core.ValueObjects;
using Shouldly;
using Xunit;

namespace Freezbe.Core.Tests.Unit.Entities;

public class ProjectTests
{
    private readonly TimeProvider _fakeTimeProvider;

    public ProjectTests()
    {
        _fakeTimeProvider = TestUtils.FakeTimeProvider();
    }

    [Fact]
    public void Constructor_ValidProjectIdAndDescription_PropertiesInitializedCorrectly()
    {
        // ARRANGE
        var projectId = TestUtils.CreateCorrectProjectId();
        var description = new Description("Initial description");

        // ACT
        var project = new Project(projectId, description, _fakeTimeProvider.GetUtcNow());

        // ASSERT
        project.Id.ShouldBe(projectId);
        project.Description.ShouldBe(description);
        project.Assignments.ShouldBeEmpty();
    }

    [Fact]
    public void ChangeDescription_WhenCalledWithNewDescription_DescriptionPropertyShouldBeUpdated()
    {
        // ARRANGE
        var projectId = TestUtils.CreateCorrectProjectId();
        var initialDescription = new Description("Initial description");
        var newDescription = new Description("New description");
        var project = new Project(projectId, initialDescription, _fakeTimeProvider.GetUtcNow());

        // ACT
        project.ChangeDescription(newDescription);

        // ASSERT
        project.Description.ShouldBe(newDescription);
    }

    [Fact]
    public void ChangeDescription_WithNullDescription_ThrowsInvalidDescriptionException()
    {
        // ARRANGE
        var projectId = TestUtils.CreateCorrectProjectId();
        var initialDescription = new Description("Initial description");
        var project = new Project(projectId, initialDescription, _fakeTimeProvider.GetUtcNow());

        // ACT
        var exception = Record.Exception(() => project.ChangeDescription(null));

        // ASSERT
        exception.ShouldNotBeNull();
        exception.ShouldBeOfType<InvalidDescriptionException>();
    }

    [Fact]
    public void AddAssignment_WithNullArgument_ThrowsAddedEntityCannotBeNullException()
    {
        // ARRANGE
        var projectId = TestUtils.CreateCorrectProjectId();
        var initialDescription = new Description("Initial description");
        var project = new Project(projectId, initialDescription, _fakeTimeProvider.GetUtcNow());

        // ACT
        var exception = Record.Exception(() => project.AddAssignment(null));

        // ASSERT
        exception.ShouldNotBeNull();
        exception.ShouldBeOfType<AddedEntityCannotBeNullException>();
    }

    [Fact]
    public void AddAssignment_WithCorrectArgument_ShouldAddElementToCollection()
    {
        // ARRANGE
        var projectId = TestUtils.CreateCorrectProjectId();
        var initialDescription = new Description("Initial description");
        var project = new Project(projectId, initialDescription, _fakeTimeProvider.GetUtcNow());

        // ACT
        project.AddAssignment(new Assignment(Guid.NewGuid(),"Description", _fakeTimeProvider.GetUtcNow()));

        // ASSERT
        project.Assignments.ShouldNotBeEmpty();
    }
}