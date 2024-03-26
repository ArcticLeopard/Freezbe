using Microsoft.AspNetCore.Mvc;

namespace Freezbe.Api.Tests.Unit;

internal static class TestUtils
{
    public static T GetValueFromController<T>(ActionResult<T> result) where T : class => (result.Result as OkObjectResult).Value as T;
}