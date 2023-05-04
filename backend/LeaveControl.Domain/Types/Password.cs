namespace LeaveControl.Domain.Types;

public readonly struct Password
{
    private readonly string _password;

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