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
    [JsonProperty("day")]
    public DateTime Day { get; private set; }
    [JsonProperty("type")]
    public DayType Type { get; private set; }

    [JsonConstructor]
    private LeaveDay(DateTime day, DayType type)
    {
        Day = day.Date;
        Type = type;
    }

    public static LeaveDay Full(DateTime day) => new(day, DayType.Full);
    public static LeaveDay FirstHalf(DateTime day) => new(day, DayType.FirstHalf);
    public static LeaveDay SecondHalf(DateTime day) => new(day, DayType.SecondHalf);

    public bool Overlaps(LeaveDay other)
    {
        if (Day != other.Day)
        {
            return false;
        }

        var overlapWithFullDay =
            Type == DayType.Full && other.Type.In(DayType.FirstHalf, DayType.SecondHalf, DayType.Full);
        var sameDayTyp = Type == other.Type;

        return overlapWithFullDay || sameDayTyp;
    }
}

public static class LeaveDayExtension
{
    public static bool Overlaps(this IEnumerable<LeaveDay> first, IEnumerable<LeaveDay> second)
    {
        return first.Any(f => second.Any(f.Overlaps));
    }
    
    public static bool WithinLimit(this IEnumerable<LeaveDay> first, IEnumerable<LeaveDay> second, int limit)
    {
        return first
            .GroupBy(leaveDay => leaveDay.Day.Year)
            .All(g =>
            {
                var numberOfDaysTakenInGivenYear = g.Count();
                return numberOfDaysTakenInGivenYear + second.Count(l => l.Day.Year == g.Key) <= limit;
            });;
    }
}