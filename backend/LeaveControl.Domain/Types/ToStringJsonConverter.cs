using System.Reflection;
using Newtonsoft.Json;

namespace LeaveControl.Domain.Types;

public class ToStringJsonConverter : JsonConverter
{
    public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
    {
        writer.WriteValue(value.ToString());
    }

    public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
    {
        if (reader.TokenType != JsonToken.String)
        {
            throw new JsonSerializationException($"Expected a string token, but got {reader.TokenType}");
        }

        return Activator.CreateInstance(objectType, BindingFlags.Instance | BindingFlags.NonPublic, null, new[] { reader.Value }, null);
    }

    public override bool CanRead => false;

    public override bool CanConvert(Type objectType) => true;
}