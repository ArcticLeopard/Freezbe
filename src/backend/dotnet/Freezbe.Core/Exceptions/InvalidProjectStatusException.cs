namespace Freezbe.Core.Exceptions;

public sealed class InvalidProjectStatusException : CustomException
{
    public object ProjectStatus { get; }
    public InvalidProjectStatusException(string projectStatus) : base($"Cannot set: \"{projectStatus}\" as projectStatus.")
    {
        ProjectStatus = projectStatus;
    }
}