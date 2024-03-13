namespace Freezbe.Core.Exceptions;

public sealed class InvalidDescriptionException : CustomException
{
    public object Description { get; }
    public InvalidDescriptionException(string description) : base($"Cannot set: \"{description}\" as description.") => Description = description;
}