using MediatR;

namespace Freezbe.Application.Commands;

public sealed record ProjectChangeDescriptionCommand(Guid ProjectId, string Description) : IRequest;