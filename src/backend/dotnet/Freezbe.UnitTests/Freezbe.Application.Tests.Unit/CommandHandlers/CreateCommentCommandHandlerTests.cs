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

public class CreateCommentCommandHandlerTests
{
    private readonly TimeProvider _fakeTimeProvider;

    public CreateCommentCommandHandlerTests()
    {
        _fakeTimeProvider = TestUtils.FakeTimeProvider();
    }

    [Fact]
    public async Task HandleAsync_CommandWithExistingsAssignmentId_ShouldSuccessfullyAddsComment()
    {
        // ASSERT
        var assignmentRepositoryMock = new Mock<IAssignmentRepository>();
        var existingsAssignmentId = new AssignmentId(Guid.NewGuid());
        var assignment = new Assignment(Guid.NewGuid(),"Description", _fakeTimeProvider.GetUtcNow(), AssignmentStatus.Active, false, null);
        assignmentRepositoryMock.Setup(p => p.GetAsync(existingsAssignmentId)).ReturnsAsync(assignment); var handler = new CreateCommentCommandHandler(_fakeTimeProvider, assignmentRepositoryMock.Object);
        var command = new CreateCommentCommand(Guid.NewGuid(), "Test description", existingsAssignmentId);

        // ACT
        await handler.Handle(command, CancellationToken.None);

        // ASSERT
        assignmentRepositoryMock.Verify(p => p.GetAsync(It.IsAny<AssignmentId>()), Times.Once);
        assignmentRepositoryMock.Verify(p => p.UpdateAsync(It.IsAny<Assignment>()), Times.Once);
    }

    [Fact]
    public async Task HandleAsync_CommandWithNotExistingsAssignmentId_ShouldThrowAssignmentNotFoundException()
    {
        // ASSERT
        var assignmentRepositoryMock = new Mock<IAssignmentRepository>();
        var existingsAssignmentId = new AssignmentId(Guid.NewGuid());
        var assignment = new Assignment(Guid.NewGuid(),"Description", _fakeTimeProvider.GetUtcNow(), AssignmentStatus.Active, false, null);
        assignmentRepositoryMock.Setup(p => p.GetAsync(existingsAssignmentId)).ReturnsAsync(assignment);
        var handler = new CreateCommentCommandHandler(_fakeTimeProvider, assignmentRepositoryMock.Object);
        var command = new CreateCommentCommand(Guid.NewGuid(), "Test description", Guid.NewGuid());

        //ACT
        var exception = await Record.ExceptionAsync(() => handler.Handle(command, CancellationToken.None));

        //ASSERT
        exception.ShouldNotBeNull();
        exception.ShouldBeOfType<AssignmentNotFoundException>();
    }
}