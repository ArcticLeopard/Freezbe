using Freezbe.Application.DataTransferObject;
using Freezbe.Application.Queries;
using Freezbe.Core.Repositories;
using MediatR;

namespace Freezbe.Infrastructure.DataAccessLayer.QueryHandlers;

internal class GetCommentsForAssignmentQueryHandler : IRequestHandler<GetCommentsFromAssignmentQuery, IEnumerable<CommentDto>>
{
    private readonly ICommentRepository _commentRepository;

    public GetCommentsForAssignmentQueryHandler(ICommentRepository commentRepository)
    {
        _commentRepository = commentRepository;
    }

    public async Task<IEnumerable<CommentDto>> Handle(GetCommentsFromAssignmentQuery request, CancellationToken cancellationToken)
    {
        var comments = await _commentRepository.GetAllByAssignmentIdAsync(request.AssignmentId);
        var result = comments.Select(p => new CommentDto(p.Id, p.Description));
        return result;
    }
}