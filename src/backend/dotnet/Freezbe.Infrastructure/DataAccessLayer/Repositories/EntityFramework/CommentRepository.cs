using Freezbe.Core.Entities;
using Freezbe.Core.Repositories;
using Freezbe.Core.ValueObjects;
using Microsoft.EntityFrameworkCore;

namespace Freezbe.Infrastructure.DataAccessLayer.Repositories.EntityFramework;

internal class CommentRepository : ICommentRepository
{
    private readonly FreezbeDbContext _dbContext;

    public CommentRepository(FreezbeDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Comment> GetAsync(CommentId commentId)
    {
        return await _dbContext.Comments.SingleOrDefaultAsync(p => p.Id == commentId);
    }

    public async Task<IEnumerable<Comment>> GetAllAsync()
    {
        return await _dbContext.Comments.ToListAsync();
    }

    public async Task<IEnumerable<Comment>> GetAllByAssignmentIdAsync(AssignmentId assignmentId)
    {
        return await _dbContext.Comments.Where(p=>p.AssignmentId == assignmentId).ToListAsync();
    }

    public async Task AddAsync(Comment comment)
    {
        await _dbContext.Comments.AddAsync(comment);
        await _dbContext.SaveChangesAsync();
    }

    public async Task UpdateAsync(Comment comment)
    {
        _dbContext.Comments.Update(comment);
        await _dbContext.SaveChangesAsync();
    }

    public async Task DeleteAsync(Comment comment)
    {
        _dbContext.Comments.Remove(comment);
        await _dbContext.SaveChangesAsync();
    }
}