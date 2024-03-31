using Moq;

namespace Freezbe.Application.Tests.Unit;

public static class TestUtils
{
    public static TimeProvider FakeTimeProvider(int year = 2024, int month = 1, int day = 1, int hour = 0, int minute = 0)
    {
        var timeProvider = new Mock<TimeProvider>();
        timeProvider.Setup(p => p.GetUtcNow()).Returns(new DateTimeOffset(year, month, day, hour, month, minute, TimeSpan.Zero));
        return timeProvider.Object;
    }
}