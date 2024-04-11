using Freezbe.Application.DataTransferObject;
using Freezbe.Application.Exceptions;
using Freezbe.Application.Queries;
using Freezbe.Core.Repositories;
using MediatR;

namespace Freezbe.Infrastructure.DataAccessLayer.QueryHandlers;

internal class GetCommentQueryHandler : IRequestHandler<GetCommentQuery, CommentDto>
{
    private readonly ICommentRepository _commentRepository;

    public GetCommentQueryHandler(ICommentRepository commentRepository)
    {
        _commentRepository = commentRepository;
    }

    public async Task<CommentDto> Handle(GetCommentQuery request, CancellationToken cancellationToken)
    {
        var comment = await _commentRepository.GetAsync(request.CommentId);
        if(comment is null)
        {
            throw new CommentNotFoundException(request.CommentId);
        }
        var result = new CommentDto(comment.Id, comment.Description);
        return result;
    }
}