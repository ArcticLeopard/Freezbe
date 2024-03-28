namespace Freezbe.Application.DataTransferObject;

public class ProjectDto
{
    public ProjectDto(Guid id, string description)
    {
        Id = id;
        Description = description;
    }
    public Guid Id { get; }
    public string Description { get; }
}