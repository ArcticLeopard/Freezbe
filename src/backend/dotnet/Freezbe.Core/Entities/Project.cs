using Freezbe.Core.ValueObjects;

namespace Freezbe.Core.Entities;

public class Project
{
    public ProjectId Id { get; }
    public Description Description { get; private set; }

    public Project(ProjectId id, Description description)
    {
        Id = id;
        Description = description;
    }

    public void ChangeDescription(Description description) => Description = description;
}