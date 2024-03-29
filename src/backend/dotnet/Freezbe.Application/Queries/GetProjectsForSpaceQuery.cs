using Freezbe.Application.DataTransferObject;
using MediatR;

namespace Freezbe.Application.Queries;

public sealed record GetProjectsForSpaceQuery(Guid SpaceId) : IRequest<IEnumerable<ProjectDto>>;