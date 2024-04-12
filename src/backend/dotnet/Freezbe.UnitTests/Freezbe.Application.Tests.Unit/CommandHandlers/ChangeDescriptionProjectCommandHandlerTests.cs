using Freezbe.Application.CommandHandlers;
using Freezbe.Application.Commands;
using Freezbe.Application.Exceptions;
using Freezbe.Core.Entities;
using Freezbe.Core.Repositories;
using Freezbe.Core.ValueObjects;
using Moq;
using Shouldly;
using Xunit;

namespace Freezbe.Application.Tests.Unit.CommandHandlers;

public class ChangeDescriptionProjectCommandHandlerTests
{
    private readonly TimeProvider _fakeTimeProvider;

    public ChangeDescriptionProjectCommandHandlerTests()
    {
        _fakeTimeProvider = TestUtils.FakeTimeProvider();
    }

    [Fact]
    public async Task HandleAsync_ValidCommand_SuccessfullyChangesDescription()
    {
        // ASSERT
        var projectId = Guid.NewGuid();
        var newDescription = "New description";
        var project = new Project(projectId, "Old description", _fakeTimeProvider.GetUtcNow(), ProjectStatus.Active);

        var projectRepositoryMock = new Mock<IProjectRepository>();
        projectRepositoryMock.Setup(p => p.GetAsync(projectId)).ReturnsAsync(project);

        var handler = new ChangeDescriptionProjectCommandHandler(projectRepositoryMock.Object);
        var command = new ChangeDescriptionProjectCommand(projectId, newDescription);

        // ACT
        await handler.Handle(command, CancellationToken.None);

        // ASSERT
        Assert.Equal(newDescription, project.Description);
        projectRepositoryMock.Verify(p => p.UpdateAsync(project), Times.Once);
    }

    [Fact]
    public async Task HandleAsync_CommandWithNotExistingsProjectId_ShouldThrowProjectNotFoundException()
    {
        // ASSERT
        var assignmentRepositoryMock = new Mock<IProjectRepository>();
        var existingsProjectId = new ProjectId(Guid.NewGuid());
        var assignment = new Project(Guid.NewGuid(),"Description", _fakeTimeProvider.GetUtcNow(), ProjectStatus.Active);
        assignmentRepositoryMock.Setup(p => p.GetAsync(existingsProjectId)).ReturnsAsync(assignment);
        var handler = new ChangeDescriptionProjectCommandHandler(assignmentRepositoryMock.Object);
        var command = new ChangeDescriptionProjectCommand(Guid.NewGuid(), "Test description");

        //ACT
        var exception = await Record.ExceptionAsync(() => handler.Handle(command, CancellationToken.None));

        //ASSERT
        exception.ShouldNotBeNull();
        exception.ShouldBeOfType<ProjectNotFoundException>();
    }
}