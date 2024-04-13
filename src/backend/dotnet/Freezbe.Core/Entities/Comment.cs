using Freezbe.Core.Exceptions;
using Freezbe.Core.ValueObjects;

namespace Freezbe.Core.Entities;

public class Comment
{
    public CommentId Id { get; }
    public Description Description { get; private set; }
    public DateTimeOffset CreatedAt { get; }
    public CommentStatus CommentStatus { get; private set;}

    public AssignmentId AssignmentId { get; }
    public Assignment Assignment { get; }
    public Comment(CommentId id, Description description, DateTimeOffset createdAt, CommentStatus commentStatus)
    {
        Id = id;
        Description = description;
        CreatedAt = createdAt;
        CommentStatus = commentStatus;
    }

    public void ChangeDescription(Description description)
    {
        Description = description ?? throw new InvalidDescriptionException("null");
    }

    public void ChangeStatus(CommentStatus commentStatus)
    {
        switch(commentStatus)
        {
            case CommentStatus.Abandon:
                Abandon();
                break;
            case CommentStatus.Active:
                Restore();
                break;
            default:
                throw new InvalidCommentStatusException(commentStatus);
        }
    }

    public void Abandon() => CommentStatus = CommentStatus.Abandon;
    public void Restore() => CommentStatus = CommentStatus.Active;
}