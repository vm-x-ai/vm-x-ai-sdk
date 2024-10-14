import asyncio
from typing import Iterator

from blessings import Terminal
from vmxai import (
    CompletionRequest,
    CompletionResponse,
    RequestMessage,
    VMXClient,
)

term = Terminal()
client = VMXClient()


async def print_streaming_response(response: asyncio.Task[Iterator[CompletionResponse]], term_location: int):
    """
    Print a streaming response to the terminal at a specific terminal location.
    So, we can demonstrate multiple streaming responses in parallel.

    Args:
        response (asyncio.Task[Iterator[CompletionResponse]]): Streaming response task
        term_location (int): Terminal location to print the response
    """
    first = True
    with term.location(y=term_location):
        result = await response
        x = 0
        y = term_location + 3
        for message in result:
            if first:
                print("\nModel: ", message.metadata.model)
                first = False
                # Some models start with 2 new lines, this is to remove them
                if message.message.startswith("\n\n"):
                    message.message = message.message[2:]

            await asyncio.sleep(0.01)
            print(term.move(y, x) + message.message)
            x += len(message.message)
            if x > term.width:
                x = 0
                y += 1


async def multi_answer():
    # Please make sure that the "default" resource have 3 providers configured in the VM-X Console.
    resp1, resp2, resp3 = client.completion(
        request=CompletionRequest(
            resource="default",
            messages=[
                RequestMessage(
                    role="user",
                    content="Hey there, how are you?",
                )
            ],
        ),
        multi_answer=True,
    )

    print("Multi-Answer Streaming Response")
    print("#" * 100)
    await asyncio.gather(
        *[print_streaming_response(resp1, 10), print_streaming_response(resp2, 16), print_streaming_response(resp3, 20)]
    )
    print("\n" * 7)

    resp1, resp2, resp3 = client.completion(
        request=CompletionRequest(
            resource="default",
            messages=[
                RequestMessage(
                    role="user",
                    content="Hey there, how are you?",
                )
            ],
        ),
        stream=False,
        multi_answer=True,
    )

    print("Multi-Answer Non-Streaming Response")
    print("#" * 100)

    async def _print(resp):
        result = await resp
        print(result.message, flush=True)

    await asyncio.gather(*[_print(resp1), _print(resp2), _print(resp3)])


asyncio.run(multi_answer())
