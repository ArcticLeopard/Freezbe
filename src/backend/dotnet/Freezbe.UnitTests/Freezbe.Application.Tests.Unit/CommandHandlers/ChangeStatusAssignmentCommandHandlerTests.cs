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

public class ChangeStatusAssignmentCommandHandlerTests
{
    private readonly TimeProvider _fakeTimeProvider;

    public ChangeStatusAssignmentCommandHandlerTests()
    {
        _fakeTimeProvider = TestUtils.FakeTimeProvider();
    }

    [Fact]
    public async Task HandleAsync_ValidCommand_SuccessfullyChangesDescription()
    {
        // ASSERT
        var assignmentId = Guid.NewGuid();
        var assignment = new Assignment(assignmentId, "Old description", _fakeTimeProvider.GetUtcNow(), AssignmentStatus.Active, false, null);

        var assignmentRepositoryMock = new Mock<IAssignmentRepository>();
        assignmentRepositoryMock.Setup(p => p.GetAsync(assignmentId)).ReturnsAsync(assignment);

        var handler = new ChangeStatusAssignmentCommandHandler(assignmentRepositoryMock.Object);
        var command = new ChangeStatusAssignmentCommand(assignmentId, AssignmentStatus.Abandon);

        // ACT
        await handler.Handle(command, CancellationToken.None);

        // ASSERT
        Assert.Equal(AssignmentStatus.Abandon, assignment.AssignmentStatus);
        assignmentRepositoryMock.Verify(p => p.UpdateAsync(assignment), Times.Once);
    }

    [Fact]
    public async Task HandleAsync_CommandWithNotExistingsAssignmentId_ShouldThrowAssignmentNotFoundException()
    {
        // ASSERT
        var assignmentRepositoryMock = new Mock<IAssignmentRepository>();
        var existingsAssignmentId = new AssignmentId(Guid.NewGuid());
        var assignment = new Assignment(Guid.NewGuid(),"Description", _fakeTimeProvider.GetUtcNow(), AssignmentStatus.Active, false, null);
        assignmentRepositoryMock.Setup(p => p.GetAsync(existingsAssignmentId)).ReturnsAsync(assignment);
        var handler = new ChangeStatusAssignmentCommandHandler(assignmentRepositoryMock.Object);
        var command = new ChangeStatusAssignmentCommand(Guid.NewGuid(), "Test description");

        //ACT
        var exception = await Record.ExceptionAsync(() => handler.Handle(command, CancellationToken.None));

        //ASSERT
        exception.ShouldNotBeNull();
        exception.ShouldBeOfType<AssignmentNotFoundException>();
    }
}