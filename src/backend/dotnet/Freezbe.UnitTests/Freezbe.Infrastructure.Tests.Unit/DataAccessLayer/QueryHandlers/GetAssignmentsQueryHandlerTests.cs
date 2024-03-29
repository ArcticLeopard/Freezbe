using Freezbe.Application.Queries;
using Freezbe.Core.Entities;
using Freezbe.Core.Repositories;
using Freezbe.Core.ValueObjects;
using Freezbe.Infrastructure.DataAccessLayer.QueryHandlers;
using Moq;
using Xunit;

namespace Freezbe.Infrastructure.Tests.Unit.DataAccessLayer.QueryHandlers;

public class GetAssignmentsQueryHandlerTests
{
    [Fact]
    public async Task Handle_ReturnsExpectedAssignments()
    {
        // ARRANGE
        var mockRepository = new Mock<IAssignmentRepository>();
        var projects = new List<Assignment>
        {
            new (Guid.NewGuid(), "Assignment 1"),
            new (Guid.NewGuid(), "Assignment 2"),
            new (Guid.NewGuid(), "Assignment 3")
        };
        mockRepository.Setup(p => p.GetAllByProjectIdAsync(It.IsAny<ProjectId>())).ReturnsAsync(projects);

        var handler = new GetAssignmentsForProjectQueryHandler(mockRepository.Object);
        var query = new GetAssignmentsForProjectQuery(Guid.NewGuid());

        // ACT
        var result = await handler.Handle(query, CancellationToken.None);

        // ASSERT
        Assert.NotNull(result);
        Assert.Equal(projects.Count, result.Count());
        Assert.True(result.All(dto => projects.Any(project => project.Id.Value == dto.Id && project.Description == dto.Description)));
    }
}