using Freezbe.Core.Exceptions;
using Freezbe.Infrastructure.Middlewares;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Moq;
using Xunit;

namespace Freezbe.Infrastructure.Tests.Unit.Exceptions;

public class ExceptionMiddlewareTests
{
    [Theory]
    [InlineData("Development")]
    [InlineData("Production")]
    public async Task InvokeAsync_NoException_ReturnsNextDelegate(string environmentName)
    {
        // ARRANGE
        var middleware = new ExceptionMiddleware(CreateLoggerMock(), CreateWebHostEnvironmentMock(environmentName));
        var context = new DefaultHttpContext();
        var nextDelegateCalled = false;

        Task NextDelegate(HttpContext _)
        {
            nextDelegateCalled = true;
            return Task.CompletedTask;
        }

        // ACT
        await middleware.InvokeAsync(context, NextDelegate);

        // ASSERT
        Assert.True(nextDelegateCalled);
        Assert.Equal(StatusCodes.Status200OK, context.Response.StatusCode);
    }

    [Theory]
    [InlineData("Development")]
    [InlineData("Production")]
    public async Task InvokeAsync_HandlesGeneralException_ReturnsInternalServerError(string environmentName)
    {
        // ARRANGE
        var middleware = new ExceptionMiddleware(CreateLoggerMock(), CreateWebHostEnvironmentMock(environmentName));
        var context = new DefaultHttpContext();
        var exception = new Exception();
        Task NextDelegate(HttpContext _) => throw exception;

        // ACT
        await middleware.InvokeAsync(context, NextDelegate);

        // ASSERT
        Assert.Equal(StatusCodes.Status500InternalServerError, context.Response.StatusCode);
    }

    [Theory]
    [MemberData(nameof(GetCustomExceptions))]
    public async Task InvokeAsync_HandlesCustomException_ReturnsBadRequest(CustomException exception, string environmentName)
    {
        // ARRANGE
        var middleware = new ExceptionMiddleware(CreateLoggerMock(), CreateWebHostEnvironmentMock(environmentName));
        var context = new DefaultHttpContext();
        Task NextDelegate(HttpContext _) => throw exception;

        // ACT
        await middleware.InvokeAsync(context, NextDelegate);

        // ASSERT
        Assert.Equal(StatusCodes.Status400BadRequest, context.Response.StatusCode);
    }

    public static IEnumerable<object[]> GetCustomExceptions()
    {
        return new List<object[]>
        {
            new object[] { new InvalidDescriptionException("Example"), "Development" },
            new object[] { new InvalidEntityIdException("Example"), "Development" },
            new object[] { new InvalidDescriptionException("Example"), "Production" },
            new object[] { new InvalidEntityIdException("Example"), "Production" }
        };
    }

    private static ILogger<ExceptionMiddleware> CreateLoggerMock()
    {
        var mockEnvironment = new Mock<ILogger<ExceptionMiddleware>>();
        return mockEnvironment.Object;
    }

    private static IWebHostEnvironment CreateWebHostEnvironmentMock(string environmentName)
    {
        var mockEnvironment = new Mock<IWebHostEnvironment>();
        mockEnvironment
            .SetupGet(m => m.EnvironmentName)
            .Returns(environmentName);
        return mockEnvironment.Object;
    }
}