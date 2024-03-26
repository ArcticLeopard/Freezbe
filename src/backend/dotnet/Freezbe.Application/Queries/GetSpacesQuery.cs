using Freezbe.Application.DataTransferObject;
using MediatR;

namespace Freezbe.Application.Queries;

public class GetSpacesQuery : IRequest<IEnumerable<SpaceDto>>
{

}