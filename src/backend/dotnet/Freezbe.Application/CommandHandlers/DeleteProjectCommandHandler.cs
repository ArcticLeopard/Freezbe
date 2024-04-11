using Freezbe.Application.Commands;
using Freezbe.Application.Exceptions;
using Freezbe.Core.Repositories;
using MediatR;

namespace Freezbe.Application.CommandHandlers;

public class DeleteProjectCommandHandler : IRequestHandler<DeleteProjectCommand>
{
    private readonly IProjectRepository _projectRepository;

    public DeleteProjectCommandHandler(IProjectRepository projectRepository)
    {
        _projectRepository = projectRepository;
    }

    public async Task Handle(DeleteProjectCommand command, CancellationToken cancellationToken)
    {
        var project = await _projectRepository.GetAsync(command.ProjectId);
        if(project is null)
        {
            throw new ProjectNotFoundException(command.ProjectId);
        }
        await _projectRepository.DeleteAsync(project);
    }
}