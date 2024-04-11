namespace Freezbe.Api.Requests;

public sealed record CreateCommentRequest(string Description, Guid AssignmentId);