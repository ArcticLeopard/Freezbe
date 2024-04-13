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
    public void Constructor_WithValidAttribues_ShouldPropertiesInitializedCorrectly()
    {
        // ARRANGE
        var projectId = TestUtils.CreateCorrectProjectId();
        var description = new Description("Initial description");
        var createdAt = _fakeTimeProvider.GetUtcNow();
        var projectStatus = (ProjectStatus)ProjectStatus.Active;

        // ACT
        var project = new Project(projectId, description, createdAt, projectStatus);

        // ASSERT
        project.Id.ShouldBe(projectId);
        project.Description.ShouldBe(description);
        project.ProjectStatus.ShouldBe(projectStatus);
        project.ProjectStatus.Value.ShouldBe((string)projectStatus);
        project.Assignments.ShouldBeEmpty();
    }

    [Fact]
    public void ChangeDescription_WhenCalledWithNewDescription_DescriptionPropertyShouldBeUpdated()
    {
        // ARRANGE
        var projectId = TestUtils.CreateCorrectProjectId();
        var initialDescription = new Description("Initial description");
        var newDescription = new Description("New description");
        var createdAt = _fakeTimeProvider.GetUtcNow();
        var project = new Project(projectId, initialDescription, createdAt, ProjectStatus.Active);

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
        var createdAt = _fakeTimeProvider.GetUtcNow();
        var project = new Project(projectId, initialDescription, createdAt, ProjectStatus.Active);

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
        var createdAt = _fakeTimeProvider.GetUtcNow();
        var project = new Project(projectId, initialDescription, createdAt, ProjectStatus.Active);

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
        var createdAt = _fakeTimeProvider.GetUtcNow();
        var project = new Project(projectId, initialDescription, createdAt, ProjectStatus.Active);

        // ACT
        project.AddAssignment(new Assignment(Guid.NewGuid(),"Description", createdAt, AssignmentStatus.Active));

        // ASSERT
        project.Assignments.ShouldNotBeEmpty();
    }

    [Theory]
    [InlineData(ProjectStatus.Active)]
    public void Abandon_ShouldChangeProjectStatusToAbandon(string startedState)
    {
        // ARRANGE
        var assignmentId = TestUtils.CreateCorrectProjectId();
        var description = new Description("Initial description");
        var createdAt = _fakeTimeProvider.GetUtcNow();
        var assignment = new Project(assignmentId, description, createdAt, startedState);
        // ACT

        assignment.Abandon();

        // ASSERT
        assignment.ProjectStatus.Value.ShouldBe(ProjectStatus.Abandon);
    }

    [Theory]
    [InlineData(ProjectStatus.Abandon)]
    public void Restore_ShouldChangeProjectStatusToActive(string startedState)
    {
        // ARRANGE
        var assignmentId = TestUtils.CreateCorrectProjectId();
        var description = new Description("Initial description");
        var createdAt = _fakeTimeProvider.GetUtcNow();
        var assignment = new Project(assignmentId, description, createdAt, startedState);
        // ACT

        assignment.Restore();

        // ASSERT
        assignment.ProjectStatus.Value.ShouldBe(ProjectStatus.Active);
    }

    [Fact]
    public void ChangeStatus_WhenAbandon_ShouldCallAbandon()
    {
        // ARRANGE
        var projectId = TestUtils.CreateCorrectProjectId();
        var description = new Description("Initial description");
        var createdAt = _fakeTimeProvider.GetUtcNow();
        var startedState = ProjectStatus.Active;
        var requestedStatus = ProjectStatus.Abandon;
        var expectedStatus = ProjectStatus.Abandon;
        var project = new Project(projectId, description, createdAt, startedState);

        // ACT
        project.ChangeStatus(requestedStatus);

        // ASSERT
        Assert.Equal(expectedStatus, project.ProjectStatus);
    }

    [Fact]
    public void ChangeStatus_WhenActive_ShouldCallRestore()
    {
        // ARRANGE
        var projectId = TestUtils.CreateCorrectProjectId();
        var description = new Description("Initial description");
        var createdAt = _fakeTimeProvider.GetUtcNow();
        var startedState = ProjectStatus.Abandon;
        var requestedStatus = ProjectStatus.Active;
        var expectedStatus = ProjectStatus.Active;
        var project = new Project(projectId, description, createdAt, startedState);

        // ACT
        project.ChangeStatus(requestedStatus);

        // ASSERT
        Assert.Equal(expectedStatus, project.ProjectStatus);
    }

    [Fact]
    public void ChangeStatus_WhenInvalidStatus_ThrowsInvalidProjectStatusException()
    {
        // ARRANGE
        var projectId = TestUtils.CreateCorrectProjectId();
        var description = new Description("Initial description");
        var createdAt = _fakeTimeProvider.GetUtcNow();
        var startedState = ProjectStatus.Abandon;
        var project = new Project(projectId, description, createdAt, startedState);

        // ACT
        var exception = Record.Exception(() => project.ChangeStatus("NotExistingStatus"));

        // ASSERT
        exception.ShouldNotBeNull();
        exception.ShouldBeOfType<InvalidProjectStatusException>();
    }
}