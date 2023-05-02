using LeaveControl.Utils;
using Newtonsoft.Json;

namespace LeaveControl.Domain.Types;

public enum DayType
{
    Full,
    FirstHalf,
    SecondHalf,
}

public record LeaveDay
{
    [JsonProperty]
    private readonly DateTime _day;
    [JsonProperty]
    private readonly DayType _type;

    [JsonConstructor]
    private LeaveDay(DateTime day, DayType type)
    {
        _day = day.Date;
        _type = type;
    }

    public static LeaveDay Full(DateTime day) => new(day, DayType.Full);
    public static LeaveDay FirstHalf(DateTime day) => new(day, DayType.FirstHalf);
    public static LeaveDay SecondHalf(DateTime day) => new(day, DayType.SecondHalf);

    public bool Overlaps(LeaveDay other)
    {
        if (_day != other._day)
        {
            return false;
        }

        var overlapWithFullDay =
            _type == DayType.Full && other._type.In(DayType.FirstHalf, DayType.SecondHalf, DayType.Full);
        var sameDayTyp = _type == other._type;

        return overlapWithFullDay || sameDayTyp;
    }
}

public static class LeaveDayExtension
{
    public static bool Overlaps(this IEnumerable<LeaveDay> first, IEnumerable<LeaveDay> second)
    {
        return first.Any(f => second.Any(f.Overlaps));
    }
}