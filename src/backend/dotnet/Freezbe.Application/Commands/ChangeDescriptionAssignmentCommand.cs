using MediatR;

namespace Freezbe.Application.Commands;

public sealed record ChangeDescriptionAssignmentCommand(Guid AssignmentId, string Description) : IRequest;