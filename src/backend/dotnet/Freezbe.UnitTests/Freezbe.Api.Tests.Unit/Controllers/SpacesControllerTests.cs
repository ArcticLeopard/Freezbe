using Freezbe.Api.Controllers;
using Freezbe.Api.Requests;
using Freezbe.Application.Commands;
using Freezbe.Application.DataTransferObject;
using Freezbe.Application.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace Freezbe.Api.Tests.Unit.Controllers;

public class SpacesControllerTests
{
    [Fact]
    public async Task Get_ShouldReturnReponse()
    {
        // ASSERT
        var commandHandlerMock = new Mock<IMediator>();
        commandHandlerMock
        .Setup(m => m.Send(It.IsAny<GetSpacesQuery>(), It.IsAny<CancellationToken>()))
        .ReturnsAsync(new List<SpaceDto>()
        {
            new SpaceDto(Guid.NewGuid(), "Description"),
            new SpaceDto(Guid.NewGuid(), "Description")
        });

        var controller = new SpacesController(commandHandlerMock.Object);

        // ACT
        var result = TestUtils.GetValueFromController(await controller.Get());

        // ASSERT
        Assert.Equal(2, result.Count());

        commandHandlerMock.Verify(ch => ch.Send(It.IsAny<GetSpacesQuery>(), It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task Delete_ValidRequest_ReturnsNoContent()
    {
        // ASSERT
        var commandHandlerMock = new Mock<IMediator>();

        var controller = new SpacesController(commandHandlerMock.Object);
        var request = new SpaceDeleteRequest(Guid.NewGuid());

        // ACT
        var result = await controller.Delete(request) as NoContentResult;

        // ASSERT
        Assert.NotNull(result);
        Assert.Equal(204, result.StatusCode);

        commandHandlerMock.Verify(ch => ch.Send(It.IsAny<SpaceHardDeleteCommand>(), It.IsAny<CancellationToken>()), Times.Once);
    }
}