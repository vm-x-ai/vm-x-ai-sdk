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

main().finally(() => process.exit(0));
