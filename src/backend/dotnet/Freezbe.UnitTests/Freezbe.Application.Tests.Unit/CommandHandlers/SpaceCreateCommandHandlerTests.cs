using Freezbe.Application.CommandHandlers;
using Freezbe.Application.Commands;
using Freezbe.Core.Entities;
using Freezbe.Core.Repositories;
using Moq;
using Xunit;

namespace Freezbe.Application.Tests.Unit.CommandHandlers;

public class SpaceCreateCommandHandlerTests
{
    [Fact]
    public async Task HandleAsync_ValidCommand_SuccessfullyAddsSpace()
    {
        // ASSERT
        var spaceId = Guid.NewGuid();
        var description = "Test description";

        var spaceRepositoryMock = new Mock<ISpaceRepository>();
        var handler = new SpaceCreateCommandHandler(spaceRepositoryMock.Object);
        var command = new SpaceCreateCommand(spaceId, description);

        // ACT
        await handler.Handle(command, CancellationToken.None);

        // ASSERT
        spaceRepositoryMock.Verify(p => p.AddAsync(It.IsAny<Space>()), Times.Once);
    }
}