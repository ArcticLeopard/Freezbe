using MediatR;

namespace Freezbe.Application.Commands;

public sealed record ChangeStatusAssignmentCommand(Guid AssignmentId, string Status) : IRequest;