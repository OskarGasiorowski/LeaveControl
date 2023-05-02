using Newtonsoft.Json;

namespace LeaveControl.Domain.Types;

[JsonConverter(typeof(UserIdConverter))]
public struct UserId
{
    private readonly Guid _id;

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

public class UserIdConverter : JsonConverter
{
    public override bool CanConvert(Type objectType)
    {
        return objectType == typeof(UserId);
    }

    public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
    {
        var userId = (UserId)value;
        writer.WriteValue((Guid)userId);
    }

    public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
    {
        var guidString = (string)reader.Value;
        var guid = Guid.Parse(guidString);
        return (UserId)guid;
    }
}