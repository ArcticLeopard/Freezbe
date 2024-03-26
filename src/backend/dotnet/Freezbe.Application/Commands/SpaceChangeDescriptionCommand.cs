using MediatR;

namespace Freezbe.Application.Commands;

public sealed record SpaceChangeDescriptionCommand(Guid Id, string Description) : IRequest;