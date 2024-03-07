using Freezbe.Core.ValueObjects;

namespace Freezbe.Core.Entities;

public class Space
{
    public SpaceId Id { get; }
    public Description Description { get; private set; }

    public Space(SpaceId id, Description description)
    {
        Id = id;
        Description = description;
    }

    public void ChangeDescription(Description description) => Description = description;
}