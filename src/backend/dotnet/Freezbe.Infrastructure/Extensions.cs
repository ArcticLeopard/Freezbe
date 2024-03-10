using System.Text.RegularExpressions;
using Freezbe.Application.Abstractions;
using Freezbe.Infrastructure.Configurations;
using Freezbe.Infrastructure.DataAccessLayer;
using Freezbe.Infrastructure.Exceptions;
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
        services.AddSingleton<ExceptionMiddleware>();
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
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

    internal static string Underscore(this string input)
    {
        return Regex.Replace(Regex.Replace(Regex.Replace(input, @"([\p{Lu}]+)([\p{Lu}][\p{Ll}])", "$1_$2"), @"([\p{Ll}\d])([\p{Lu}])", "$1_$2"), @"[-\s]", "_").ToLower();
    }
}