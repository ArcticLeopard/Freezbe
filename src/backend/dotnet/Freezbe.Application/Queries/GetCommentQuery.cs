using Freezbe.Application.DataTransferObject;
using MediatR;

namespace Freezbe.Application.Queries;

public sealed record GetCommentQuery(Guid CommentId) : IRequest<CommentDto>;