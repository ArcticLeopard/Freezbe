using Freezbe.Application.Commands;
using Freezbe.Application.Exceptions;
using Freezbe.Core.Repositories;
using MediatR;

namespace Freezbe.Application.CommandHandlers;

public class ChangeDescriptionCommentCommandHandler : IRequestHandler<ChangeDescriptionCommentCommand>
{
    private readonly ICommentRepository _commentRepository;

    public ChangeDescriptionCommentCommandHandler(ICommentRepository commentRepository)
    {
        _commentRepository = commentRepository;
    }

    public async Task Handle(ChangeDescriptionCommentCommand command, CancellationToken cancellationToken)
    {
        var comment = await _commentRepository.GetAsync(command.CommentId);
        if(comment is null)
        {
            throw new CommentNotFoundException(command.CommentId);
        }
        comment.ChangeDescription(command.Description);
        await _commentRepository.UpdateAsync(comment);
    }
}