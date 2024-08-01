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

  process.stdout.write('\n');
};

main().finally(() => process.exit(0));
