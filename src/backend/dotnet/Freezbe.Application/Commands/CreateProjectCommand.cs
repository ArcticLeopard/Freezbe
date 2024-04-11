using MediatR;

namespace Freezbe.Application.Commands;

public sealed record CreateProjectCommand(Guid ProjectId, string Description, Guid SpaceId) : IRequest;