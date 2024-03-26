using MediatR;

namespace Freezbe.Application.Commands;

public sealed record SpaceCreateCommand(Guid Id, string Description) : IRequest;