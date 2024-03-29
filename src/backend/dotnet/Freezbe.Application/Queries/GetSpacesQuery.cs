using Freezbe.Application.DataTransferObject;
using MediatR;

namespace Freezbe.Application.Queries;

public sealed record GetSpacesQuery : IRequest<IEnumerable<SpaceDto>>;