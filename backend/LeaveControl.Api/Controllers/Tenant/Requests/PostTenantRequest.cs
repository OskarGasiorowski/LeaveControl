using FluentValidation;

namespace LeaveControl.Api.Controllers.Tenant.Requests;

public record PostTenantRequest
{
    public string AdminEmail { get; set; } = default!;
    public string AdminPassword { get; set; } = default!;
}

public class PostTenantRequestValidator : AbstractValidator<PostTenantRequest>
{
    public PostTenantRequestValidator()
    {
        RuleFor(x => x.AdminEmail)
            .NotEmpty().WithMessage("Admin email is required.")
            .EmailAddress().WithMessage("Admin email must be a valid email address.");

        RuleFor(x => x.AdminPassword)
            .NotEmpty().WithMessage("Admin password is required.")
            .MinimumLength(8).WithMessage("Admin password must be at least 8 characters long.");
    }
}