using Freezbe.Core.Exceptions;

namespace Freezbe.Application.Exceptions;

public sealed class ProjectNotFoundException : CustomException
{
    public Guid ProjectId { get; }

    public ProjectNotFoundException(Guid projectId)
    : base($"Project with ID: {projectId} was not found.")
    {
        ProjectId = projectId;
    }
}