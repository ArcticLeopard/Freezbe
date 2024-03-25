using Freezbe.Application.Abstractions;

namespace Freezbe.Application.Commands;

public sealed record SpaceChangeDescriptionCommand(Guid Id, string Description) : ICommand;