using Newtonsoft.Json;

namespace LeaveControl.Domain.Types;

public readonly struct Role
{
    [JsonProperty]
    private readonly string _role;

    [JsonConstructor]
    private Role(string role)
    {
        _role = role;
    }

    public static Role IncompleteAdmin() => new("IncompleteAdmin");
    public static Role Admin() => new("Admin");
    public static Role InvitedUser() => new("InvitedUser");
    public static Role User() => new("User");

    public static implicit operator string(Role role) => role.ToString();
    
    public override string ToString() => _role;
}