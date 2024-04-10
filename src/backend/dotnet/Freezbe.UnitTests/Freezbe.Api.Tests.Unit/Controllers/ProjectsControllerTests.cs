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

public class ProjectsControllerTests
{
    [Fact]
    public async Task Get_ShouldReturnReponse()
    {
        // ASSERT
        var commandHandlerMock = new Mock<IMediator>();
        commandHandlerMock
        .Setup(m => m.Send(It.IsAny<GetProjectsForSpaceQuery>(), It.IsAny<CancellationToken>()))
        .ReturnsAsync(new List<ProjectDto>()
        {
            new (Guid.NewGuid(), "Description"),
            new (Guid.NewGuid(), "Description")
        });

        var controller = new ProjectsController(commandHandlerMock.Object);

        // ACT
        var result = TestUtils.GetValueFromController(await controller.Get(Guid.NewGuid()));

        // ASSERT
        Assert.Equal(2, result.Count());

        commandHandlerMock.Verify(ch => ch.Send(It.IsAny<GetProjectsForSpaceQuery>(), It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task Post_ValidRequest_ReturnsNoContent()
    {
        // ASSERT
        var commandHandlerMock = new Mock<IMediator>();

        var controller = new ProjectsController(commandHandlerMock.Object);
        var request = new ProjectCreateRequest("Test Description");

        // ACT
        var result = await controller.Post(Guid.NewGuid(), request) as NoContentResult;

        // ASSERT
        Assert.NotNull(result);
        Assert.Equal(204, result.StatusCode);

        commandHandlerMock.Verify(ch => ch.Send(It.IsAny<ProjectCreateCommand>(), It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task Delete_ValidRequest_ReturnsNoContent()
    {
        // ASSERT
        var commandHandlerMock = new Mock<IMediator>();

        var controller = new ProjectsController(commandHandlerMock.Object);
        var request = new ProjectDeleteRequest(Guid.NewGuid());

        // ACT
        var result = await controller.Delete(request) as NoContentResult;

        // ASSERT
        Assert.NotNull(result);
        Assert.Equal(204, result.StatusCode);

        commandHandlerMock.Verify(ch => ch.Send(It.IsAny<ProjectHardDeleteCommand>(), It.IsAny<CancellationToken>()), Times.Once);
    }
}