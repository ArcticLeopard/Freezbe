using Freezbe.Infrastructure.DataAccessLayer;
using Microsoft.EntityFrameworkCore;

namespace Freezbe.Infrastructure.Tests.Unit;

internal static class TestUtils
{
    public static FreezbeDbContext GetDbContext()
    {
        return new FreezbeDbContext(TestUtils.DbContextOptions());
    }

    private static DbContextOptions<FreezbeDbContext> DbContextOptions()
    {
        return new DbContextOptionsBuilder<FreezbeDbContext>().UseInMemoryDatabase(Guid.NewGuid().ToString()).Options;
    }
}