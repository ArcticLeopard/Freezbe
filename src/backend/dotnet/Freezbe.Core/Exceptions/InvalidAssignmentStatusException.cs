namespace Freezbe.Core.Exceptions;

public sealed class InvalidAssignmentStatusException : CustomException
{
    public object AssignmentStatus { get; }
    public InvalidAssignmentStatusException(string assignmentStatus) : base($"Cannot set: \"{assignmentStatus}\" as assignmentStatus.")
    {
        AssignmentStatus = assignmentStatus;
    }
}