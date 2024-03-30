using Freezbe.Application.Commands;
using Freezbe.Core.Repositories;
using MediatR;

namespace Freezbe.Application.CommandHandlers;

public class CommentChangeDescriptionCommandHandler : IRequestHandler<CommentChangeDescriptionCommand>
{
    private readonly ICommentRepository _commentRepository;

    public CommentChangeDescriptionCommandHandler(ICommentRepository commentRepository)
    {
        _commentRepository = commentRepository;
    }

    public async Task Handle(CommentChangeDescriptionCommand command, CancellationToken cancellationToken)
    {
        var comment = await _commentRepository.GetAsync(command.CommentId);
        comment.ChangeDescription(command.Description);
        await _commentRepository.UpdateAsync(comment);
    }
}