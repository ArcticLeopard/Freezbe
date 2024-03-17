using Microsoft.Extensions.DependencyInjection;

namespace Freezbe.Core.Extensions;

public static class SharedExtensions
{
    public static IServiceCollection AddCore(this IServiceCollection services)
    {
        //services.AddSingleton<Interface, Implementation>();
        //services.AddScoped<Interface, Implementation>();
        //services.AddTransient<Interface, Implementation>();
        return services;
    }
}