using MediatR;

namespace Freezbe.Application.Commands;

public sealed record ChangeDescriptionProjectCommand(Guid ProjectId, string Description) : IRequest;