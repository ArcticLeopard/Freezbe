namespace Freezbe.Application.DataTransferObject;

public class SpaceDto
{
    public SpaceDto(Guid id, string description)
    {
        Id = id;
        Description = description;
    }
    public Guid Id { get; }
    public string Description { get; }
}