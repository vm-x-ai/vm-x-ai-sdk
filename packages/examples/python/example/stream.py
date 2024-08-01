
from vmxai import (
    CompletionRequest,
    RequestMessage,
    VMXClient,
)

client = VMXClient()

streaming_response = client.completion(
    request=CompletionRequest(
        resource="default",
        messages=[
            RequestMessage(
                role="user",
                content="Hey there!",
            )
        ],
    ),
)

print("Streaming Response")
print("#" * 100)
for message in streaming_response:
    print(message.message, end="", flush=True)
