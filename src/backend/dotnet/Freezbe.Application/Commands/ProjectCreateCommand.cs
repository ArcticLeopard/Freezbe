using MediatR;

namespace Freezbe.Application.Commands;

public sealed record ProjectCreateCommand(Guid Id, string Description, Guid SpaceId) : IRequest;