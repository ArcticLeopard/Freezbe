using MediatR;

namespace Freezbe.Application.Commands;

public sealed record SpaceHardDeleteCommand(Guid SpaceId) : IRequest;