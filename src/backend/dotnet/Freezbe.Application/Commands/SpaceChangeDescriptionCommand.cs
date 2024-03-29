using MediatR;

namespace Freezbe.Application.Commands;

public sealed record SpaceChangeDescriptionCommand(Guid SpaceId, string Description) : IRequest;