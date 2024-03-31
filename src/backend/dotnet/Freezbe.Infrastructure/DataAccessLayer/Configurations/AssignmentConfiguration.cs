using Freezbe.Core.Entities;
using Freezbe.Core.ValueObjects;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Freezbe.Infrastructure.DataAccessLayer.Configurations;

internal sealed class AssignmentConfiguration : IEntityTypeConfiguration<Assignment>
{
    public void Configure(EntityTypeBuilder<Assignment> builder)
    {
        builder.HasKey(p => p.Id);
        builder.HasOne(p=>p.Project)
               .WithMany(p=>p.Assignments)
               .HasForeignKey(p=>p.ProjectId);
        builder.Property(p => p.Id).HasConversion(p => p.Value, p => new AssignmentId(p));
        builder.Property(p => p.Description).IsRequired().HasConversion(p => p.Value, p => new Description(p));
        builder.Property(p => p.CreatedAt).IsRequired();
    }
}