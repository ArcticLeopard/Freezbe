using Freezbe.Application.Abstractions;
using Freezbe.Application.Commands;

namespace Freezbe.Application.CommandHandlers;

public class SomeCommandHandler : ICommandHandler<SomeCommand>
{
    public Task HandleAsync(SomeCommand command)
    {
        throw new NotImplementedException();
    }
}