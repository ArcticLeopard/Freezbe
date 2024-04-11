using MediatR;

namespace Freezbe.Application.Commands;

public sealed record DeleteAssignmentCommand(Guid AssignmentId) : IRequest;