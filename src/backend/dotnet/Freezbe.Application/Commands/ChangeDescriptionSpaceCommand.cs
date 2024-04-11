using MediatR;

namespace Freezbe.Application.Commands;

public sealed record ChangeDescriptionSpaceCommand(Guid SpaceId, string Description) : IRequest;