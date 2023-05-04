using System.Security.Claims;
using LeaveControl.Domain.Types;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace LeaveControl.Api.ActionFilters;

public class InjectUserIdAttribute : ActionFilterAttribute
{
    public override void OnActionExecuting(ActionExecutingContext context)
    {
        var userIdClaim = context.HttpContext.User?.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null)
        {
            context.Result = new UnauthorizedResult();
            return;
        }

        context.ActionArguments["userId"] = Guid.Parse(userIdClaim.Value);
        base.OnActionExecuting(context);
    }
}