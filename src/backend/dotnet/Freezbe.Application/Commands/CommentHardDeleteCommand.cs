using MediatR;

namespace Freezbe.Application.Commands;

public sealed record CommentHardDeleteCommand(Guid CommentId) : IRequest;