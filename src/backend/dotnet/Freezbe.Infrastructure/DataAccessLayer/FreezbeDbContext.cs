using Freezbe.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Freezbe.Infrastructure.DataAccessLayer;

internal sealed class FreezbeDbContext : DbContext
{
    public DbSet<Assignment> Assignments { get; set; }
    public DbSet<Comment> Comments { get; set; }
    public DbSet<Project> Projects { get; set; }
    public DbSet<Space> Spaces { get; set; }

    public FreezbeDbContext(DbContextOptions<FreezbeDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(GetType().Assembly); 
    }
}