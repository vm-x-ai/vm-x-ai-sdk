import type { CompletionBatchRequest } from '@vm-x-ai/sdk';
import { VMXClient } from '@vm-x-ai/sdk';

const main = async () => {
  const client = new VMXClient();
  console.log('Starting batch');
  const requests = Array(100)
    .fill(0)
    .map<CompletionBatchRequest['requests'][number]>(() => ({
      messages: [
        {
          role: 'user',
          content: 'Hi',
        },
      ],
      resource: 'default',
    }));

  const response = await client.completionBatchSync(requests);

  for await (const message of response) {
    console.log(message);
  }
};

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => process.exit(0));
