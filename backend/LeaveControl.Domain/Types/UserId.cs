using Newtonsoft.Json;

namespace LeaveControl.Domain.Types;

public readonly struct UserId
{
     [JsonProperty]
     private readonly Guid _id;
 
     [JsonConstructor]
     private UserId(Guid id)
     {
         _id = id;
     }
     
     public static implicit operator UserId(Guid id) => new(id);
     public static implicit operator Guid(UserId id) => id._id;
 
     public static UserId Generate() => Guid.NewGuid();
 
     public override string ToString()
     {
         return _id.ToString();
     }
 }