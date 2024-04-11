using Freezbe.Application.Commands;
using Freezbe.Application.Exceptions;
using Freezbe.Core.Entities;
using Freezbe.Core.Repositories;
using Freezbe.Core.ValueObjects;
using MediatR;

namespace Freezbe.Application.CommandHandlers;

public class CreateCommentCommandHandler : IRequestHandler<CreateCommentCommand>
{
    private readonly TimeProvider _timeProvider;
    private readonly IAssignmentRepository _assignmentRepository;

    public CreateCommentCommandHandler(TimeProvider timeProvider, IAssignmentRepository assignmentRepository)
    {
        _timeProvider = timeProvider;
        _assignmentRepository = assignmentRepository;
    }

    public async Task Handle(CreateCommentCommand command, CancellationToken cancellationToken)
    {
        var assignment = await _assignmentRepository.GetAsync(command.AssignmentId);
        if(assignment is null)
        {
            throw new AssignmentNotFoundException(command.AssignmentId);
        }
        var createdAt = _timeProvider.GetUtcNow();
        var comment = new Comment(command.CommentId, command.Description, createdAt, CommentStatus.Active);
        assignment.AddComment(comment);
        await _assignmentRepository.UpdateAsync(assignment);
    }
}