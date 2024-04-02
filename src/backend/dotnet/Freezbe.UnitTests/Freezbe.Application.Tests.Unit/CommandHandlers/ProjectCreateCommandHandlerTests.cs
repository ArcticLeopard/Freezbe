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

public class ProjectCreateCommandHandlerTests
{
    private readonly TimeProvider _fakeTimeProvider;

    public ProjectCreateCommandHandlerTests()
    {
        _fakeTimeProvider = TestUtils.FakeTimeProvider();
    }

    [Fact]
    public async Task HandleAsync_CommandWithExistingsSpaceId_ShouldSuccessfullyAddsProject()
    {
        // ASSERT
        var spaceRepositoryMock = new Mock<ISpaceRepository>();
        var existingsSpaceId = new SpaceId(Guid.NewGuid());
        spaceRepositoryMock.Setup(p => p.GetAsync(existingsSpaceId)).ReturnsAsync(new Space(Guid.NewGuid(),"Description"));
        var handler = new ProjectCreateCommandHandler(_fakeTimeProvider, spaceRepositoryMock.Object);
        var command = new ProjectCreateCommand(Guid.NewGuid(), "Test description", existingsSpaceId);

        // ACT
        await handler.Handle(command, CancellationToken.None);

        // ASSERT
        spaceRepositoryMock.Verify(p => p.GetAsync(It.IsAny<SpaceId>()), Times.Once);
        spaceRepositoryMock.Verify(p => p.UpdateAsync(It.IsAny<Space>()), Times.Once);
    }

    [Fact]
    public async Task HandleAsync_CommandWithNotExistingsSpaceId_ShouldThrowSpaceNotFoundException()
    {
        // ASSERT
        var spaceRepositoryMock = new Mock<ISpaceRepository>();
        var existingsSpaceId = new SpaceId(Guid.NewGuid());
        spaceRepositoryMock.Setup(p => p.GetAsync(existingsSpaceId)).ReturnsAsync(new Space(Guid.NewGuid(),"Description"));
        var handler = new ProjectCreateCommandHandler(_fakeTimeProvider, spaceRepositoryMock.Object);
        var command = new ProjectCreateCommand(Guid.NewGuid(), "Test description", Guid.NewGuid());

        //ACT
        var exception = await Record.ExceptionAsync(() => handler.Handle(command, CancellationToken.None));

        //ASSERT
        exception.ShouldNotBeNull();
        exception.ShouldBeOfType<SpaceNotFoundException>();
    }
}