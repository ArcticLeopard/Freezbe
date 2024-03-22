using Freezbe.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Freezbe.Infrastructure.DataAccessLayer;

internal sealed class DatabaseInitializer : IHostedService
{
    private readonly IServiceProvider _serviceProvider;

    public DatabaseInitializer(IServiceProvider serviceProvider)
    {
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

    private static async Task SeedData(CancellationToken cancellationToken, FreezbeDbContext dbContext)
    {
        var spaces = dbContext.Spaces.ToList();
        if(spaces.Count == 0)
        {
            var space = new Space(Guid.NewGuid(), "Personal space");
            var project = new Project(Guid.NewGuid(), "Make a freezbe");
            var assignment = new Assignment(Guid.NewGuid(), "Complete day 21");
            var comment = new Comment(Guid.NewGuid(), "Completed yesterday as per requirements.");

            assignment.AddComment(comment);
            project.AddAssignment(assignment);
            space.AddProject(project);
            await dbContext.Spaces.AddAsync(space, cancellationToken);
            await dbContext.SaveChangesAsync(cancellationToken);
        }
    }
}