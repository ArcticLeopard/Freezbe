using Freezbe.Application.Commands;
using Freezbe.Application.Exceptions;
using Freezbe.Core.Repositories;
using MediatR;

namespace Freezbe.Application.CommandHandlers;

public class ChangeStatusProjectCommandHandler : IRequestHandler<ChangeStatusProjectCommand>
{
    private readonly IProjectRepository _projectRepository;

    public ChangeStatusProjectCommandHandler(IProjectRepository projectRepository)
    {
        _projectRepository = projectRepository;
    }

    public async Task Handle(ChangeStatusProjectCommand command, CancellationToken cancellationToken)
    {
        var project = await _projectRepository.GetAsync(command.ProjectId);
        if(project is null)
        {
            throw new ProjectNotFoundException(command.ProjectId);
        }
        project.ChangeStatus(command.Status);
        await _projectRepository.UpdateAsync(project);
    }
}