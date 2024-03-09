using Freezbe.Application.Abstractions;

namespace Freezbe.Application.Commands.Handlers;

public class SomeCommandHandler : ICommandHandler<SomeCommand>
{
    public Task HandleAsync(SomeCommand command)
    {
        throw new NotImplementedException();
    }
}