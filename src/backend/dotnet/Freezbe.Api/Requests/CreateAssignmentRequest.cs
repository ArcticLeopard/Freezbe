namespace Freezbe.Api.Requests;

public sealed record CreateAssignmentRequest(string Description, bool Priority, Guid ProjectId);