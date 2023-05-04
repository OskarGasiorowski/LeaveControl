using System.Data;
using Marten;

namespace LeaveControl.Infrastructure;

public class CustomSessionFactory: ISessionFactory
{
    private readonly IDocumentStore _store;
    private readonly IUserAccessor _userAccessor;
    
    public CustomSessionFactory(IDocumentStore store, IUserAccessor userAccessor)
    {
        _store = store;
        _userAccessor = userAccessor;
    }

    public IQuerySession QuerySession()
    {
        return _store.QuerySession();
    }

    public IDocumentSession OpenSession()
    {
        var tokenId = _userAccessor.GetCurrentTenantId();
        return tokenId == null 
            ? _store.LightweightSession(IsolationLevel.Serializable) 
            : _store.LightweightSession(tokenId.ToString()!, IsolationLevel.Serializable);
    }
}