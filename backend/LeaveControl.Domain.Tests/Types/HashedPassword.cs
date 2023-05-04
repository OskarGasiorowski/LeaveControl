using LeaveControl.Domain.Types;

namespace LeaveControl.Domain.Tests.Types;

public class PasswordHasherTests
{
    [Fact]
    public void HashPassword_GeneratesDifferentHashesForSamePassword()
    {
        Password password = "P@$$w0rd";

        string hashedPassword1 = HashedPassword.Create(password);
        string hashedPassword2 = HashedPassword.Create(password);

        Assert.NotEqual(hashedPassword1, hashedPassword2);
    }

    [Fact]
    public void VerifyPassword_CorrectPassword_ReturnsTrue()
    {
        Password password = "P@$$w0rd";
        var hashedPassword = HashedPassword.Create(password);

        var isCorrectPassword = hashedPassword.Varify(password);

        Assert.True(isCorrectPassword);
    }

    [Fact]
    public void VerifyPassword_IncorrectPassword_ReturnsFalse()
    {
        Password password = "P@$$w0rd";
        var hashedPassword = HashedPassword.Create(password);

        Password incorrectPassword = "WrongP@$$w0rd";
        var isCorrectPassword = hashedPassword.Varify(incorrectPassword);

        Assert.False(isCorrectPassword);
    }
}