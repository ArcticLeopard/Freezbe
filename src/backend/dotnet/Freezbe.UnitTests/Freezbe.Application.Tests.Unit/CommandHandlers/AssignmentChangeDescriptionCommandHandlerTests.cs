using Freezbe.Application.CommandHandlers;
using Freezbe.Application.Commands;
using Freezbe.Core.Entities;
using Freezbe.Core.Repositories;
using Freezbe.Core.ValueObjects;
using Moq;
using Xunit;

namespace Freezbe.Application.Tests.Unit.CommandHandlers;

public class AssignmentChangeDescriptionCommandHandlerTests
{
    private readonly TimeProvider _fakeTimeProvider;

    public AssignmentChangeDescriptionCommandHandlerTests()
    {
        _fakeTimeProvider = TestUtils.FakeTimeProvider();
    }

    [Fact]
    public async Task HandleAsync_ValidCommand_SuccessfullyChangesDescription()
    {
        // ASSERT
        var assignmentId = Guid.NewGuid();
        var newDescription = "New description";
        var assignment = new Assignment(assignmentId, "Old description", _fakeTimeProvider.GetUtcNow(), AssignmentStatus.Active);

        var assignmentRepositoryMock = new Mock<IAssignmentRepository>();
        assignmentRepositoryMock.Setup(p => p.GetAsync(assignmentId)).ReturnsAsync(assignment);

        var handler = new AssignmentChangeDescriptionCommandHandler(assignmentRepositoryMock.Object);
        var command = new AssignmentChangeDescriptionCommand(assignmentId, newDescription);

        // ACT
        await handler.Handle(command, CancellationToken.None);

        // ASSERT
        Assert.Equal(newDescription, assignment.Description);
        assignmentRepositoryMock.Verify(p => p.UpdateAsync(assignment), Times.Once);
    }
}