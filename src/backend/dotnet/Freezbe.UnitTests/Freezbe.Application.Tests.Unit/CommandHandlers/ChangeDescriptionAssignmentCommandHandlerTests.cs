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

public class ChangeDescriptionAssignmentCommandHandlerTests
{
    private readonly TimeProvider _fakeTimeProvider;

    public ChangeDescriptionAssignmentCommandHandlerTests()
    {
        _fakeTimeProvider = TestUtils.FakeTimeProvider();
    }

    [Fact]
    public async Task HandleAsync_ValidCommand_SuccessfullyChangesDescription()
    {
        // ASSERT
        var assignmentId = Guid.NewGuid();
        var newDescription = "New description";
        var assignment = new Assignment(assignmentId, "Old description", _fakeTimeProvider.GetUtcNow(), AssignmentStatus.Active, false, null);

        var assignmentRepositoryMock = new Mock<IAssignmentRepository>();
        assignmentRepositoryMock.Setup(p => p.GetAsync(assignmentId)).ReturnsAsync(assignment);

        var handler = new ChangeDescriptionAssignmentCommandHandler(assignmentRepositoryMock.Object);
        var command = new ChangeDescriptionAssignmentCommand(assignmentId, newDescription);

        // ACT
        await handler.Handle(command, CancellationToken.None);

        // ASSERT
        Assert.Equal(newDescription, assignment.Description);
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
        var handler = new ChangeDescriptionAssignmentCommandHandler(assignmentRepositoryMock.Object);
        var command = new ChangeDescriptionAssignmentCommand(Guid.NewGuid(), "Test description");

        //ACT
        var exception = await Record.ExceptionAsync(() => handler.Handle(command, CancellationToken.None));

        //ASSERT
        exception.ShouldNotBeNull();
        exception.ShouldBeOfType<AssignmentNotFoundException>();
    }
}