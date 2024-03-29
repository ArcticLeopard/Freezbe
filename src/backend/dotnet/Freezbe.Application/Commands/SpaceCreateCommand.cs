using MediatR;

namespace Freezbe.Application.Commands;

public sealed record SpaceCreateCommand(Guid SpaceId, string Description) : IRequest;