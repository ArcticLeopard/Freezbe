namespace Freezbe.Api.Requests;

public sealed record CreateAssignmentRequest(string Description, Guid ProjectId);