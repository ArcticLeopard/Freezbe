using MediatR;

namespace Freezbe.Application.Commands;

public sealed record AssignmentCreateCommand(Guid AssignmentId, string Description, Guid ProjectId) : IRequest;