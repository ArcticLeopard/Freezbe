namespace Freezbe.Application.DataTransferObject;

public class AssignmentDto
{
    public AssignmentDto(Guid id, string description)
    {
        Id = id;
        Description = description;
    }
    public Guid Id { get; }
    public string Description { get; }
}