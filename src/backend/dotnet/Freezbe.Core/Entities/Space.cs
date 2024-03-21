using Freezbe.Core.Exceptions;
using Freezbe.Core.ValueObjects;

namespace Freezbe.Core.Entities;

public class Space
{
    public SpaceId Id { get; }
    public Description Description { get; private set; }
    public IEnumerable<Project> Projects => _projects;
    private readonly HashSet<Project> _projects = new();

    public Space(SpaceId id, Description description)
    {
        Id = id;
        Description = description;
    }

    public void ChangeDescription(Description description)
    {
        Description = description ?? throw new InvalidDescriptionException("null");
    }

    public void AddProject(Project project)
    {
        if(project == null)
        {
            throw new AddedEntityCannotBeNullException();
        }
        _projects.Add(project);
    }
}