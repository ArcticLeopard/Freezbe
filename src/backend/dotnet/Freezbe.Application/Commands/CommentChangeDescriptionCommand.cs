using MediatR;

namespace Freezbe.Application.Commands;

public sealed record CommentChangeDescriptionCommand(Guid CommentId, string Description) : IRequest;