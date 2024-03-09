using Freezbe.Application.Abstractions;
using Freezbe.Infrastructure.Configurations;
using Freezbe.Infrastructure.DataAccessLayer;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Freezbe.Infrastructure;

public static class Extensions
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddControllers();
        services.AddConfigurations(configuration);
        // Learn more about configuring Swagger/OpenA   PI at https://aka.ms/aspnetcore/swashbuckle
        services.AddDataAccessLayer();
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();

        services.AddQueryHandlers();

        //services.AddSingleton<Interface, Implementation>();
        //services.AddScoped<Interface, Implementation>();
        //services.AddTransient<Interface, Implementation>();
        return services;
    }

    public static WebApplication UseInfrastructure(this WebApplication app)
    {
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

    private static IServiceCollection AddQueryHandlers(this IServiceCollection services)
    {
        var currentAssembly = typeof(ApplicationConfiguration).Assembly;

        services
        .Scan(s => s.FromAssemblies(currentAssembly)
        .AddClasses(c => c.AssignableTo(typeof(IQueryHandler<,>)))
        .AsImplementedInterfaces()
        .WithScopedLifetime());

        return services;
    }
}