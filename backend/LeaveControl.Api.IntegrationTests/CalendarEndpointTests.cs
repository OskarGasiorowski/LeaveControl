using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using LeaveControl.Api.Controllers.Calendar.Requests;

namespace LeaveControl.Api.IntegrationTests;

public class CalendarEndpointTests : HttpFixtureBase
{
    public CalendarEndpointTests(ApiTestFixture fixture) : base(fixture)
    {
    }

    [Fact]
    public async Task PostLeaveRequest_WithMultipleLeaveEntries_ReturnsOkStatusCode()
    {
        var client = Fixture.CreateClient();
        var token = await PrepareAdminAndGetToken();
        var baseDate = new DateTime(2023, 5, 10);
        
        var request = new HttpRequestMessage(HttpMethod.Post, "/calendar/me/leave");
        request.Content = JsonContent.Create(new PostLeaveRequest
        {
            Reason = "Test reason 1",
            Entry = new []
            {
                new LeaveEntry
                {
                    Date = baseDate,
                    Type = LeaveEntryType.Full,
                },
                new LeaveEntry
                {
                    Date = baseDate.AddDays(1),
                    Type = LeaveEntryType.Full,
                },
                new LeaveEntry
                {
                    Date = baseDate.AddDays(2),
                    Type = LeaveEntryType.Full,
                }
            }
        });
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);
        var response = await client.SendAsync(request);
        
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }
}