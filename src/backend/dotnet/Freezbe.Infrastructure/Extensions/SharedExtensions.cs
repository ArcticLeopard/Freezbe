using System.Reflection;
using Freezbe.Infrastructure.Middlewares;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Freezbe.Infrastructure.Extensions;

public static class SharedExtensions
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddControllers();
        services.AddConfigurations(configuration);
        services.AddDataAccessLayer(configuration);
        services.AddMiddlewares();
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();
        services.AddMediatR(serviceConfiguration =>
        {
            serviceConfiguration.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly());
        });
        //services.AddSingleton<Interface, Implementation>();
        //services.AddScoped<Interface, Implementation>();
        //services.AddTransient<Interface, Implementation>();
        return services;
    }

    public static WebApplication UseInfrastructure(this WebApplication app)
    {
        app.UseMiddleware<ExceptionMiddleware>();
        // Configure the HTTP request pipeline.
        if(app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();

        app.UseAuthorization();

        app.MapControllers();
        return app;
    }
}