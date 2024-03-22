using Freezbe.Core.Exceptions;

namespace Freezbe.Core.ValueObjects;

public sealed record CommentId
{
    public Guid Value { get; }

    public CommentId(Guid value)
    {
        if(value == Guid.Empty)
        {
            throw new InvalidEntityIdException(value);
        }
        Value = value;
    }

    public static implicit operator Guid(CommentId commentId) => commentId.Value;
    public static implicit operator CommentId(Guid value) => new(value);
}