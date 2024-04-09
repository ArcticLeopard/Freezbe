using Freezbe.Core.Exceptions;
using Freezbe.Core.ValueObjects;

namespace Freezbe.Core.Entities;

public class Project
{
    public ProjectId Id { get; }
    public Description Description { get; private set; }
    public DateTimeOffset CreatedAt { get; }
    public ProjectStatus ProjectStatus { get; private set; }

    public IEnumerable<Assignment> Assignments => _assignments;
    private readonly HashSet<Assignment> _assignments = new();
    public SpaceId SpaceId { get; }
    public Space Space { get; }

    public Project(ProjectId id, Description description, DateTimeOffset createdAt, ProjectStatus projectStatus)
    {
        Id = id;
        Description = description;
        CreatedAt = createdAt;
        ProjectStatus = projectStatus;
    }

    public void ChangeDescription(Description description)
    {
        Description = description ?? throw new InvalidDescriptionException("null");
    }

    public void AddAssignment(Assignment assignment)
    {
        if(assignment == null)
        {
            throw new AddedEntityCannotBeNullException();
        }
        _assignments.Add(assignment);
    }

    public void Abandon() => ProjectStatus = ProjectStatus.Abandon;
    public void Restore() => ProjectStatus = ProjectStatus.Active;
}