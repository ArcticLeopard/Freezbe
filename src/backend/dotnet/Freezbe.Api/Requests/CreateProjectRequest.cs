namespace Freezbe.Api.Requests;

public sealed record CreateProjectRequest(string Description, Guid SpaceId);