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

public class ChangePriorityAssignmentCommandHandlerTests
{
    private readonly TimeProvider _fakeTimeProvider;

    public ChangePriorityAssignmentCommandHandlerTests()
    {
        _fakeTimeProvider = TestUtils.FakeTimeProvider();
    }

    [Theory]
    [InlineData(true)]
    [InlineData(false)]
    public async Task HandleAsync_ValidCommand_SuccessfullyChangesPriority(bool priority)
    {
        // ASSERT
        var assignmentId = Guid.NewGuid();
        var assignment = new Assignment(assignmentId, "Description", _fakeTimeProvider.GetUtcNow(), AssignmentStatus.Active, false, null);

        var assignmentRepositoryMock = new Mock<IAssignmentRepository>();
        assignmentRepositoryMock.Setup(p => p.GetAsync(assignmentId)).ReturnsAsync(assignment);

        var handler = new ChangePriorityAssignmentCommandHandler(assignmentRepositoryMock.Object);
        var command = new ChangePriorityAssignmentCommand(assignmentId, priority);

        // ACT
        await handler.Handle(command, CancellationToken.None);

        // ASSERT
        Assert.Equal(priority, assignment.Priority);
        assignmentRepositoryMock.Verify(p => p.UpdateAsync(assignment), Times.Once);
    }

    [Theory]
    [InlineData(true)]
    [InlineData(false)]
    public async Task HandleAsync_CommandWithNotExistingsAssignmentId_ShouldThrowAssignmentNotFoundException(bool priority)
    {
        // ASSERT
        var assignmentRepositoryMock = new Mock<IAssignmentRepository>();
        var existingsAssignmentId = new AssignmentId(Guid.NewGuid());
        var assignment = new Assignment(Guid.NewGuid(),"Description", _fakeTimeProvider.GetUtcNow(), AssignmentStatus.Active, false, null);
        assignmentRepositoryMock.Setup(p => p.GetAsync(existingsAssignmentId)).ReturnsAsync(assignment);
        var handler = new ChangePriorityAssignmentCommandHandler(assignmentRepositoryMock.Object);
        var command = new ChangePriorityAssignmentCommand(Guid.NewGuid(), priority);

        //ACT
        var exception = await Record.ExceptionAsync(() => handler.Handle(command, CancellationToken.None));

        //ASSERT
        exception.ShouldNotBeNull();
        exception.ShouldBeOfType<AssignmentNotFoundException>();
    }
}