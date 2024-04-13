using MediatR;

namespace Freezbe.Application.Commands;

public sealed record ChangeStatusProjectCommand(Guid ProjectId, string Status) : IRequest;