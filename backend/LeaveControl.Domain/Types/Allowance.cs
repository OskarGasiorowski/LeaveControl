using Newtonsoft.Json;

namespace LeaveControl.Domain.Types;

public readonly struct Allowance
{
    [JsonProperty]
    private readonly int _allowance;
    
    public Allowance(int allowance)
    {
        if (allowance is < 0 or > 365)
        {
            throw new ArgumentException("Default allowance must be between 0 and 365 days.", nameof(allowance));
        }

        _allowance = allowance;
    }

    public static implicit operator Allowance(int allowance) => new(allowance);
    public static implicit operator int(Allowance allowance) => allowance._allowance;
}