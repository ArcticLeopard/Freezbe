using Freezbe.Core.Entities;
using Freezbe.Core.ValueObjects;

namespace Freezbe.Core.Repositories;

public interface ICommentRepository
{
    Task<Comment> GetAsync(CommentId projectId);
    Task<IEnumerable<Comment>> GetAllAsync();
    Task<IEnumerable<Comment>> GetAllByAssignmentIdAsync(AssignmentId assignmentId);
    Task AddAsync(Comment project);
    Task UpdateAsync(Comment project);
    Task DeleteAsync(Comment project);
}