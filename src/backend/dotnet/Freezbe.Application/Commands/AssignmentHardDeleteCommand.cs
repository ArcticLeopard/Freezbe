using MediatR;

namespace Freezbe.Application.Commands;

public sealed record AssignmentHardDeleteCommand(Guid AssignmentId) : IRequest;