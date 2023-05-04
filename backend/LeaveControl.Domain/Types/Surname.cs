using Newtonsoft.Json;

namespace LeaveControl.Domain.Types;

public readonly struct Surname
{
    [JsonProperty]
    private readonly string _surname;
    
    public Surname(string surname)
    {
        if (string.IsNullOrWhiteSpace(surname))
        {
            throw new ArgumentException("Surname cannot be null or empty.", nameof(surname));
        }
        
        if (surname.Length > 50)
        {
            throw new ArgumentException("Surname length cannot be greater thant 50.", nameof(surname));
        }

        _surname = surname;
    }

    public static implicit operator Surname(string surname) => new(surname);
    public static implicit operator string(Surname surname) => surname.ToString();

    public override string ToString()
    {
        return _surname;
    }
}