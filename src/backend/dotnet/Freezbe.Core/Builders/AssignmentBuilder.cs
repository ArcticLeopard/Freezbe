using Freezbe.Core.Entities;
using Freezbe.Core.ValueObjects;

namespace Freezbe.Core.Builders;

public class AssignmentBuilder
{
    private readonly AssignmentId _assignmentId = Guid.NewGuid();
    private readonly Description _description;
    private DateTimeOffset _createdAt = DateTimeOffset.UtcNow;
    private AssignmentStatus _assignmentStatus = AssignmentStatus.Active;
    private bool _priority = false;
    private DateTimeOffset? _dueDate = null;

    public AssignmentBuilder(Description description)
    {
        _description = description;
    }

    public AssignmentBuilder(Description description, AssignmentId assignmentId)
    {
        _description = description;
        _assignmentId = assignmentId;
    }

    public AssignmentBuilder WithCreatedAt(DateTimeOffset createdAt)
    {
        _createdAt = createdAt;
        return this;
    }

    public AssignmentBuilder WithStatus(AssignmentStatus status)
    {
        _assignmentStatus = status;
        return this;
    }

    public AssignmentBuilder WithPriority(bool priority)
    {
        _priority = priority;
        return this;
    }

    public AssignmentBuilder WithDueDate(DateTimeOffset? dueDate)
    {
        _dueDate = dueDate;
        return this;
    }

    public Assignment Build() => new Assignment(_assignmentId, _description, _createdAt, _assignmentStatus, _priority, _dueDate);
}