using LeaveControl.Domain.Types;

namespace LeaveControl.Domain.Tests.Types;

public class EmailTests
{
    [Theory]
    [InlineData("johndoe@example.com")]
    [InlineData("jane_doe@example.co.uk")]
    [InlineData("test.email@example-domain.com")]
    public void ValidEmail_CreatesEmailRecord(string email)
    {
        // Test if the email record can be created without throwing an exception
        var exception = Record.Exception(() => new Email(email));

        Assert.Null(exception);
    }
    
    [Theory]
    [InlineData(null)]
    [InlineData("")]
    [InlineData("   ")]
    [InlineData("plainaddress")]
    [InlineData("@missingusername.com")]
    [InlineData("missingdomain@.com")]
    [InlineData("missingtld@example.")]
    public void InvalidEmail_ThrowsArgumentException(string email)
    {
        Assert.Throws<ArgumentException>(() => new Email(email));
    }
}