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

main().finally(() => process.exit(0));
