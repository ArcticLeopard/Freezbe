using Freezbe.Core.Entities;
using Freezbe.Core.ValueObjects;

namespace Freezbe.Core.Builders;

public class CommentBuilder
{
    private readonly CommentId _commentId = Guid.NewGuid();
    private readonly Description _description;
    private DateTimeOffset _createdAt = DateTimeOffset.UtcNow;
    private CommentStatus _commentStatus = CommentStatus.Active;

    public CommentBuilder(Description description)
    {
        _description = description;
    }

    public CommentBuilder(Description description, CommentId commentId)
    {
        _description = description;
        _commentId = commentId;
    }

    public CommentBuilder WithCreatedAt(DateTimeOffset createdAt)
    {
        _createdAt = createdAt;
        return this;
    }

    public CommentBuilder WithStatus(CommentStatus status)
    {
        _commentStatus = status;
        return this;
    }

    public Comment Build() => new Comment(_commentId, _description, _createdAt, _commentStatus);
}