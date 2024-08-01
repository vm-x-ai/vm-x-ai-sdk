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

main().finally(() => process.exit(0));
