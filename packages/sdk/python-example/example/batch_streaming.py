#!/usr/bin/env python
import asyncio
import traceback

from vmxai import VMXClient
from vmxai.types import CompletionRequest, RequestMessage


async def main():
    """Example demonstrating how to stream batch completion results."""
    client = VMXClient()
    print("Starting batch")

    # Create 100 completion requests
    requests = [
        CompletionRequest(
            messages=[
                RequestMessage(
                    role="user",
                    content="Hi",
                )
            ],
            resource="default",
        )
        for _ in range(10)
    ]

    # Submit the batch synchronously and stream the results
    async for message in client.completion_batch_sync(requests):
        if message.action == "batch-created":
            print('Batch item created', message.payload.batch_id, message.payload.status)
        elif message.action == "item-completed" or message.action == "item-failed":
            print('Batch item completed', message.payload.response.message, message.payload.status)
        elif message.action == "batch-completed" or message.action == "batch-failed":
            print('Batch completed', message.payload.batch_id, message.payload.status)


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except Exception as e:
        print(f"Error: {e}")
        traceback.print_exc()
        exit(1) 