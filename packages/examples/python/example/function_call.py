
from vmxai import (
    CompletionRequest,
    RequestMessage,
    RequestMessageToolCall,
    RequestMessageToolCallFunction,
    RequestToolFunction,
    RequestTools,
    VMXClient,
)

client = VMXClient()

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

print("Function Response")
print("#" * 100)
for message in function_response:
    print(message, end="")

print("\n" * 2)

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
                    ),
                ],
            ),
            RequestMessage(
                role="tool", content="The temperature in Dallas is 81F", tool_call_id="call_NLcWB6VCdG6x9UW6xrGVTTTR"
            ),
            RequestMessage(
                role="tool", content="The temperature in New York is 78F", tool_call_id="call_6RDTuEDsaHvWr8XjwDXx4UjX"
            ),
            RequestMessage(
                role="tool", content="The temperature in San Diego is 68F", tool_call_id="call_NsFzeGVbAWl5bor6RrUDCvTv"
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

print("Function Callback Response")
print("#" * 100)
for message in function_response_callback:
    print(message.message, end="")

print("\n" * 2)
