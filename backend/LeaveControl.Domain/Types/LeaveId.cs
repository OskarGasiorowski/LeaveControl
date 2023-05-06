using Newtonsoft.Json;

namespace LeaveControl.Domain.Types;

[JsonConverter(typeof(LeaveIdJsonConverter))]
public readonly struct LeaveId
{
    public override int GetHashCode()
    {
        return _id.GetHashCode();
    }

    private readonly Guid _id;
    
    private LeaveId(Guid id)
    {
        _id = id;
    }

    public static implicit operator LeaveId(Guid id) => new(id);
    public static implicit operator Guid(LeaveId id) => id._id;
    public static bool operator ==(LeaveId left, LeaveId right) => left._id == right._id;
    public static bool operator !=(LeaveId left, LeaveId right) => !(left == right);

    public static LeaveId Generate() => Guid.NewGuid();

    public override string ToString()
    {
        return _id.ToString();
    }

    private bool Equals(LeaveId other)
    {
        return _id.Equals(other._id);
    }
    
    public override bool Equals(object obj)
    {
        return obj is LeaveId other && Equals(other);
    }
}

public class LeaveIdJsonConverter : JsonConverter<LeaveId>
{
    public override void WriteJson(JsonWriter writer, LeaveId value, JsonSerializer serializer)
    {
        writer.WriteValue(value.ToString());
    }

    public override LeaveId ReadJson(JsonReader reader, Type objectType, LeaveId existingValue, bool hasExistingValue, JsonSerializer serializer)
    {
        if (reader.TokenType != JsonToken.String)
        {
            throw new JsonSerializationException($"Expected a string token, but got {reader.TokenType}");
        }

        var guidString = (string)reader.Value;
        return Guid.Parse(guidString!);
    }
}