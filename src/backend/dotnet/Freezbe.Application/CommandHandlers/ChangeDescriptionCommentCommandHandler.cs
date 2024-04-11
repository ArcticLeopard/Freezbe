using Freezbe.Application.Commands;
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
        comment.ChangeDescription(command.Description);
        await _commentRepository.UpdateAsync(comment);
    }
}