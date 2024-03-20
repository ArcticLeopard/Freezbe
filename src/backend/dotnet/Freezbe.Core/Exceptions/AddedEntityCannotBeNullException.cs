namespace Freezbe.Core.Exceptions;

public sealed class AddedEntityCannotBeNullException : CustomException
{
    public object Entity { get; }
    public AddedEntityCannotBeNullException(object entity) : base($"Created entity cannot be Null") => Entity = entity;
}