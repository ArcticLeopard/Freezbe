using MediatR;

namespace Freezbe.Application.Commands;

public sealed record CommentCreateCommand(Guid CommentId, string Description, Guid AssignmentId) : IRequest;