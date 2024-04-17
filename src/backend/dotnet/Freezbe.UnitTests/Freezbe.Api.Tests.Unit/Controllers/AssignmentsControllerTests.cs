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
    public async Task Create_ValidRequest_ReturnsNoContent()
    {
        // ASSERT
        var commandHandlerMock = new Mock<IMediator>();

        var controller = new AssignmentsController(commandHandlerMock.Object);
        var request = new CreateAssignmentRequest("Test Description", false, Guid.NewGuid());

        // ACT
        var result = await controller.Create(request) as NoContentResult;

        // ASSERT
        Assert.NotNull(result);
        Assert.Equal(204, result.StatusCode);

        commandHandlerMock.Verify(ch => ch.Send(It.IsAny<CreateAssignmentCommand>(), It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task ChangeDescription_ValidRequest_ReturnsNoContent()
    {
        // ASSERT
        var commandHandlerMock = new Mock<IMediator>();

        var controller = new AssignmentsController(commandHandlerMock.Object);
        var request = new ChangeDescriptionAssignmentRequest("Test Description");

        // ACT
        var result = await controller.ChangeDescription(Guid.NewGuid(), request) as NoContentResult;

        // ASSERT
        Assert.NotNull(result);
        Assert.Equal(204, result.StatusCode);

        commandHandlerMock.Verify(ch => ch.Send(It.IsAny<ChangeDescriptionAssignmentCommand>(), It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task ChangeStatusToActive_ValidRequest_ReturnsNoContent()
    {
        // ASSERT
        var commandHandlerMock = new Mock<IMediator>();

        var controller = new AssignmentsController(commandHandlerMock.Object);

        // ACT
        var result = await controller.ChangeStatusToActive(Guid.NewGuid()) as NoContentResult;

        // ASSERT
        Assert.NotNull(result);
        Assert.Equal(204, result.StatusCode);

        commandHandlerMock.Verify(ch => ch.Send(It.IsAny<ChangeStatusAssignmentCommand>(), It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task ChangeStatusToAbandon_ValidRequest_ReturnsNoContent()
    {
        // ASSERT
        var commandHandlerMock = new Mock<IMediator>();

        var controller = new AssignmentsController(commandHandlerMock.Object);

        // ACT
        var result = await controller.ChangeStatusToAbandon(Guid.NewGuid()) as NoContentResult;

        // ASSERT
        Assert.NotNull(result);
        Assert.Equal(204, result.StatusCode);

        commandHandlerMock.Verify(ch => ch.Send(It.IsAny<ChangeStatusAssignmentCommand>(), It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task ChangeStatusToComplited_ValidRequest_ReturnsNoContent()
    {
        // ASSERT
        var commandHandlerMock = new Mock<IMediator>();

        var controller = new AssignmentsController(commandHandlerMock.Object);

        // ACT
        var result = await controller.ChangeStatusToComplited(Guid.NewGuid()) as NoContentResult;

        // ASSERT
        Assert.NotNull(result);
        Assert.Equal(204, result.StatusCode);

        commandHandlerMock.Verify(ch => ch.Send(It.IsAny<ChangeStatusAssignmentCommand>(), It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task ChangePriority_ValidRequest_ReturnsNoContent()
    {
        // ASSERT
        var commandHandlerMock = new Mock<IMediator>();

        var controller = new AssignmentsController(commandHandlerMock.Object);

        // ACT
        var result = await controller.ChangePriority(Guid.NewGuid(), false) as NoContentResult;

        // ASSERT
        Assert.NotNull(result);
        Assert.Equal(204, result.StatusCode);

        commandHandlerMock.Verify(ch => ch.Send(It.IsAny<ChangePriorityAssignmentCommand>(), It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task Delete_ValidRequest_ReturnsNoContent()
    {
        // ASSERT
        var commandHandlerMock = new Mock<IMediator>();

        var controller = new AssignmentsController(commandHandlerMock.Object);
        var request = Guid.NewGuid();

        // ACT
        var result = await controller.Delete(request) as NoContentResult;

        // ASSERT
        Assert.NotNull(result);
        Assert.Equal(204, result.StatusCode);

        commandHandlerMock.Verify(ch => ch.Send(It.IsAny<DeleteAssignmentCommand>(), It.IsAny<CancellationToken>()), Times.Once);
    }
}