using System.Linq.Expressions;
using Marten;

namespace LeaveControl.Utils;

public static class CollectionExtensions
{
    public static async Task<T[]> ToArrayAsync<T>(this IQueryable<T> queryable,
        CancellationToken token = default)
    {
        var result = await queryable.ToListAsync(token);
        return result.ToArray();
    }
}