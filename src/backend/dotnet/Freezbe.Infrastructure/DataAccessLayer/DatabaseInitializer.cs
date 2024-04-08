using Freezbe.Core.Entities;
using Freezbe.Core.ValueObjects;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Freezbe.Infrastructure.DataAccessLayer;

internal sealed class DatabaseInitializer : IHostedService
{
    private readonly TimeProvider _timeProvider;
    private readonly IServiceProvider _serviceProvider;

    public DatabaseInitializer(TimeProvider timeProvider, IServiceProvider serviceProvider)
    {
        _timeProvider = timeProvider;
        _serviceProvider = serviceProvider;
    }

    public async Task StartAsync(CancellationToken cancellationToken)
    {
        using var scope = _serviceProvider.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<FreezbeDbContext>();
        await dbContext.Database.MigrateAsync(cancellationToken);
        await SeedData(cancellationToken, dbContext);
    }

    public async Task StopAsync(CancellationToken cancellationToken)
    {
        using var scope = _serviceProvider.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<FreezbeDbContext>();
        await dbContext.Database.EnsureDeletedAsync(cancellationToken);
    }

    private async Task SeedData(CancellationToken cancellationToken, FreezbeDbContext dbContext)
    {
        var spaces = dbContext.Spaces.ToList();
        if(spaces.Count == 0)
        {
            var createdAt = _timeProvider.GetUtcNow();
            var space = new Space(Guid.NewGuid(), "Personal space", createdAt);
            var project = new Project(Guid.NewGuid(), "Make a freezbe", createdAt);
            var assignment = new Assignment(Guid.NewGuid(), "Complete day 21", createdAt, AssignmentStatus.Active);
            var comment = new Comment(Guid.NewGuid(), "Completed yesterday as per requirements.", createdAt, CommentStatus.Active);

            assignment.AddComment(comment);
            project.AddAssignment(assignment);
            space.AddProject(project);
            await dbContext.Spaces.AddAsync(space, cancellationToken);
            await dbContext.SaveChangesAsync(cancellationToken);
        }
    }
}