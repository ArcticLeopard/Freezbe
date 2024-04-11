using Freezbe.Application.DataTransferObject;
using MediatR;

namespace Freezbe.Application.Queries;

public sealed record GetAssignmentQuery(Guid AssignmentId) : IRequest<AssignmentDto>;