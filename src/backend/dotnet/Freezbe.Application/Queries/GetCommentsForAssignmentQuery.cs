using Freezbe.Application.DataTransferObject;
using MediatR;

namespace Freezbe.Application.Queries;

public sealed record GetCommentsForAssignmentQuery(Guid AssignmentId) : IRequest<IEnumerable<CommentDto>>;