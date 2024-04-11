using MediatR;

namespace Freezbe.Application.Commands;

public sealed record DeleteSpaceCommand(Guid SpaceId) : IRequest;