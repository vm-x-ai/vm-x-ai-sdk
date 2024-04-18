import { VMXClient, VMXClientOAuth } from '@vm-x-ai/client';

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
