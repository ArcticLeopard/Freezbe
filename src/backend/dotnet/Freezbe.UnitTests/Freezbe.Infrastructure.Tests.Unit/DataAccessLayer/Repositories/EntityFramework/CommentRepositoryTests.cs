using Freezbe.Core.Entities;
using Freezbe.Core.ValueObjects;
using Freezbe.Infrastructure.DataAccessLayer.Repositories.EntityFramework;
using Shouldly;
using Xunit;

namespace Freezbe.Infrastructure.Tests.Unit.DataAccessLayer.Repositories.EntityFramework;

public class CommentRepositoryTests
{
    private readonly TimeProvider _fakeTimeProvider;

    public CommentRepositoryTests()
    {
        _fakeTimeProvider = TestUtils.FakeTimeProvider();
    }

    [Fact]
    public async Task GetAsync_ShouldReturnComment_WhenCommentExists()
    {
        // ARRANGE
        await using var dbContext = TestUtils.GetDbContext();
        var commentId = new CommentId(Guid.NewGuid());
        var createdAt = _fakeTimeProvider.GetUtcNow();
        var expectedComment = new Comment(commentId, "Test Comment", createdAt, CommentStatus.Active);
        dbContext.Comments.Add(expectedComment);
        await dbContext.SaveChangesAsync();

        var repository = new CommentRepository(dbContext);

        // ACT
        var result = await repository.GetAsync(commentId);

        // ASSERT
        result.ShouldNotBeNull();
        result.Id.ShouldBe(expectedComment.Id);
        result.Description.ShouldBe(expectedComment.Description);
    }

    [Theory]
    [InlineData(0, 0)]
    [InlineData(10, 10)]
    public async Task GetAllAsync_ShouldReturnAllComments(int numberOfComments, int expectedNumberOfComments)
    {
        // ARRANGE
        await using var dbContext = TestUtils.GetDbContext();
        var expectedComments = CreateComments(numberOfComments);
        dbContext.Comments.AddRange(expectedComments);
        await dbContext.SaveChangesAsync();

        var repository = new CommentRepository(dbContext);

        // ACT
        var result = (await repository.GetAllAsync()).ToList();

        // ASSERT
        result.ShouldNotBeNull();
        result.Count.ShouldBe(expectedNumberOfComments);
        foreach(var expectedComment in expectedComments)
            result.ShouldContain(a => a.Id == expectedComment.Id);
    }

    [Theory]
    [InlineData(0, 0)]
    [InlineData(10, 10)]
    public async Task GetAllByAssignmentIdAsync_ShouldReturnAllCommentsByyAssignmentId(int numberOfComments, int expectedNumberOfComments)
    {
        // ARRANGE
        var assignmentId = Guid.NewGuid();
        await using var dbContext = TestUtils.GetDbContext();
        var assignment = new Assignment(assignmentId, "description", _fakeTimeProvider.GetUtcNow(), AssignmentStatus.Active, false, null);
        var expectedComments = CreateComments(numberOfComments);
        expectedComments.ForEach(p=>assignment.AddComment(p));
        dbContext.Assignments.Add(assignment);
        await dbContext.SaveChangesAsync();

        var repository = new CommentRepository(dbContext);

        // ACT
        var result = (await repository.GetAllByAssignmentIdAsync(assignmentId)).ToList();

        // ASSERT
        result.ShouldNotBeNull();
        result.Count.ShouldBe(expectedNumberOfComments);
        foreach(var expectedComment in expectedComments)
            result.ShouldContain(a => a.Id == expectedComment.Id);
    }

    [Fact]
    public async Task AddAsync_ShouldAddComment()
    {
        // ARRANGE
        await using var dbContext = TestUtils.GetDbContext();
        var repository = new CommentRepository(dbContext);
        var commentId = new CommentId(Guid.NewGuid());
        var createdAt = _fakeTimeProvider.GetUtcNow();
        var commentToAdd = new Comment(commentId, new Description("Test Description 1"), createdAt,  CommentStatus.Active);

        // ACT
        await repository.AddAsync(commentToAdd);

        // ASSERT
        var result = await dbContext.Comments.FindAsync(commentId);
        result.ShouldNotBeNull();
        result.Id.ShouldBe(commentId);
    }

    [Fact]
    public async Task UpdateAsync_ShouldUpdateComment()
    {
        // ARRANGE
        await using var dbContext = TestUtils.GetDbContext();
        var commentId = new CommentId(Guid.NewGuid());
        var initialDescription = new Description("Initial Description");
        var updatedDescription = new Description("Updated Description");
        var createdAt = _fakeTimeProvider.GetUtcNow();
        var comment = new Comment(commentId, initialDescription, createdAt,  CommentStatus.Active);
        dbContext.Comments.Add(comment);
        await dbContext.SaveChangesAsync();

        var repository = new CommentRepository(dbContext);

        // ACT
        comment.ChangeDescription(updatedDescription);
        await repository.UpdateAsync(comment);

        // ASSERT
        var result = await dbContext.Comments.FindAsync(commentId);
        result.ShouldNotBeNull();
        result.Description.ShouldBe(updatedDescription);
    }

    [Fact]
    public async Task DeleteAsync_ShouldDeleteComment()
    {
        // ARRANGE
        await using var dbContext = TestUtils.GetDbContext();
        var commentId = new CommentId(Guid.NewGuid());
        var createdAt = _fakeTimeProvider.GetUtcNow();
        var comment = new Comment(commentId, new Description("Test Description"), createdAt,  CommentStatus.Active);
        dbContext.Comments.Add(comment);
        await dbContext.SaveChangesAsync();

        var repository = new CommentRepository(dbContext);

        // ACT
        await repository.DeleteAsync(comment);

        // ASSERT
        var result = await dbContext.Comments.FindAsync(commentId);
        result.ShouldBeNull();
    }

    private List<Comment> CreateComments(int numberOfComments)
    {
        var result = new List<Comment>();
        for(int i = 0; i < numberOfComments; i++)
        {
            var createdAt = _fakeTimeProvider.GetUtcNow();
            result.Add(new Comment(Guid.NewGuid(), $"Test Comment {i}", createdAt,  CommentStatus.Active));
        }
        return result;
    }
}