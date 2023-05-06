using System.Text.RegularExpressions;
using Newtonsoft.Json;

namespace LeaveControl.Domain.Types;

public readonly struct Email
{
    [JsonProperty]
    private readonly string _email;
    private static readonly Regex EmailRegex = new(
        @"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$",
        RegexOptions.Compiled | RegexOptions.IgnoreCase);
    
    public Email(string email)
    {
        if (string.IsNullOrWhiteSpace(email))
        {
            throw new ArgumentException("Email address cannot be null or empty.", nameof(email));
        }

        if (!IsValidEmail(email))
        {
            throw new ArgumentException("Invalid email address.", nameof(email));
        }

        _email = email;
    }

    public static implicit operator Email(string email) => new(email);
    public static implicit operator string(Email emailAddress) => emailAddress.ToString();
    public static bool operator ==(Email left, Email right) => left._email == right._email;
    public static bool operator !=(Email left, Email right) => !(left == right);
    public static bool operator ==(string left, Email right) => left == right._email;
    public static bool operator !=(string left, Email right) => !(left == right);
    public static bool operator ==(Email left, string right) => left._email == right;
    public static bool operator !=(Email left, string right) => !(left == right);
    
    public override string ToString()
    {
        return _email;
    }

    private static bool IsValidEmail(string email)
    {
        return EmailRegex.IsMatch(email);
    }
}