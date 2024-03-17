namespace Freezbe.Infrastructure.Configurations.Providers;

public interface IConfigProvider
{
    ApplicationConfiguration Application { get; }
    DatabaseConfiguration Database { get; }
}