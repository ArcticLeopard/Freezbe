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

public class ChangeDescriptionSpaceCommandHandlerTests
{
    private readonly TimeProvider _fakeTimeProvider;

    public ChangeDescriptionSpaceCommandHandlerTests()
    {
        _fakeTimeProvider = TestUtils.FakeTimeProvider();
    }

    [Fact]
    public async Task HandleAsync_ValidCommand_SuccessfullyChangesDescription()
    {
        // ASSERT
        var spaceId = Guid.NewGuid();
        var newDescription = "New description";
        var space = new Space(spaceId, "Old description", _fakeTimeProvider.GetUtcNow());

        var spaceRepositoryMock = new Mock<ISpaceRepository>();
        spaceRepositoryMock.Setup(p => p.GetAsync(spaceId)).ReturnsAsync(space);

        var handler = new ChangeDescriptionSpaceCommandHandler(spaceRepositoryMock.Object);
        var command = new ChangeDescriptionSpaceCommand(spaceId, newDescription);

        // ACT
        await handler.Handle(command, CancellationToken.None);

        // ASSERT
        Assert.Equal(newDescription, space.Description);
        spaceRepositoryMock.Verify(p => p.UpdateAsync(space), Times.Once);
    }

    [Fact]
    public async Task HandleAsync_CommandWithNotExistingsSpaceId_ShouldThrowSpaceNotFoundException()
    {
        // ASSERT
        var assignmentRepositoryMock = new Mock<ISpaceRepository>();
        var existingsSpaceId = new SpaceId(Guid.NewGuid());
        var assignment = new Space(Guid.NewGuid(),"Description", _fakeTimeProvider.GetUtcNow());
        assignmentRepositoryMock.Setup(p => p.GetAsync(existingsSpaceId)).ReturnsAsync(assignment);
        var handler = new ChangeDescriptionSpaceCommandHandler(assignmentRepositoryMock.Object);
        var command = new ChangeDescriptionSpaceCommand(Guid.NewGuid(), "Test description");

        //ACT
        var exception = await Record.ExceptionAsync(() => handler.Handle(command, CancellationToken.None));

        //ASSERT
        exception.ShouldNotBeNull();
        exception.ShouldBeOfType<SpaceNotFoundException>();
    }
}