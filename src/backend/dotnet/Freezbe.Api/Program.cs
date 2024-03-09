using Freezbe.Application;
using Freezbe.Core;
using Freezbe.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

builder.Services
       .AddCore()
       .AddApplication()
       .AddInfrastructure(builder.Configuration);

var app = builder.Build();
app.UseInfrastructure();

app.Run();