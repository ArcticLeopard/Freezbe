using MediatR;

namespace Freezbe.Application.Commands;

public sealed record ChangeDescriptionCommentCommand(Guid CommentId, string Description) : IRequest;