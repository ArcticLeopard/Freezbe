using Freezbe.Application.CommandHandlers;
using Freezbe.Application.Commands;
using Freezbe.Core.Entities;
using Freezbe.Core.Repositories;
using Moq;
using Xunit;

namespace Freezbe.Application.Tests.Unit.CommandHandlers;

public class SpaceChangeDescriptionCommandHandlerTests
{
    private readonly TimeProvider _fakeTimeProvider;

    public SpaceChangeDescriptionCommandHandlerTests()
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

        var handler = new SpaceChangeDescriptionCommandHandler(spaceRepositoryMock.Object);
        var command = new SpaceChangeDescriptionCommand(spaceId, newDescription);

        // ACT
        await handler.Handle(command, CancellationToken.None);

        // ASSERT
        Assert.Equal(newDescription, space.Description);
        spaceRepositoryMock.Verify(p => p.UpdateAsync(space), Times.Once);
    }
}