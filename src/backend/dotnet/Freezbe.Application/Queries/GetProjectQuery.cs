using Freezbe.Application.DataTransferObject;
using MediatR;

namespace Freezbe.Application.Queries;

public sealed record GetProjectQuery(Guid ProjectId) : IRequest<ProjectDto>;