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

public class DeleteAssignmentCommandHandlerTests
{
    private readonly TimeProvider _fakeTimeProvider;

    public DeleteAssignmentCommandHandlerTests()
    {
        _fakeTimeProvider = TestUtils.FakeTimeProvider();
    }

    [Fact]
    public async Task HandleAsync_ValidCommand_SuccessfullyDeleteAssignment()
    {
        // ASSERT
        var assignmentId = Guid.NewGuid();
        var createdAt = _fakeTimeProvider.GetUtcNow();
        var assignment = new Assignment(assignmentId, "Description", createdAt, AssignmentStatus.Active);
        var command = new DeleteAssignmentCommand(assignmentId);
        var assignmentRepositoryMock = new Mock<IAssignmentRepository>();
        assignmentRepositoryMock.Setup(repo => repo.GetAsync(assignmentId)).ReturnsAsync(assignment);
        assignmentRepositoryMock.Setup(repo => repo.DeleteAsync(assignment)).Returns(Task.CompletedTask);
        var handler = new DeleteAssignmentCommandHandler(assignmentRepositoryMock.Object);

        // ACT
        await handler.Handle(command, CancellationToken.None);

        // ASSERT
        assignmentRepositoryMock.Verify(repo => repo.GetAsync(assignmentId), Times.Once);
        assignmentRepositoryMock.Verify(repo => repo.DeleteAsync(assignment), Times.Once);
    }

    [Fact]
    public async Task HandleAsync_WhenAssignmentDoesNotExist_ThrowsAssignmentNotFoundException()
    {
        // ASSERT
        var assignmentId = Guid.NewGuid();
        Assignment assignment = null;
        var command = new DeleteAssignmentCommand(assignmentId);
        var assignmentRepositoryMock = new Mock<IAssignmentRepository>();
        assignmentRepositoryMock.Setup(repo => repo.GetAsync(assignmentId)).ReturnsAsync(assignment);
        assignmentRepositoryMock.Setup(repo => repo.DeleteAsync(assignment)).Returns(Task.CompletedTask);
        var handler = new DeleteAssignmentCommandHandler(assignmentRepositoryMock.Object);

        // ACT
        var exception = await Record.ExceptionAsync(() => handler.Handle(command, CancellationToken.None));

        // ASSERT
        exception.ShouldNotBeNull();
        exception.ShouldBeOfType<AssignmentNotFoundException>();
        assignmentRepositoryMock.Verify(repo => repo.GetAsync(assignmentId), Times.Once);
        assignmentRepositoryMock.Verify(repo => repo.DeleteAsync(assignment), Times.Never);
    }
}