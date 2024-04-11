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
        .Setup(m => m.Send(It.IsAny<GetProjectQuery>(), It.IsAny<CancellationToken>()))
        .ReturnsAsync(new ProjectDto(Guid.NewGuid(), "Description"));

        var controller = new ProjectsController(commandHandlerMock.Object);

        // ACT
        var result = await controller.Get(Guid.NewGuid());

        // ASSERT
        Assert.NotNull(result);

        commandHandlerMock.Verify(ch => ch.Send(It.IsAny<GetProjectQuery>(), It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task GetAssignments_ShouldReturnReponse()
    {
        // ASSERT
        var commandHandlerMock = new Mock<IMediator>();
        commandHandlerMock
        .Setup(m => m.Send(It.IsAny<GetAssignmentsFromProjectQuery>(), It.IsAny<CancellationToken>()))
        .ReturnsAsync(new List<AssignmentDto>()
        {
            new (Guid.NewGuid(), "Description"),
            new (Guid.NewGuid(), "Description")
        });

        var controller = new ProjectsController(commandHandlerMock.Object);

        // ACT
        var result = TestUtils.GetValueFromController(await controller.GetAssignments(Guid.NewGuid()));

        // ASSERT
        Assert.Equal(2, result.Count());

        commandHandlerMock.Verify(ch => ch.Send(It.IsAny<GetAssignmentsFromProjectQuery>(), It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task Post_ValidRequest_ReturnsNoContent()
    {
        // ASSERT
        var commandHandlerMock = new Mock<IMediator>();

        var controller = new ProjectsController(commandHandlerMock.Object);
        var request = new CreateProjectRequest("Test Description", Guid.NewGuid());

        // ACT
        var result = await controller.Post(request) as NoContentResult;

        // ASSERT
        Assert.NotNull(result);
        Assert.Equal(204, result.StatusCode);

        commandHandlerMock.Verify(ch => ch.Send(It.IsAny<CreateProjectCommand>(), It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task Delete_ValidRequest_ReturnsNoContent()
    {
        // ASSERT
        var commandHandlerMock = new Mock<IMediator>();

        var controller = new ProjectsController(commandHandlerMock.Object);
        var request = new DeleteProjectRequest(Guid.NewGuid());

        // ACT
        var result = await controller.Delete(request) as NoContentResult;

        // ASSERT
        Assert.NotNull(result);
        Assert.Equal(204, result.StatusCode);

        commandHandlerMock.Verify(ch => ch.Send(It.IsAny<DeleteProjectCommand>(), It.IsAny<CancellationToken>()), Times.Once);
    }
}