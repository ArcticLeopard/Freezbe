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

    public void AddComment(Comment comment)
    {
        if(comment == null)
        {
            throw new AddedEntityCannotBeNullException();
        }
        _comments.Add(comment);
    }

    public void ChangeDescription(Description description)
    {
        Description = description ?? throw new InvalidDescriptionException("null");
    }

    public void ChangeStatus(AssignmentStatus assignmentStatus)
    {
        switch(assignmentStatus)
        {
            case AssignmentStatus.Abandon:
                Abandon();
                break;
            case AssignmentStatus.Active:
                Restore();
                break;
            case AssignmentStatus.Complited:
                Complited();
                break;
            default:
                throw new InvalidAssignmentStatusException(assignmentStatus);
        }
    }

    public void Abandon() => AssignmentStatus = AssignmentStatus.Abandon;
    public void Restore() => AssignmentStatus = AssignmentStatus.Active;
    public void Complited() => AssignmentStatus = AssignmentStatus.Complited;
}