using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace LeaveControl.Api.ActionFilters;

public class InjectTenantIdAttribute : ActionFilterAttribute
{
    public override void OnActionExecuting(ActionExecutingContext context)
    {
        var tenantId = context.HttpContext.User?.FindFirst("tenant_id");
        if (tenantId == null)
        {
            context.Result = new UnauthorizedResult();
            return;
        }

        context.ActionArguments["tenantId"] = Guid.Parse(tenantId.Value);
        base.OnActionExecuting(context);
    }
}