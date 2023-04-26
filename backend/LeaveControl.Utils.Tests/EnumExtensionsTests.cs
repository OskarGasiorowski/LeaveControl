namespace LeaveControl.Utils.Tests;

public enum TestEnum
{
    A,
    B,
    C,
    D,
    E
}

public class EnumExtensionsTests
{
    [Fact]
    public void In_WithValueInCheckAgainst_ReturnsTrue()
    {
        const TestEnum value = TestEnum.B;

        var result = value.In(TestEnum.A, TestEnum.B, TestEnum.C);

        Assert.True(result);
    }

    [Fact]
    public void In_WithValueNotInCheckAgainst_ReturnsFalse()
    {
        const TestEnum value = TestEnum.D;

        var result = value.In(TestEnum.A, TestEnum.B, TestEnum.C);

        Assert.False(result);
    }

    [Fact]
    public void In_WithEmptyCheckAgainst_ReturnsFalse()
    {
        const TestEnum value = TestEnum.E;

        var result = value.In();

        Assert.False(result);
    }
}