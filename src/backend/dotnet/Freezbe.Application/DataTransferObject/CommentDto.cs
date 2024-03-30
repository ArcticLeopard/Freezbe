namespace Freezbe.Application.DataTransferObject;

public class CommentDto
{
    public CommentDto(Guid id, string description)
    {
        Id = id;
        Description = description;
    }
    public Guid Id { get; }
    public string Description { get; }
}