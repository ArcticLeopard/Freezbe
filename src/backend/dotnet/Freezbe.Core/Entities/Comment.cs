using Freezbe.Core.Exceptions;
using Freezbe.Core.ValueObjects;

namespace Freezbe.Core.Entities;

public class Comment
{
    public CommentId Id { get; }
    public Description Description { get; private set; }
    public AssignmentId AssignmentId { get; }
    public Assignment Assignment { get; }
    public Comment(CommentId id, Description description)
    {
        Id = id;
        Description = description;
    }

    public void ChangeDescription(Description description)
    {
        Description = description ?? throw new InvalidDescriptionException("null");
    }
}