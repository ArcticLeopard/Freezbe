using MediatR;

namespace Freezbe.Application.Commands;

public sealed record ProjectChangeDescriptionCommand(Guid Id, string Description) : IRequest;