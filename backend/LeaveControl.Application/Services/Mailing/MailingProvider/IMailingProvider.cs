using LeaveControl.Application.Services.Mailing.MailingProvider.Models;

namespace LeaveControl.Application.Services.Mailing.MailingProvider;

public interface IMailingProvider
{
    public Task Send(SendEmailModel model);
}