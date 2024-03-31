using Freezbe.Core.ValueObjects;
using Moq;

namespace Freezbe.Core.Tests.Unit;

internal static class TestUtils
{
    public static Guid CreateCorrectGuid()
    {
        return new Guid("00000000-0000-0000-0000-000000000001");
    }

    public static AssignmentId CreateCorrectAssignmentId()
    {
        return CreateCorrectGuid();
    }

    public static ProjectId CreateCorrectProjectId()
    {
        return CreateCorrectGuid();
    }

    public static SpaceId CreateCorrectSpaceId()
    {
        return CreateCorrectGuid();
    }

    public static CommentId CreateCorrectCommentId()
    {
        return CreateCorrectGuid();
    }

    public static TimeProvider FakeTimeProvider(int year = 2000, int month = 1, int day = 1, int hour = 0, int minute = 0)
    {
        var timeProvider = new Mock<TimeProvider>();
        timeProvider.Setup(p => p.GetUtcNow()).Returns(new DateTimeOffset(year, month, day, hour, month, minute, TimeSpan.Zero));
        return timeProvider.Object;
    }
}