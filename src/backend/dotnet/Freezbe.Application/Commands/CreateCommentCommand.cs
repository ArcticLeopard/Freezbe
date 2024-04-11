using MediatR;

namespace Freezbe.Application.Commands;

public sealed record CreateCommentCommand(Guid CommentId, string Description, Guid AssignmentId) : IRequest;