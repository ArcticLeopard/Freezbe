using Freezbe.Application.Abstractions;
using Freezbe.Application.DataTransferObject;
using Freezbe.Application.Queries;

namespace Freezbe.Infrastructure.DataAccessLayer.Handlers;

public class SomeQueryHandler : IQueryHandler<SomeQuery, SomeDto>
{
    public Task<SomeDto> HandleAsync(SomeQuery query)
    {
        throw new NotImplementedException();
    }
}