#!/usr/bin/env python
import asyncio

from vmxai import VMXClient
from vmxai.types import CompletionRequest, RequestMessage


async def main():
    """Example demonstrating how to submit batch completion requests asynchronously."""
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

    # Submit the batch asynchronously
    response = await client.completion_batch(requests)
    print(f"Batch created: {response.batch_id}")

    # Wait for the batch to complete
    result = await client.wait_for_completion_batch(response.batch_id)
    for item in result.items:
        print(f"Batch item: {item.response.message}")


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except Exception as e:
        print(f"Error: {e}")
        exit(1) 