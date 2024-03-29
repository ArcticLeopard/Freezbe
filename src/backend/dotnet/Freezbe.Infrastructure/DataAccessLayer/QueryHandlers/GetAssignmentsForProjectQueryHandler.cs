using Freezbe.Application.DataTransferObject;
using Freezbe.Application.Queries;
using Freezbe.Core.Repositories;
using MediatR;

namespace Freezbe.Infrastructure.DataAccessLayer.QueryHandlers;

internal class GetAssignmentsForProjectQueryHandler : IRequestHandler<GetAssignmentsForProjectQuery, IEnumerable<AssignmentDto>>
{
    private readonly IAssignmentRepository _assignmentRepository;

    public GetAssignmentsForProjectQueryHandler(IAssignmentRepository assignmentRepository)
    {
        _assignmentRepository = assignmentRepository;
    }

    public async Task<IEnumerable<AssignmentDto>> Handle(GetAssignmentsForProjectQuery request, CancellationToken cancellationToken)
    {
        var assignments = await _assignmentRepository.GetAllByProjectIdAsync(request.ProjectId);
        var result = assignments.Select(p => new AssignmentDto(p.Id, p.Description));
        return result;
    }
}