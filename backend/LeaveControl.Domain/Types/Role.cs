using Newtonsoft.Json;

namespace LeaveControl.Domain.Types;

[JsonConverter(typeof(ToStringJsonConverter))]
public readonly struct Role
{
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
    public static explicit operator Role(string role) => new Role(role);
    
    public override string ToString() => _role;
}