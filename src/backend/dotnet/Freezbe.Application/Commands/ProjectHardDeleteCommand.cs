using MediatR;

namespace Freezbe.Application.Commands;

public sealed record ProjectHardDeleteCommand(Guid ProjectId) : IRequest;