using Freezbe.Application.Queries;
using Freezbe.Core.Entities;
using Freezbe.Core.Repositories;
using Freezbe.Core.ValueObjects;
using Freezbe.Infrastructure.DataAccessLayer.QueryHandlers;
using Moq;
using Xunit;

namespace Freezbe.Infrastructure.Tests.Unit.DataAccessLayer.QueryHandlers;

public class GetAssignmentsForProjectQueryHandlerTests
{
    private readonly TimeProvider _fakeTimeProvider;

    public GetAssignmentsForProjectQueryHandlerTests()
    {
        _fakeTimeProvider = TestUtils.FakeTimeProvider();
    }

    [Fact]
    public async Task Handle_ReturnsExpectedAssignments()
    {
        // ARRANGE
        var mockRepository = new Mock<IAssignmentRepository>();
        var assignments = new List<Assignment>
        {
            new (Guid.NewGuid(), "Assignment 1", _fakeTimeProvider.GetUtcNow()),
            new (Guid.NewGuid(), "Assignment 2", _fakeTimeProvider.GetUtcNow()),
            new (Guid.NewGuid(), "Assignment 3", _fakeTimeProvider.GetUtcNow())
        };
        mockRepository.Setup(p => p.GetAllByProjectIdAsync(It.IsAny<ProjectId>())).ReturnsAsync(assignments);

        var handler = new GetAssignmentsForProjectQueryHandler(mockRepository.Object);
        var query = new GetAssignmentsForProjectQuery(Guid.NewGuid());

        // ACT
        var result = await handler.Handle(query, CancellationToken.None);

        // ASSERT
        Assert.NotNull(result);
        Assert.Equal(assignments.Count, result.Count());
        Assert.True(result.All(dto => assignments.Any(assignment => assignment.Id.Value == dto.Id && assignment.Description == dto.Description)));
    }
}