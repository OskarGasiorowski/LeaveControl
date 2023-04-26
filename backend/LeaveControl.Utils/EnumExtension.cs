namespace LeaveControl.Utils;

public static class EnumExtension
{
    public static bool In<TEnum>(this TEnum value, params TEnum[] valuesToCheck) where TEnum : Enum
    {
        return valuesToCheck.Any(e => e.Equals(value));
    }
}