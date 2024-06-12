import { VMXClient, VMXClientOAuth } from '@vm-x-ai/sdk';

const main = async () => {
  const client = new VMXClient({
    domain: 'env-abc123.clnt.dev.vm-x.ai',
    environmentId: 'env-abc123',
    workspaceId: 'ws-abc123',
    // Authentication options
    // OAuth
    auth: new VMXClientOAuth({
      clientId: 'abc123',
      clientSecret: 'abc123',
    }),
    // or API Key
    apiKey: 'abc123',
  });

  // Streaming
  const streamingResponse = await client.completion({
    messages: [
      {
        role: 'user',
        content: 'Hey there!',
      },
    ],
    resource: 'resource1-openai-gpt-3-5-turbo',
    workload: 'high1',
  });

  for await (const message of streamingResponse) {
    console.log(message.message);
  }

  // Non-streaming
  const nonStreamingResponse = await client.completion(
    {
      messages: [
        {
          role: 'user',
          content: 'Hey there!',
        },
      ],
      resource: 'resource1-openai-gpt-3-5-turbo',
      workload: 'high1',
    },
    false,
  );

  console.log(nonStreamingResponse.message);
};

main().then(() => console.log('done'));
