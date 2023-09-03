using JasperFx.Core;
using LeaveControl.Application.Services.Mailing.MailingProvider;
using LeaveControl.Application.Services.Mailing.MailingProvider.Models;
using LeaveControl.Application.Services.Mailing.Models;
using Microsoft.Extensions.Options;

namespace LeaveControl.Application.Services.Mailing;

public interface IMailingService
{
    public Task InviteUser(InviteUserModel model);
}

public class MailingService: IMailingService
{
    private readonly IMailingProvider _mailingProvider;
    private readonly AppSettings _settings;

    public MailingService(IMailingProvider mailingProvider, IOptions<AppSettings> settings)
    {
        _mailingProvider = mailingProvider;
        _settings = settings.Value;
    }

    public async Task InviteUser(InviteUserModel model)
    {
        await _mailingProvider.Send(
            new SendEmailModel(
                "",
                model.To,
                "You've been invited to LeaveControl",
                $"${_settings.FrontendUrl}/invite/setup/token?value={model.Jwt}"
            )
        );
    }
}