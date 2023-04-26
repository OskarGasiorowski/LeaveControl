namespace LeaveControl.Domain.Types;

public readonly struct Reason
{
    private readonly string _reason;

    private Reason(string reason)
    {
        _reason = reason;
    }
    
    public static implicit operator Reason(string reason) => new(reason);
    public static implicit operator string(Reason reason) => reason.ToString();

    public override string ToString()
    {
        return _reason;
    }
}