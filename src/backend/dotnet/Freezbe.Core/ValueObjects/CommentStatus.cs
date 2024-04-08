using Freezbe.Core.Exceptions;

namespace Freezbe.Core.ValueObjects;

public sealed record CommentStatus
{
    public string Value { get; }

    public CommentStatus(string value)
    {
        if(!AvailableStates.Contains(value))
        {
            throw new InvalidCommentStatusException(value);
        }
        Value = value;
    }

    public static implicit operator string(CommentStatus commentStatus) => commentStatus.Value;
    public static implicit operator CommentStatus(string value) => new(value);

    public const string Abandon = nameof(Abandon);
    public const string Active = nameof(Active);

    private string[] AvailableStates = {
        Abandon,
        Active,
    };
}