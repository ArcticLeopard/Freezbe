﻿using Freezbe.Core.Entities;
using Freezbe.Core.ValueObjects;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Freezbe.Infrastructure.DataAccessLayer.Configurations;

internal sealed class ProjectConfiguration : IEntityTypeConfiguration<Project>
{
    public void Configure(EntityTypeBuilder<Project> builder)
    {
        builder.HasKey(p => p.Id);
        builder.Property(p => p.Id).HasConversion(p => p.Value, p => new ProjectId(p));
        builder.Property(p => p.Description).IsRequired().HasConversion(p => p.Value, p => new Description(p));
    }
}