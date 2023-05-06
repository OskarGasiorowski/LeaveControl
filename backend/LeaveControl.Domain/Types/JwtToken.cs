namespace LeaveControl.Domain.Types;

// TODO JWT already have "token" in acronym, think about better nmae
public readonly struct JwtToken
{
    private readonly string _token;

    public JwtToken(string token)
    {
        _token = token;
    }
    
    public static implicit operator JwtToken(string token) => new(token);
    public static implicit operator string(JwtToken token) => token.ToString();

    public override string ToString()
    {
        return _token;
    }
}