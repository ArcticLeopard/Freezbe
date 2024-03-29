using Freezbe.Application.DataTransferObject;
using MediatR;

namespace Freezbe.Application.Queries;

public sealed record GetAssignmentsForProjectQuery(Guid ProjectId) : IRequest<IEnumerable<AssignmentDto>>;