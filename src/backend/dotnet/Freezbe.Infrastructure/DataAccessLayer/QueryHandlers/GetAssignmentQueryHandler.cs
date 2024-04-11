using Freezbe.Application.DataTransferObject;
using Freezbe.Application.Exceptions;
using Freezbe.Application.Queries;
using Freezbe.Core.Repositories;
using MediatR;

namespace Freezbe.Infrastructure.DataAccessLayer.QueryHandlers;

internal class GetAssignmentQueryHandler : IRequestHandler<GetAssignmentQuery, AssignmentDto>
{
    private readonly IAssignmentRepository _assignmentRepository;

    public GetAssignmentQueryHandler(IAssignmentRepository assignmentRepository)
    {
        _assignmentRepository = assignmentRepository;
    }

    public async Task<AssignmentDto> Handle(GetAssignmentQuery request, CancellationToken cancellationToken)
    {
        var assignment = await _assignmentRepository.GetAsync(request.AssignmentId);
        if(assignment is null)
        {
            throw new AssignmentNotFoundException(request.AssignmentId);
        }
        var result = new AssignmentDto(assignment.Id, assignment.Description);
        return result;
    }
}