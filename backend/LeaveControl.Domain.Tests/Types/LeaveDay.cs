using LeaveControl.Domain.Types;

namespace LeaveControl.Domain.Tests.Types;

public class LeaveDayTests
{
    [Fact]
    public void Overlaps_WithDifferentDays_ReturnsFalse()
    {
        var day1 = LeaveDay.Full(DateTime.Today);
        var day2 = LeaveDay.Full(DateTime.Today.AddDays(1));

        Assert.False(day1.Overlaps(day2));
    }

    [Fact]
    public void Overlaps_WithFullAndFirstHalfOnSameDay_ReturnsTrue()
    {
        var day1 = LeaveDay.Full(DateTime.Today);
        var day2 = LeaveDay.FirstHalf(DateTime.Today);

        Assert.True(day1.Overlaps(day2));
    }

    [Fact]
    public void Overlaps_WithFullAndSecondHalfOnSameDay_ReturnsTrue()
    {
        var day1 = LeaveDay.Full(DateTime.Today);
        var day2 = LeaveDay.SecondHalf(DateTime.Today);

        Assert.True(day1.Overlaps(day2));
    }

    [Fact]
    public void Overlaps_WithFirstHalfAndSecondHalfOnSameDay_ReturnsFalse()
    {
        var day1 = LeaveDay.FirstHalf(DateTime.Today);
        var day2 = LeaveDay.SecondHalf(DateTime.Today);

        Assert.False(day1.Overlaps(day2));
    }

    [Fact]
    public void Overlaps_WithSameTypeOnSameDay_ReturnsTrue()
    {
        var day1 = LeaveDay.Full(DateTime.Today);
        var day2 = LeaveDay.Full(DateTime.Today);

        Assert.True(day1.Overlaps(day2));
    }
    
    [Fact]
    public void Overlaps_WithFullAndFirstHalfOnDifferentDays_ReturnsFalse()
    {
        var day1 = LeaveDay.Full(DateTime.Today);
        var day2 = LeaveDay.FirstHalf(DateTime.Today.AddDays(1));

        Assert.False(day1.Overlaps(day2));
    }

    [Fact]
    public void Overlaps_WithFullAndSecondHalfOnDifferentDays_ReturnsFalse()
    {
        var day1 = LeaveDay.Full(DateTime.Today);
        var day2 = LeaveDay.SecondHalf(DateTime.Today.AddDays(1));

        Assert.False(day1.Overlaps(day2));
    }

    [Fact]
    public void Overlaps_WithFirstHalfAndSecondHalfOnDifferentDays_ReturnsFalse()
    {
        var day1 = LeaveDay.FirstHalf(DateTime.Today);
        var day2 = LeaveDay.SecondHalf(DateTime.Today.AddDays(1));

        Assert.False(day1.Overlaps(day2));
    }
}

public class LeaveDayExtensionTests
{
    [Fact]
    public void Overlaps_WithOverlap_ReturnsTrue()
    {
        var firstList = new List<LeaveDay>
        {
            LeaveDay.Full(DateTime.Today),
            LeaveDay.FirstHalf(DateTime.Today.AddDays(1))
        };

        var secondList = new List<LeaveDay>
        {
            LeaveDay.SecondHalf(DateTime.Today.AddDays(2)),
            LeaveDay.FirstHalf(DateTime.Today)
        };

        Assert.True(firstList.Overlaps(secondList));
    }

    [Fact]
    public void Overlaps_WithoutOverlap_ReturnsFalse()
    {
        var firstList = new List<LeaveDay>
        {
            LeaveDay.Full(DateTime.Today),
            LeaveDay.FirstHalf(DateTime.Today.AddDays(1))
        };

        var secondList = new List<LeaveDay>
        {
            LeaveDay.SecondHalf(DateTime.Today.AddDays(1)),
            LeaveDay.FirstHalf(DateTime.Today.AddDays(2))
        };

        Assert.False(firstList.Overlaps(secondList));
    }
    
    [Fact]
    public void Overlaps_WithOverlapInFullAndHalfDays_ReturnsTrue()
    {
        var firstList = new List<LeaveDay>
        {
            LeaveDay.Full(DateTime.Today),
            LeaveDay.FirstHalf(DateTime.Today.AddDays(1))
        };

        var secondList = new List<LeaveDay>
        {
            LeaveDay.FirstHalf(DateTime.Today),
            LeaveDay.SecondHalf(DateTime.Today.AddDays(1))
        };

        Assert.True(firstList.Overlaps(secondList));
    }

    [Fact]
    public void Overlaps_WithOverlapInHalfDays_ReturnsTrue()
    {
        var firstList = new List<LeaveDay>
        {
            LeaveDay.FirstHalf(DateTime.Today),
            LeaveDay.SecondHalf(DateTime.Today.AddDays(1))
        };

        var secondList = new List<LeaveDay>
        {
            LeaveDay.SecondHalf(DateTime.Today),
            LeaveDay.FirstHalf(DateTime.Today.AddDays(1))
        };

        Assert.False(firstList.Overlaps(secondList));
    }

    [Fact]
    public void Overlaps_WithOverlapInFullDays_ReturnsTrue()
    {
        var firstList = new List<LeaveDay>
        {
            LeaveDay.Full(DateTime.Today),
            LeaveDay.Full(DateTime.Today.AddDays(1))
        };

        var secondList = new List<LeaveDay>
        {
            LeaveDay.Full(DateTime.Today.AddDays(1)),
            LeaveDay.Full(DateTime.Today.AddDays(2))
        };

        Assert.True(firstList.Overlaps(secondList));
    }

    [Fact]
    public void Overlaps_WithoutOverlapDueToDifferentDays_ReturnsFalse()
    {
        var firstList = new List<LeaveDay>
        {
            LeaveDay.Full(DateTime.Today),
            LeaveDay.FirstHalf(DateTime.Today.AddDays(1))
        };

        var secondList = new List<LeaveDay>
        {
            LeaveDay.SecondHalf(DateTime.Today.AddDays(3)),
            LeaveDay.FirstHalf(DateTime.Today.AddDays(4))
        };

        Assert.False(firstList.Overlaps(secondList));
    }

    [Fact]
    public void Overlaps_WithoutOverlapDueToDifferentTypes_ReturnsFalse()
    {
        var firstList = new List<LeaveDay>
        {
            LeaveDay.FirstHalf(DateTime.Today),
            LeaveDay.FirstHalf(DateTime.Today.AddDays(1))
        };

        var secondList = new List<LeaveDay>
        {
            LeaveDay.SecondHalf(DateTime.Today),
            LeaveDay.SecondHalf(DateTime.Today.AddDays(1))
        };

        Assert.False(firstList.Overlaps(secondList));
    }

    [Fact]
    public void Overlaps_WithEmptyLists_ReturnsFalse()
    {
        var firstList = new List<LeaveDay>();
        var secondList = new List<LeaveDay>();

        Assert.False(firstList.Overlaps(secondList));
    }
}