using Freezbe.Core.Exceptions;

namespace Freezbe.Core.ValueObjects;

public sealed record Description
{
    public string Value { get; }

    public Description(string value)
    {
        if(string.IsNullOrWhiteSpace(value))
        {
            throw new InvalidDescriptionException(value);
        }
        Value = value;
    }

    public static implicit operator string(Description description) => description.Value;
    public static implicit operator Description(string value) => new(value);
}