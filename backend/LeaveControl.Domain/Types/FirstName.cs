using Newtonsoft.Json;

namespace LeaveControl.Domain.Types;

public readonly struct FirstName
{
    [JsonProperty]
    private readonly string _firstName;
    
    public FirstName(string firstName)
    {
        if (string.IsNullOrWhiteSpace(firstName))
        {
            throw new ArgumentException("First name cannot be null or empty.", nameof(firstName));
        }

        if (firstName.Length > 50)
        {
            throw new ArgumentException("First name length cannot be greater thant 50.", nameof(firstName));
        }

        _firstName = firstName;
    }

    public static implicit operator FirstName(string firstName) => new(firstName);
    public static implicit operator string(FirstName firstName) => firstName.ToString();

    public override string ToString()
    {
        return _firstName;
    }
}