using MediatR;

namespace Freezbe.Application.Commands;

public sealed record CreateSpaceCommand(Guid SpaceId, string Description) : IRequest;