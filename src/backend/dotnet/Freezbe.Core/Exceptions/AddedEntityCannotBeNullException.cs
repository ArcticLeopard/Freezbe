namespace Freezbe.Core.Exceptions;

public sealed class AddedEntityCannotBeNullException : CustomException
{
    public AddedEntityCannotBeNullException() : base($"Created entity cannot be Null")
    {
    }
}