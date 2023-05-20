using Newtonsoft.Json;

namespace LeaveControl.Domain.Types;

[JsonConverter(typeof(ToStringJsonConverter))]
public readonly struct UserId
{
    private readonly Guid _id;
    
     private UserId(Guid id)
     {
         _id = id;
     }
     
     [JsonConstructor]
     private UserId(string id)
     {
         _id = Guid.Parse(id);
     }
     
     public static implicit operator UserId(Guid id) => new(id);
     public static explicit operator UserId(string id) => new(Guid.Parse(id));
     public static implicit operator Guid(UserId id) => id._id;

     public static UserId Generate() => Guid.NewGuid();
 
     public override string ToString()
     {
         return _id.ToString();
     }
 }