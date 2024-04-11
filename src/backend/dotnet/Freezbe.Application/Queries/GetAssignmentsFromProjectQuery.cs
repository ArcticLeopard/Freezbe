using Freezbe.Application.DataTransferObject;
using MediatR;

namespace Freezbe.Application.Queries;

public sealed record GetAssignmentsFromProjectQuery(Guid ProjectId) : IRequest<IEnumerable<AssignmentDto>>;