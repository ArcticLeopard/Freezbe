using Freezbe.Core.Exceptions;

namespace Freezbe.Application.Exceptions;

public sealed class AssignmentNotFoundException : CustomException
{
    public Guid AssignmentId { get; }

    public AssignmentNotFoundException(Guid assignmentId)
    : base($"Assignment with ID: {assignmentId} was not found.")
    {
        AssignmentId = assignmentId;
    }
}