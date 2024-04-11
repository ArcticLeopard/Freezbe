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

public class CommentsControllerTests
{
    [Fact]
    public async Task Get_ShouldReturnReponse()
    {
        // ASSERT
        var commandHandlerMock = new Mock<IMediator>();
        commandHandlerMock
        .Setup(m => m.Send(It.IsAny<GetCommentQuery>(), It.IsAny<CancellationToken>()))
        .ReturnsAsync(new CommentDto(Guid.NewGuid(), "Description"));

        var controller = new CommentsController(commandHandlerMock.Object);

        // ACT
        var result = await controller.Get(Guid.NewGuid());

        // ASSERT
        Assert.NotNull(result);

        commandHandlerMock.Verify(ch => ch.Send(It.IsAny<GetCommentQuery>(), It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task Post_ValidRequest_ReturnsNoContent()
    {
        // ASSERT
        var commandHandlerMock = new Mock<IMediator>();

        var controller = new CommentsController(commandHandlerMock.Object);
        var request = new CreateCommentRequest("Test Description", Guid.NewGuid());

        // ACT
        var result = await controller.Post(request) as NoContentResult;

        // ASSERT
        Assert.NotNull(result);
        Assert.Equal(204, result.StatusCode);

        commandHandlerMock.Verify(ch => ch.Send(It.IsAny<CreateCommentCommand>(), It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task Delete_ValidRequest_ReturnsNoContent()
    {
        // ASSERT
        var commandHandlerMock = new Mock<IMediator>();

        var controller = new CommentsController(commandHandlerMock.Object);
        var request = new DeleteCommentRequest(Guid.NewGuid());

        // ACT
        var result = await controller.Delete(request) as NoContentResult;

        // ASSERT
        Assert.NotNull(result);
        Assert.Equal(204, result.StatusCode);

        commandHandlerMock.Verify(ch => ch.Send(It.IsAny<DeleteCommentCommand>(), It.IsAny<CancellationToken>()), Times.Once);
    }
}