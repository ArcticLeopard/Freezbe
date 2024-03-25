using Freezbe.Application.Abstractions;

namespace Freezbe.Application.Commands;

public sealed record SpaceCreateCommand(Guid Id, string Description) : ICommand;