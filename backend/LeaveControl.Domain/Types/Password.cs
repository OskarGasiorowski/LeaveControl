using System.Text.Json.Serialization;

namespace LeaveControl.Domain.Types;

[JsonConverter(typeof(ToStringJsonConverter))]
public readonly struct Password
{
    private readonly string _password;

    [JsonConstructor]
    public Password(string password)
    {
        if (string.IsNullOrWhiteSpace(password))
        {
            throw new ArgumentException("Password cannot be null or empty.", nameof(password));
        }

        if (!IsValidPassword(password))
        {
            throw new ArgumentException("Invalid password.", nameof(password));
        }

        _password = password;
    }

    public static implicit operator Password(string password) => new(password);
    public static implicit operator string(Password password) => password.ToString();

    //TODO replaced until email notification system is created
    // public static Password Random() => new(Guid.NewGuid().ToString());

    public static Password Random() => new("12345678");

    public HashedPassword GenerateHash()
    {
        return HashedPassword.Create(this);
    }

    public override string ToString()
    {
        return _password;
    }

    private static bool IsValidPassword(string password)
    {
        return password.Length >= 8;
    }
}