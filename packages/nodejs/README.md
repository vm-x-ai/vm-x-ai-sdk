# @vm-x-ai/sdk

## Description

VM-X AI SDK client for Node.js

## Installation

```bash
pnpm add @vm-x-ai/sdk
```

```bash
npm install @vm-x-ai/sdk
```

```bash
yarn add @vm-x-ai/sdk
```

## Create VMXClient

```typescript
import { VMXClient, VMXClientOAuth } from '@vm-x-ai/sdk';

const client = new VMXClient({
  domain: 'env-abc123.clnt.dev.vm-x.ai', // (Or VMX_DOMAIN env variable)
  // API Key (Or VMX_API_KEY env variable)
  apiKey: 'abc123',
});
```

## Examples

### Non-Streaming

```typescript
import { VMXClient } from '@vm-x-ai/sdk';

const main = async () => {
  const client = new VMXClient();
  const response = await client.completion({
    request: {
      messages: [
        {
          role: 'user',
          content: 'Hey there!',
        },
      ],
      resource: 'default',
    },
    stream: false,
  });

  console.log(response.message);
};
```

### Streaming

```typescript
import { VMXClient } from '@vm-x-ai/sdk';

const main = async () => {
  const client = new VMXClient();
  const response = await client.completion({
    request: {
      messages: [
        {
          role: 'user',
          content: 'Hey there!',
        },
      ],
      resource: 'default',
    },
  });

  for await (const message of response) {
    process.stdout.write(message.message || '');
  }
};
```

### Tool Call

```typescript
import { VMXClient } from '@vm-x-ai/sdk';

const main = async () => {
  const client = new VMXClient();

  // Function Call
  const functionResponse = await client.completion({
    request: {
      messages: [
        {
          role: 'user',
          content: 'whats the temperature in Dallas, New York and San Diego?',
        },
      ],
      resource: 'default',
      tools: [
        {
          type: 'function',
          function: {
            name: 'get_weather',
            description: 'Lookup the temperature.',
            parameters: {
              type: 'object',
              required: ['city'],
              properties: {
                city: {
                  type: 'string',
                  description: 'City you want to get the temperature',
                },
              },
            },
          },
        },
      ],
    },
  });

  console.log('Function response:');
  console.log('#'.repeat(100));
  for await (const message of functionResponse) {
    console.log(JSON.stringify(message, null, 2));
  }
  console.log('\n'.repeat(2));

  // Function Callback
  const functionCallbackResponse = await client.completion({
    request: {
      messages: [
        {
          role: 'user',
          content: 'whats the temperature in Dallas, New York and San Diego?',
        },
        {
          role: 'assistant',
          toolCalls: [
            {
              id: 'call_NLcWB6VCdG6x9UW6xrGVTTTR',
              type: 'function',
              function: {
                name: 'get_weather',
                arguments: '{"city": "Dallas"}',
              },
            },
            {
              id: 'call_6RDTuEDsaHvWr8XjwDXx4UjX',
              type: 'function',
              function: {
                name: 'get_weather',
                arguments: '{"city": "New York"}',
              },
            },
            {
              id: 'call_NsFzeGVbAWl5bor6RrUDCvTv',
              type: 'function',
              function: {
                name: 'get_weather',
                arguments: '{"city": "San Diego"}',
              },
            },
          ],
        },
        {
          role: 'tool',
          content: 'The temperature in Dallas is 81F',
          toolCallId: 'call_NLcWB6VCdG6x9UW6xrGVTTTR',
        },
        {
          role: 'tool',
          content: 'The temperature in New York is 78F',
          toolCallId: 'call_6RDTuEDsaHvWr8XjwDXx4UjX',
        },
        {
          role: 'tool',
          content: 'The temperature in San Diego is 68F',
          toolCallId: 'call_NsFzeGVbAWl5bor6RrUDCvTv',
        },
      ],
      resource: 'default',
      tools: [
        {
          type: 'function',
          function: {
            name: 'get_weather',
            description: 'Lookup the temperature.',
            parameters: {
              type: 'object',
              required: ['city'],
              properties: {
                city: {
                  type: 'string',
                  description: 'City you want to get the temperature',
                },
              },
            },
          },
        },
      ],
    },
  });

  console.log('Function Callback response:');
  console.log('#'.repeat(100));
  for await (const message of functionCallbackResponse) {
    process.stdout.write(message.message || '');
  }
  console.log('\n'.repeat(2));
};
```

### Multi-Answer

#### Streaming

```typescript
import { VMXClient } from '@vm-x-ai/sdk';

const main = async () => {
  const client = new VMXClient();

  const promises = await client.completion({
    request: {
      messages: [
        {
          role: 'user',
          content: 'Hey there!',
        },
      ],
      resource: 'default',
    },
    multiAnswer: true,
  });

  await Promise.all(
    promises.map(async (resp, idx) => {
      let x = 0;
      let first = true;

      for await (const message of await resp) {
        const y = (idx + 1) * 10;
        if (first) {
          first = false;
          process.stdout.cursorTo(0, y - 2);
          process.stdout.write(`Model: ${message.metadata?.model}`);

          if (message.message?.startsWith('\n\n')) {
            message.message = message.message.slice(2);
          }
        }
        await new Promise((resolve) => setTimeout(resolve, 50));
        process.stdout.cursorTo(x, y);
        process.stdout.write(message.message || '');
        x += message.message?.length || 0;
      }
    }),
  );

  console.log('\n'.repeat(10));
};
```

#### Non-Streaming

```typescript
import { VMXClient } from '@vm-x-ai/sdk';

const main = async () => {
  const client = new VMXClient();
  const promises = await client.completion({
    request: {
      messages: [
        {
          role: 'user',
          content: 'Hey there!',
        },
      ],
      resource: 'default',
    },
    stream: false,
    multiAnswer: true,
  });

  await Promise.all(
    promises.map(async (resp) => {
      const { message, metadata } = await resp;
      console.log(`Model: ${metadata?.model}, Response: ${message}`);
    }),
  );
};
```

## [Change Log](./CHANGELOG.md)
