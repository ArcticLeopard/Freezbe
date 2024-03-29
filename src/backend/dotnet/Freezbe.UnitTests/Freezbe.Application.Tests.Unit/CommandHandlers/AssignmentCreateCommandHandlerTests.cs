﻿using Freezbe.Application.CommandHandlers;
using Freezbe.Application.Commands;
using Freezbe.Application.Exceptions;
using Freezbe.Core.Entities;
using Freezbe.Core.Repositories;
using Freezbe.Core.ValueObjects;
using Moq;
using Shouldly;
using Xunit;

namespace Freezbe.Application.Tests.Unit.CommandHandlers;

public class AssignmentCreateCommandHandlerTests
{
    [Fact]
    public async Task HandleAsync_CommandWithExistingsProjectId_ShouldSuccessfullyAddsAssignment()
    {
        // ASSERT
        var projectRepositoryMock = new Mock<IProjectRepository>();
        var existingsProjectId = new ProjectId(Guid.NewGuid());
        projectRepositoryMock.Setup(p => p.GetAsync(existingsProjectId)).ReturnsAsync(new Project(Guid.NewGuid(),"Description"));
        var handler = new AssignmentCreateCommandHandler(projectRepositoryMock.Object);
        var command = new AssignmentCreateCommand(Guid.NewGuid(), "Test description", existingsProjectId);

        // ACT
        await handler.Handle(command, CancellationToken.None);

        // ASSERT
        projectRepositoryMock.Verify(p => p.GetAsync(It.IsAny<ProjectId>()), Times.Once);
        projectRepositoryMock.Verify(p => p.UpdateAsync(It.IsAny<Project>()), Times.Once);
    }

    [Fact]
    public async Task HandleAsync_CommandWithNotExistingsProjectId_ShouldThrowProjectNotFoundException()
    {
        // ASSERT
        var projectRepositoryMock = new Mock<IProjectRepository>();
        var existingsProjectId = new ProjectId(Guid.NewGuid());
        projectRepositoryMock.Setup(p => p.GetAsync(existingsProjectId)).ReturnsAsync(new Project(Guid.NewGuid(),"Description"));
        var handler = new AssignmentCreateCommandHandler(projectRepositoryMock.Object);
        var command = new AssignmentCreateCommand(Guid.NewGuid(), "Test description", Guid.NewGuid());

        //ACT
        var exception = await Record.ExceptionAsync(() => handler.Handle(command, CancellationToken.None));

        //ASSERT
        exception.ShouldNotBeNull();
        exception.ShouldBeOfType<ProjectNotFoundException>();
    }
}