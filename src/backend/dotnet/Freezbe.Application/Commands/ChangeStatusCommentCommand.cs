using MediatR;

namespace Freezbe.Application.Commands;

public sealed record ChangeStatusCommentCommand(Guid CommentId, string Status) : IRequest;