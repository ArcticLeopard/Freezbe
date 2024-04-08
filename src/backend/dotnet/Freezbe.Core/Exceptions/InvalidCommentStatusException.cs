namespace Freezbe.Core.Exceptions;

public sealed class InvalidCommentStatusException : CustomException
{
    public object CommentStatus { get; }
    public InvalidCommentStatusException(string commentStatus) : base($"Cannot set: \"{commentStatus}\" as commentStatus.")
    {
        CommentStatus = commentStatus;
    }
}