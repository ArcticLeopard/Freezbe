using MediatR;

namespace Freezbe.Application.Commands;

public sealed record DeleteCommentCommand(Guid CommentId) : IRequest;