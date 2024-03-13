using Freezbe.Core.Exceptions;
using Freezbe.Core.ValueObjects;
using Shouldly;
using Xunit;

namespace Freezbe.Core.Tests.Unit.ValueObjects;

public class ProjectIdTests
{
    [Fact]
    public void WhenProjectIdReceivesAnEmptyGuidItShouldThrowAnInvalidEntityIdException()
    {
        //ARRANGE
        var emptyGuid = Guid.Empty;

        //ACT
        var exception = Record.Exception(() => new ProjectId(emptyGuid));

        //ASSERT
        exception.ShouldNotBeNull();
        exception.ShouldBeOfType<InvalidEntityIdException>();
    }

    [Fact]
    public void WhenProjectIdReceivesAnCorrectGuidItShouldAssignValue()
    {
        //ARRANGE
        var correctGuid = TestUtils.CreateCorrectGuid();

        //ACT
        var projectId = new ProjectId(correctGuid);

        //ASSERT
        projectId.ShouldNotBeNull();
        projectId.Value.ShouldNotBe(Guid.Empty);
        projectId.Value.ShouldBe(correctGuid);
    }
    
    [Fact]
    public void ImplicitConversionFromProjectIdToGuidShouldReturnCorrectValue()
    {
        // ARRANGE
        var correctGuid = TestUtils.CreateCorrectGuid();
        var projectId = new ProjectId(correctGuid);

        // ACT
        Guid result = projectId;

        // ASSERT
        result.ShouldBe(correctGuid);
    }
    
    [Fact]
    public void ImplicitConversionFromGuidToProjectIdShouldReturnCorrectValue()
    {
        // ARRANGE
        var correctGuid = TestUtils.CreateCorrectGuid();

        // ACT
        ProjectId result = correctGuid;

        // ASSERT
        result.ShouldNotBeNull();
        result.Value.ShouldBe(correctGuid);
    }
}