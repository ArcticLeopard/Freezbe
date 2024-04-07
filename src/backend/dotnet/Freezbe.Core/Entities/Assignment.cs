using Freezbe.Core.Exceptions;
using Freezbe.Core.ValueObjects;

namespace Freezbe.Core.Entities;

public class Assignment
{
    public AssignmentId Id { get; }
    public Description Description { get; private set; }
    public DateTimeOffset CreatedAt { get; }
    public AssignmentStatus AssignmentStatus { get; private set; }

    public IEnumerable<Comment> Comments => _comments;
    private readonly HashSet<Comment> _comments = new();
    public ProjectId ProjectId { get; }
    public Project Project { get; }

    public Assignment(AssignmentId id, Description description, DateTimeOffset createdAt, AssignmentStatus assignmentStatus)
    {
        Id = id;
        Description = description;
        CreatedAt = createdAt;
        AssignmentStatus = assignmentStatus;
    }

    public void ChangeDescription(Description description)
    {
        Description = description ?? throw new InvalidDescriptionException("null");
    }

    public void AddComment(Comment comment)
    {
        if(comment == null)
        {
            throw new AddedEntityCannotBeNullException();
        }
        _comments.Add(comment);
    }

    public void Abandon() => AssignmentStatus = AssignmentStatus.Abandon;
    public void Restore() => AssignmentStatus = AssignmentStatus.ToDo;
    public void Complited() => AssignmentStatus = AssignmentStatus.Complited;
}