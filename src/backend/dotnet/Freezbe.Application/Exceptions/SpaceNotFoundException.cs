using Freezbe.Core.Exceptions;

namespace Freezbe.Application.Exceptions;

public sealed class SpaceNotFoundException : CustomException
{
    public Guid Id { get; }

    public SpaceNotFoundException(Guid id)
    : base($"Space with ID: {id} was not found.")
    {
        Id = id;
    }
}