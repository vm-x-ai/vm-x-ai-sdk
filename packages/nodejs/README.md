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

## Usage

```typescript
import { VMXClient, VMXClientOAuth } from '@vm-x-ai/sdk';

const client = new VMXClient({
  domain: 'env-abc123.clnt.vm-x.ai',
  environmentId: 'env-abv123',
  workspaceId: 'ws-abc123',
  auth: new VMXClientOAuth({
    clientId: 'clientId',
    clientSecret: 'clientSecret',
  }),
});

// Streaming
const streamingResponse = await client.completion({
  messages: [
    {
      role: 'assistant',
      content: 'Hey there!',
    },
  ],
  functions: [],
  provider: 'openai',
  resource: 'my-resource',
  workload: 'my-workload',
  openai: {
    model: 'gpt-3.5-turbo',
  },
});

for await (const message of streamingResponse) {
  console.log(message.message);
}

// Non-streaming
const nonStreamingResponse = await client.completion(
  {
    messages: [
      {
        role: 'assistant',
        content: 'Hey there!',
      },
    ],
    functions: [],
    provider: 'openai',
    resource: 'my-resource',
    workload: 'my-workload',
    openai: {
      model: 'gpt-3.5-turbo',
    },
  },
  false,
);

console.log(nonStreamingResponse.message);
```

## [Change Log](./CHANGELOG.md)
