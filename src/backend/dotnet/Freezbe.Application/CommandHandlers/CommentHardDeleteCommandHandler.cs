using Freezbe.Application.Commands;
using Freezbe.Application.Exceptions;
using Freezbe.Core.Repositories;
using MediatR;

namespace Freezbe.Application.CommandHandlers;

public class CommentHardDeleteCommandHandler : IRequestHandler<CommentHardDeleteCommand>
{
    private readonly ICommentRepository _commentRepository;

    public CommentHardDeleteCommandHandler(ICommentRepository commentRepository)
    {
        _commentRepository = commentRepository;
    }

    public async Task Handle(CommentHardDeleteCommand command, CancellationToken cancellationToken)
    {
        var comment = await _commentRepository.GetAsync(command.CommentId);
        if(comment is null)
        {
            throw new CommentNotFoundException(command.CommentId);
        }
        await _commentRepository.DeleteAsync(comment);
    }
}