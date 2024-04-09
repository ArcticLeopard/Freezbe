using Freezbe.Core.Exceptions;

namespace Freezbe.Core.ValueObjects;

public sealed record ProjectStatus
{
    public string Value { get; }

    public ProjectStatus(string value)
    {
        if(!AvailableStates.Contains(value))
        {
            throw new InvalidProjectStatusException(value);
        }
        Value = value;
    }

    public static implicit operator string(ProjectStatus projectStatus) => projectStatus.Value;
    public static implicit operator ProjectStatus(string value) => new(value);

    public const string Abandon = nameof(Abandon);
    public const string Active = nameof(Active);

    private string[] AvailableStates = {
        Abandon,
        Active,
    };
}