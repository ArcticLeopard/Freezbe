using Freezbe.Core.Exceptions;

namespace Freezbe.Core.ValueObjects;

public sealed record ProjectId
{
    public Guid Value { get; }

    public ProjectId(Guid value)
    {
        if(value == Guid.Empty)
        {
            throw new InvalidEntityIdException(value);
        }
        Value = value;
    }

    public static implicit operator Guid(ProjectId projectId) => projectId.Value;
    public static implicit operator ProjectId(Guid value) => new(value);
}