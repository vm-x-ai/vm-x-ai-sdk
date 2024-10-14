
from vmxai import (
    CompletionRequest,
    RequestMessage,
    VMXClient,
)

client = VMXClient()

response = client.completion(
    request=CompletionRequest(
        resource="default",
        messages=[
            RequestMessage(
                role="user",
                content="Hey there!",
            )
        ],
    ),
    stream=False,
)

print("Non-Streaming Response")
print("#" * 100)
print(response.message)
