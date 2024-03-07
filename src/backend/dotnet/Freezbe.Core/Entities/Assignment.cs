using Freezbe.Core.ValueObjects;

namespace Freezbe.Core.Entities;

public class Assignment
{
    public AssignmentId Id { get; private set; }
    public Description Description { get; private set; }

    public Assignment(AssignmentId id, Description description)
    {
        Id = id;
        Description = description;
    }
} 