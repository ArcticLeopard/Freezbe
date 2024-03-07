using Microsoft.AspNetCore.Mvc;

namespace Freezbe.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class AssignmentsController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok("Coming soon...");
    }
    
    [HttpPost]
    public IActionResult Post()
    {
        return Ok("Coming soon...");
    }
}