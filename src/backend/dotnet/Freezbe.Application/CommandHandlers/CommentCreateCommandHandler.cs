using Freezbe.Application.Commands;
using Freezbe.Application.Exceptions;
using Freezbe.Core.Entities;
using Freezbe.Core.Repositories;
using MediatR;

namespace Freezbe.Application.CommandHandlers;

public class CommentCreateCommandHandler : IRequestHandler<CommentCreateCommand>
{
    private readonly IAssignmentRepository _assignmentRepository;

    public CommentCreateCommandHandler(IAssignmentRepository assignmentRepository)
    {
        _assignmentRepository = assignmentRepository;
    }

    public async Task Handle(CommentCreateCommand command, CancellationToken cancellationToken)
    {
        var assignment = await _assignmentRepository.GetAsync(command.AssignmentId);
        if(assignment is null)
        {
            throw new AssignmentNotFoundException(command.AssignmentId);
        }
        var comment = new Comment(command.CommentId, command.Description);
        assignment.AddComment(comment);
        await _assignmentRepository.UpdateAsync(assignment);
    }
}