using Freezbe.Application.DataTransferObject;
using MediatR;

namespace Freezbe.Application.Queries;

public sealed record GetSpaceQuery(Guid SpaceId) : IRequest<SpaceDto>;