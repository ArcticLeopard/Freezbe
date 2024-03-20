using Freezbe.Core.Exceptions;
using Freezbe.Core.ValueObjects;

namespace Freezbe.Core.Entities;

public class Project
{
    public ProjectId Id { get; }
    public Description Description { get; private set; }
    public IEnumerable<Assignment> Assignments => _assignments;
    private readonly HashSet<Assignment> _assignments = new();

    public Project(ProjectId id, Description description)
    {
        Id = id;
        Description = description;
    }

    public void ChangeDescription(Description description)
    {
        if(description == null)
        {
            throw new InvalidDescriptionException("null");
        }
        Description = description;
    }

    public void AddAssignment(Assignment assignment)
    {
        if(assignment == null)
        {
            throw new AddedEntityCannotBeNullException(assignment);
        }
        _assignments.Add(assignment);
    }
}