using Freezbe.Application.Commands;
using Freezbe.Application.Exceptions;
using Freezbe.Core.Repositories;
using MediatR;

namespace Freezbe.Application.CommandHandlers;

public class ChangeStatusCommentCommandHandler : IRequestHandler<ChangeStatusCommentCommand>
{
    private readonly ICommentRepository _commentRepository;

    public ChangeStatusCommentCommandHandler(ICommentRepository commentRepository)
    {
        _commentRepository = commentRepository;
    }

    public async Task Handle(ChangeStatusCommentCommand command, CancellationToken cancellationToken)
    {
        var comment = await _commentRepository.GetAsync(command.CommentId);
        if(comment is null)
        {
            throw new CommentNotFoundException(command.CommentId);
        }
        comment.ChangeStatus(command.Status);
        await _commentRepository.UpdateAsync(comment);
    }
}