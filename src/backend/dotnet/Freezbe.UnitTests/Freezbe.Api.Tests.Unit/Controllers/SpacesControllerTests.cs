using Freezbe.Api.Controllers;
using Freezbe.Api.Requests;
using Freezbe.Application.Abstractions;
using Freezbe.Application.Commands;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace Freezbe.Api.Tests.Unit.Controllers;

public class SpacesControllerTests
{
    [Fact]
    public async Task Post_ValidRequest_ReturnsNoContent()
    {
        // ASSERT
        var commandHandlerMock = new Mock<ICommandHandler<SpaceCreateCommand>>();
        var controller = new SpacesController(commandHandlerMock.Object);
        var request = new SpaceCreateRequest("Test Description");

        // ACT
        var result = await controller.Post(request) as NoContentResult;

        // ASSERT
        Assert.NotNull(result);
        Assert.Equal(204, result.StatusCode);

        commandHandlerMock.Verify(ch => ch.HandleAsync(It.IsAny<SpaceCreateCommand>()), Times.Once);
    }
}