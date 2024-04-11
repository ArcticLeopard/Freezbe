using Freezbe.Application.Commands;
using Freezbe.Application.Exceptions;
using Freezbe.Core.Repositories;
using MediatR;

namespace Freezbe.Application.CommandHandlers;

public class DeleteCommentCommandHandler : IRequestHandler<DeleteCommentCommand>
{
    private readonly ICommentRepository _commentRepository;

    public DeleteCommentCommandHandler(ICommentRepository commentRepository)
    {
        _commentRepository = commentRepository;
    }

    public async Task Handle(DeleteCommentCommand command, CancellationToken cancellationToken)
    {
        var comment = await _commentRepository.GetAsync(command.CommentId);
        if(comment is null)
        {
            throw new CommentNotFoundException(command.CommentId);
        }
        await _commentRepository.DeleteAsync(comment);
    }
}