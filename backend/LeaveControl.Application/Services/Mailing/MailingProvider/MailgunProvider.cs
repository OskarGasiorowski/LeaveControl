using LeaveControl.Application.Services.Mailing.MailingProvider.Models;
using Microsoft.Extensions.Options;
using RestSharp;
using RestSharp.Authenticators;

namespace LeaveControl.Application.Services.Mailing.MailingProvider;

public class MailgunProvider : IMailingProvider
{
    private readonly MailgunSettings _settings;

    public MailgunProvider(IOptions<MailgunSettings> settings)
    {
        _settings = settings.Value;
    }

    public async Task Send(SendEmailModel model)
    {
        var client = new RestClient(_settings.Endpoint, options =>
        {
            options.Authenticator =
                new HttpBasicAuthenticator("api", _settings.ApiKey);
        });

        var request = new RestRequest($"{_settings.Domain}/messages")
            .AddParameter("from", $"Test <mailgun@{_settings.Domain}>")
            .AddParameter("to", "oskar@gasiorowski.ovh")
            .AddParameter("subject", model.Subject)
            .AddParameter("text", model.Content);

        var result = await client.PostAsync(request);
    }
} 