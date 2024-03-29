using MediatR;

namespace Freezbe.Application.Commands;

public sealed record AssignmentChangeDescriptionCommand(Guid AssignmentId, string Description) : IRequest;