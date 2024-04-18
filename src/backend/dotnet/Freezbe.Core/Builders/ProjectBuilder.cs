using Freezbe.Core.Entities;
using Freezbe.Core.ValueObjects;

namespace Freezbe.Core.Builders;

public class ProjectBuilder
{
    private readonly ProjectId _projectId = Guid.NewGuid();
    private readonly Description _description;
    private DateTimeOffset _createdAt = DateTimeOffset.UtcNow;
    private ProjectStatus _projectStatus = ProjectStatus.Active;

    public ProjectBuilder(Description description)
    {
        _description = description;
    }

    public ProjectBuilder(Description description, ProjectId projectId)
    {
        _description = description;
        _projectId = projectId;
    }

    public ProjectBuilder WithCreatedAt(DateTimeOffset createdAt)
    {
        _createdAt = createdAt;
        return this;
    }

    public ProjectBuilder WithStatus(ProjectStatus status)
    {
        _projectStatus = status;
        return this;
    }

    public Project Build() => new Project(_projectId, _description, _createdAt, _projectStatus);
}