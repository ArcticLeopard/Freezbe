using MediatR;

namespace Freezbe.Application.Commands;

public sealed record ProjectCreateCommand(Guid ProjectId, string Description, Guid SpaceId) : IRequest;