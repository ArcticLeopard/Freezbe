using Freezbe.Core.Exceptions;

namespace Freezbe.Application.Exceptions;

public sealed class CommentNotFoundException : CustomException
{
    public Guid CommentId { get; }

    public CommentNotFoundException(Guid commentId)
    : base($"Comment with ID: {commentId} was not found.")
    {
        CommentId = commentId;
    }
}