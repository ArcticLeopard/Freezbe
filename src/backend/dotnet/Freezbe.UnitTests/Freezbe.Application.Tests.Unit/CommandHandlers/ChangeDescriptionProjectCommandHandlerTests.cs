using Freezbe.Application.CommandHandlers;
using Freezbe.Application.Commands;
using Freezbe.Core.Entities;
using Freezbe.Core.Repositories;
using Freezbe.Core.ValueObjects;
using Moq;
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
}