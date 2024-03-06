using Microsoft.Extensions.DependencyInjection;

namespace Freezbe.Infrastructure;

public static class Extensions
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services)
    {
        //services.AddSingleton<Interface, Implementation>();
        //services.AddScoped<Interface, Implementation>();
        //services.AddTransient<Interface, Implementation>();
        return services;
    }
}