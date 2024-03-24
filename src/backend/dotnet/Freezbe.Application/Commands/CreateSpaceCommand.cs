using Freezbe.Application.Abstractions;

namespace Freezbe.Application.Commands;

public record CreateSpaceCommand(Guid Id, string Description) : ICommand;