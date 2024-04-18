using Freezbe.Core.Entities;
using Freezbe.Core.ValueObjects;

namespace Freezbe.Core.Builders;

public class SpaceBuilder
{
    private readonly SpaceId _spaceId = Guid.NewGuid();
    private readonly Description _description;
    private DateTimeOffset _createdAt = DateTimeOffset.UtcNow;

    public SpaceBuilder(Description description)
    {
        _description = description;
    }

    public SpaceBuilder(Description description, SpaceId spaceId)
    {
        _description = description;
        _spaceId = spaceId;
    }

    public SpaceBuilder WithCreatedAt(DateTimeOffset createdAt)
    {
        _createdAt = createdAt;
        return this;
    }

    public Space Build() => new Space(_spaceId, _description, _createdAt);
}