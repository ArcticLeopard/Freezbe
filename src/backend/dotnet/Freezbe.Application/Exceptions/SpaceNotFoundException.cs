using Freezbe.Core.Exceptions;

namespace Freezbe.Application.Exceptions;

public sealed class SpaceNotFoundException : CustomException
{
    public Guid SpaceId { get; }

    public SpaceNotFoundException(Guid spaceId)
    : base($"Space with ID: {spaceId} was not found.")
    {
        SpaceId = spaceId;
    }
}