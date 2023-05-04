using LeaveControl.Domain.Types;

namespace LeaveControl.Domain.Tests.Types;

public class PasswordTests
{
    [Theory]
    [InlineData("password123")]
    [InlineData("P@$$w0rd")]
    [InlineData("Abcdefghijklmnopqrstuvwxyz1234567890")]
    public void ValidPassword_CreatesPasswordRecord(string password)
    {
        var exception = Record.Exception(() => new Password(password));

        Assert.Null(exception);
    }

    [Theory]
    [InlineData(null)]
    [InlineData("")]
    [InlineData("   ")]
    [InlineData("short")]
    [InlineData("abc123")]
    public void InvalidPassword_ThrowsArgumentException(string password)
    {
        Assert.Throws<ArgumentException>(() => new Password(password));
    }
}