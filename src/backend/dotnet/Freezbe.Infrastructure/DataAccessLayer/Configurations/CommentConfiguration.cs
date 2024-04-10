using Freezbe.Core.Entities;
using Freezbe.Core.ValueObjects;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Freezbe.Infrastructure.DataAccessLayer.Configurations;

internal sealed class CommentConfiguration : IEntityTypeConfiguration<Comment>
{
    public void Configure(EntityTypeBuilder<Comment> builder)
    {
        builder.HasKey(p => p.Id);
        builder.HasOne(p=>p.Assignment)
               .WithMany(p=>p.Comments)
               .HasForeignKey(p=>p.AssignmentId)
               .OnDelete(DeleteBehavior.Cascade);
        builder.Property(p => p.Id).HasConversion(p => p.Value, p => new CommentId(p));
        builder.Property(p => p.Description).IsRequired().HasConversion(p => p.Value, p => new Description(p));
        builder.Property(p => p.CommentStatus).IsRequired().HasConversion(p => p.Value, p => new CommentStatus(p));
        builder.Property(p => p.CreatedAt).IsRequired();
    }
}