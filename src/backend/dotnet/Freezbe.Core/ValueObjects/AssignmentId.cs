using Freezbe.Core.Exceptions;

namespace Freezbe.Core.ValueObjects;

public sealed record AssignmentId
{
    public Guid Value { get; }

    public AssignmentId(Guid value)
    {
        if(value == Guid.Empty)
        {
            throw new InvalidEntityIdException(value);
        }
        Value = value;
    }

    public static implicit operator Guid(AssignmentId assignmentId) => assignmentId.Value;
    public static implicit operator AssignmentId(Guid value) => new(value);
}