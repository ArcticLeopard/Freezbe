using MediatR;

namespace Freezbe.Application.Commands;

public sealed record ChangePriorityAssignmentCommand(Guid AssignmentId, bool Priority) : IRequest;