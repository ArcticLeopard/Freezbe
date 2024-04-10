using Freezbe.Application.CommandHandlers;
using Freezbe.Application.Commands;
using Freezbe.Application.Exceptions;
using Freezbe.Core.Entities;
using Freezbe.Core.Repositories;
using Moq;
using Shouldly;
using Xunit;

namespace Freezbe.Application.Tests.Unit.CommandHandlers;

public class SpaceHardDeleteCommandHandlerTests
{
    private readonly TimeProvider _fakeTimeProvider;

    public SpaceHardDeleteCommandHandlerTests()
    {
        _fakeTimeProvider = TestUtils.FakeTimeProvider();
    }

    [Fact]
    public async Task HandleAsync_ValidCommand_SuccessfullyDeleteSpace()
    {
        // ASSERT
        var spaceId = Guid.NewGuid();
        var createdAt = _fakeTimeProvider.GetUtcNow();
        var space = new Space(spaceId, "Description", createdAt);
        var command = new SpaceHardDeleteCommand(spaceId);
        var spaceRepositoryMock = new Mock<ISpaceRepository>();
        spaceRepositoryMock.Setup(repo => repo.GetAsync(spaceId)).ReturnsAsync(space);
        spaceRepositoryMock.Setup(repo => repo.DeleteAsync(space)).Returns(Task.CompletedTask);
        var handler = new SpaceHardDeleteCommandHandler(spaceRepositoryMock.Object);

        // ACT
        await handler.Handle(command, CancellationToken.None);

        // ASSERT
        spaceRepositoryMock.Verify(repo => repo.GetAsync(spaceId), Times.Once);
        spaceRepositoryMock.Verify(repo => repo.DeleteAsync(space), Times.Once);
    }

    [Fact]
    public async Task HandleAsync_WhenSpaceDoesNotExist_ThrowsSpaceNotFoundException()
    {
        // ASSERT
        var assignmentId = Guid.NewGuid();
        Space assignment = null;
        var command = new SpaceHardDeleteCommand(assignmentId);
        var assignmentRepositoryMock = new Mock<ISpaceRepository>();
        assignmentRepositoryMock.Setup(repo => repo.GetAsync(assignmentId)).ReturnsAsync(assignment);
        assignmentRepositoryMock.Setup(repo => repo.DeleteAsync(assignment)).Returns(Task.CompletedTask);
        var handler = new SpaceHardDeleteCommandHandler(assignmentRepositoryMock.Object);

        // ACT
        var exception = await Record.ExceptionAsync(() => handler.Handle(command, CancellationToken.None));

        // ASSERT
        exception.ShouldNotBeNull();
        exception.ShouldBeOfType<SpaceNotFoundException>();
        assignmentRepositoryMock.Verify(repo => repo.GetAsync(assignmentId), Times.Once);
        assignmentRepositoryMock.Verify(repo => repo.DeleteAsync(assignment), Times.Never);
    }
}