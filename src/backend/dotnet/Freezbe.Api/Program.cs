using Freezbe.Application.Extensions;
using Freezbe.Core.Extensions;
using Freezbe.Infrastructure.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services
       .AddCore()
       .AddApplication()
       .AddInfrastructure(builder.Configuration);

var app = builder.Build();
app.UseInfrastructure();

app.Run();