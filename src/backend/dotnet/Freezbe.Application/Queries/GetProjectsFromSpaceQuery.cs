using Freezbe.Application.DataTransferObject;
using MediatR;

namespace Freezbe.Application.Queries;

public sealed record GetProjectsFromSpaceQuery(Guid SpaceId) : IRequest<IEnumerable<ProjectDto>>;