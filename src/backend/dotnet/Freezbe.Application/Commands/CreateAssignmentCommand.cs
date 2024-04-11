using MediatR;

namespace Freezbe.Application.Commands;

public sealed record CreateAssignmentCommand(Guid AssignmentId, string Description, Guid ProjectId) : IRequest;