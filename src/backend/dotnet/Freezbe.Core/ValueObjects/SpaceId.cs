using Freezbe.Core.Exceptions;

namespace Freezbe.Core.ValueObjects;

public sealed record SpaceId
{
    public Guid Value { get; }

    public SpaceId(Guid value)
    {
        if(value == Guid.Empty)
        {
            throw new InvalidEntityIdException(value);
        }
        Value = value;
    }

    public static implicit operator Guid(SpaceId spaceId) => spaceId.Value;
    public static implicit operator SpaceId(Guid value) => new(value);
}