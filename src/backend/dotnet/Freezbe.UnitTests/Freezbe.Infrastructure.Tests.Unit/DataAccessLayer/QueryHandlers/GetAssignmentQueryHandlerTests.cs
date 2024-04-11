using Freezbe.Application.Exceptions;
using Freezbe.Application.Queries;
using Freezbe.Core.Entities;
using Freezbe.Core.Repositories;
using Freezbe.Core.ValueObjects;
using Freezbe.Infrastructure.DataAccessLayer.QueryHandlers;
using Moq;
using Shouldly;
using Xunit;

namespace Freezbe.Infrastructure.Tests.Unit.DataAccessLayer.QueryHandlers;

public class GetAssignmentQueryHandlerTests
{
    private readonly TimeProvider _fakeTimeProvider;

    public GetAssignmentQueryHandlerTests()
    {
        _fakeTimeProvider = TestUtils.FakeTimeProvider();
    }

    [Fact]
    public async Task Handle_ValidAssignmentId_ReturnsAssignmentDto()
    {
        // ARRANGE
        var assignmentId = Guid.NewGuid();
        var createdAt = _fakeTimeProvider.GetUtcNow();
        var assignment = new Assignment(assignmentId, "Description", createdAt, AssignmentStatus.Active);

        var mockAssignmentRepository = new Mock<IAssignmentRepository>();
        mockAssignmentRepository.Setup(repo => repo.GetAsync(assignmentId)).ReturnsAsync(assignment);

        var handler = new GetAssignmentQueryHandler(mockAssignmentRepository.Object);
        var query = new GetAssignmentQuery(assignmentId);

        // ACT
        var result = await handler.Handle(query, CancellationToken.None);

        // ASSERT
        Assert.NotNull(result);
        Assert.Equal(assignmentId, result.Id);
        Assert.Equal(assignment.Description, result.Description);
    }

    [Fact]
    public async Task Handle_InvalidAssignmentId_ThrowsAssignmentNotFoundException()
    {
        // ARRANGE
        var assignmentId = Guid.NewGuid();

        var mockAssignmentRepository = new Mock<IAssignmentRepository>();
        mockAssignmentRepository.Setup(repo => repo.GetAsync(assignmentId)).ReturnsAsync((Assignment)null);

        var handler = new GetAssignmentQueryHandler(mockAssignmentRepository.Object);
        var query = new GetAssignmentQuery(assignmentId);

        //ACT
        var exception = await Record.ExceptionAsync(() => handler.Handle(query, CancellationToken.None));

        //ASSERT
        exception.ShouldNotBeNull();
        exception.ShouldBeOfType<AssignmentNotFoundException>();
    }
}