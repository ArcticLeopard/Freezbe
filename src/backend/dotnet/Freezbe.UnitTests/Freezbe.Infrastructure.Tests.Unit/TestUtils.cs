using Freezbe.Infrastructure.DataAccessLayer;
using Microsoft.EntityFrameworkCore;
using Moq;

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

    public static TimeProvider FakeTimeProvider(int year = 2000, int month = 1, int day = 1, int hour = 0, int minute = 0)
    {
        var timeProvider = new Mock<TimeProvider>();
        timeProvider.Setup(p => p.GetUtcNow()).Returns(new DateTimeOffset(year, month, day, hour, month, minute, TimeSpan.Zero));
        return timeProvider.Object;
    }
}