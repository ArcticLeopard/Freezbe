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

public class AssignmentsControllerTests
{
    [Fact]
    public async Task Get_ShouldReturnReponse()
    {
        // ASSERT
        var commandHandlerMock = new Mock<IMediator>();
        commandHandlerMock
        .Setup(m => m.Send(It.IsAny<GetAssignmentQuery>(), It.IsAny<CancellationToken>()))
        .ReturnsAsync(new AssignmentDto(Guid.NewGuid(), "Description"));

        var controller = new AssignmentsController(commandHandlerMock.Object);

        // ACT
        var result = await controller.Get(Guid.NewGuid());

        // ASSERT
        Assert.NotNull(result);

        commandHandlerMock.Verify(ch => ch.Send(It.IsAny<GetAssignmentQuery>(), It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task GetComments_ShouldReturnReponse()
    {
        // ASSERT
        var commandHandlerMock = new Mock<IMediator>();
        commandHandlerMock
        .Setup(m => m.Send(It.IsAny<GetCommentsFromAssignmentQuery>(), It.IsAny<CancellationToken>()))
        .ReturnsAsync(new List<CommentDto>()
        {
            new (Guid.NewGuid(), "Description"),
            new (Guid.NewGuid(), "Description")
        });

        var controller = new AssignmentsController(commandHandlerMock.Object);

        // ACT
        var result = TestUtils.GetValueFromController(await controller.GetComments(Guid.NewGuid()));

        // ASSERT
        Assert.Equal(2, result.Count());

        commandHandlerMock.Verify(ch => ch.Send(It.IsAny<GetCommentsFromAssignmentQuery>(), It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task Post_ValidRequest_ReturnsNoContent()
    {
        // ASSERT
        var commandHandlerMock = new Mock<IMediator>();

        var controller = new AssignmentsController(commandHandlerMock.Object);
        var request = new CreateAssignmentRequest("Test Description", Guid.NewGuid());

        // ACT
        var result = await controller.Post(request) as NoContentResult;

        // ASSERT
        Assert.NotNull(result);
        Assert.Equal(204, result.StatusCode);

        commandHandlerMock.Verify(ch => ch.Send(It.IsAny<CreateAssignmentCommand>(), It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task Delete_ValidRequest_ReturnsNoContent()
    {
        // ASSERT
        var commandHandlerMock = new Mock<IMediator>();

        var controller = new AssignmentsController(commandHandlerMock.Object);
        var request = new DeleteAssignmentRequest(Guid.NewGuid());

        // ACT
        var result = await controller.Delete(request) as NoContentResult;

        // ASSERT
        Assert.NotNull(result);
        Assert.Equal(204, result.StatusCode);

        commandHandlerMock.Verify(ch => ch.Send(It.IsAny<DeleteAssignmentCommand>(), It.IsAny<CancellationToken>()), Times.Once);
    }
}