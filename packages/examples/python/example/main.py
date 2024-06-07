
from vmxai import CompletionRequest, RequestMessage, VMXClient, VMXClientOAuth

client = VMXClient(
    domain="env-abc123.clnt.dev.vm-x.ai",
    environment_id="env-abc123",
    workspace_id="ws-abc123",
    auth=VMXClientOAuth(
        client_id="abc123",
        client_secret="abc123",
    ),
)

# Streaming
streaming_response = client.completion(
    request=CompletionRequest(
        resource="resource1-openai-gpt-3-5-turbo",
        workload="high1",
        messages=[
            RequestMessage(
                role="user",
                content="Hey there!",
            )
        ],
    ),
)

for message in streaming_response:
    print(message.message)


# Non-Streaming
response = client.completion(
    request=CompletionRequest(
        resource="resource1-openai-gpt-3-5-turbo",
        workload="high1",
        messages=[
            RequestMessage(
                role="user",
                content="Hey there!",
            )
        ],
    ),
    stream=False,
)

print(response.message)