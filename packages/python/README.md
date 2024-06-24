# VM-X SDK for Python

## Description

VM-X AI SDK client for Python

## Installation

```bash
pip install vm-x-ai-sdk
```

```bash
poetry add vm-x-ai-sdk
```

## Usage

```python

from vmxai import (
    CompletionRequest,
    RequestMessage,
    RequestMessageToolCall,
    RequestMessageToolCallFunction,
    RequestToolFunction,
    RequestTools,
    VMXClient,
    VMXClientOAuth,
)

client = VMXClient(
    domain="env-abc123.clnt.dev.vm-x.ai",
    environment_id="env-abc123",
    workspace_id="ws-abc123",
    # Authentication options
    # OAuth Client credentials
    auth=VMXClientOAuth(
        client_id="abc123",
        client_secret="abc123",
    ),
    # Or API Key
    api_key="abc123",
)

# Streaming
streaming_response = client.completion(
    request=CompletionRequest(
        resource="default",
        workload="default",
        messages=[
            RequestMessage(
                role="user",
                content="Hey there!",
            )
        ],
    ),
)

for message in streaming_response:
    print(message.message, end="")


# Non-Streaming
response = client.completion(
    request=CompletionRequest(
        resource="default",
        workload="default",
        messages=[
            RequestMessage(
                role="user",
                content="Hey there!",
            )
        ],
    ),
    stream=False,
)

print("\n")
print(response.message)

# Function Calling
function_response = client.completion(
    request=CompletionRequest(
        resource="default",
        workload="default",
        messages=[
            RequestMessage(
                role="user",
                content="whats the temperature in Dallas, New York and San Diego?",
            )
        ],
        tools=[
            RequestTools(
                type="function",
                function=RequestToolFunction(
                    name="get_weather",
                    description="Lookup the temperature",
                    parameters={
                        "type": "object",
                        "properties": {"city": {"description": "City you want to get the temperature"}},
                        "required": ["city"],
                    },
                ),
            )
        ],
    ),
)

for message in function_response:
    print(message, end="")

# Function Calling Callback
function_response_callback = client.completion(
    request=CompletionRequest(
        resource="default",
        workload="default",
        messages=[
            RequestMessage(
                role="user",
                content="whats the temperature in Dallas, New York and San Diego?",
            ),
            RequestMessage(
                role="assistant",
                tool_calls=[
                    RequestMessageToolCall(
                        id="call_NLcWB6VCdG6x9UW6xrGVTTTR",
                        type="function",
                        function=RequestMessageToolCallFunction(name="get_weather", arguments='{"city": "Dallas"}'),
                    ),
                    RequestMessageToolCall(
                        id="call_6RDTuEDsaHvWr8XjwDXx4UjX",
                        type="function",
                        function=RequestMessageToolCallFunction(name="get_weather", arguments='{"city": "New York"}'),
                    ),
                    RequestMessageToolCall(
                        id="call_NsFzeGVbAWl5bor6RrUDCvTv",
                        type="function",
                        function=RequestMessageToolCallFunction(name="get_weather", arguments='{"city": "San Diego"}'),
                    )
                ],
            ),
            RequestMessage(
                role="tool",
                content="The temperature in Dallas is 81F",
                tool_call_id="call_NLcWB6VCdG6x9UW6xrGVTTTR"
            ),
            RequestMessage(
                role="tool",
                content="The temperature in New York is 78F",
                tool_call_id="call_6RDTuEDsaHvWr8XjwDXx4UjX"
            ),
            RequestMessage(
                role="tool",
                content="The temperature in San Diego is 68F",
                tool_call_id="call_NsFzeGVbAWl5bor6RrUDCvTv"
            ),
        ],
        tools=[
            RequestTools(
                type="function",
                function=RequestToolFunction(
                    name="get_weather",
                    description="Lookup the temperature",
                    parameters={
                        "type": "object",
                        "properties": {"city": {"description": "City you want to get the temperature"}},
                        "required": ["city"],
                    },
                ),
            )
        ],
    ),
)

for message in function_response_callback:
    print(message.message, end="")

```

## [Change Log](./CHANGELOG.md)
