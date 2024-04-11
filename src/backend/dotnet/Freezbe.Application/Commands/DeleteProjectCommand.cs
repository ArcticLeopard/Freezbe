using MediatR;

namespace Freezbe.Application.Commands;

public sealed record DeleteProjectCommand(Guid ProjectId) : IRequest;