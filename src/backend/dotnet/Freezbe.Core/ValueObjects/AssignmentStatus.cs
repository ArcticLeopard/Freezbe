using Freezbe.Core.Exceptions;

namespace Freezbe.Core.ValueObjects;

public sealed record AssignmentStatus
{
    public string Value { get; }

    public AssignmentStatus(string value)
    {
        if(!AvailableStates.Contains(value))
        {
            throw new InvalidAssignmentStatusException(value);
        }
        Value = value;
    }

    public static implicit operator string(AssignmentStatus assignmentStatus) => assignmentStatus.Value;
    public static implicit operator AssignmentStatus(string value) => new(value);

    public const string Abandon = nameof(Abandon);
    public const string ToDo = nameof(ToDo);
    public const string Complited = nameof(Complited);

    private string[] AvailableStates = {
        Abandon,
        ToDo,
        Complited
    };
}