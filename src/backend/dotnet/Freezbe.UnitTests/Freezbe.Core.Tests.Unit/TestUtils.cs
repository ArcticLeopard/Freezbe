using Freezbe.Core.ValueObjects;

namespace Freezbe.Core.Tests.Unit;

public static class TestUtils
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
}