using Freezbe.Application.DataTransferObject;
using MediatR;

namespace Freezbe.Application.Queries;

public sealed record GetCommentsFromAssignmentQuery(Guid AssignmentId) : IRequest<IEnumerable<CommentDto>>;