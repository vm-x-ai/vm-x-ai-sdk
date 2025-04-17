#!/usr/bin/env python
import asyncio

from vmxai import VMXClient


async def main():
    """Example demonstrating how to get and wait for batch completion results."""
    client = VMXClient()
    print("Get batch status")

    batch_id = "91369a41-c97f-4177-b67d-f3d98e477814"
    response = await client.get_completion_batch_result(batch_id)
    print(f"Batch status: {response.status}")

    result = await client.wait_for_completion_batch(batch_id)
    for item in result.items:
        print(f"Batch item: {item.response.message}")


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except Exception as e:
        print(f"Error: {e}")
        exit(1) 