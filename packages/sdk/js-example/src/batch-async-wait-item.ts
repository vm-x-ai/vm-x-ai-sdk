import type { CompletionBatchRequest } from '@vm-x-ai/sdk';
import { VMXClient } from '@vm-x-ai/sdk';
import axios from 'axios';

const main = async () => {
  const client = new VMXClient();
  console.log('Starting batch');

  const requests = Array(10)
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

  const response = await client.completionBatch(requests);

  console.log('Batch created', response.batchId);

  for (const item of response.items) {
    const result = await client.waitForCompletionBatchItem(response.batchId, item.itemId);
    console.log('Batch item', result.response?.message);
  }
};

main()
  .catch((error) => {
    if (axios.isAxiosError(error)) {
      console.error(error.request);
      console.error(error.response?.data);
    } else {
      console.error(error);
    }
    process.exit(1);
  })
  .finally(() => process.exit(0));
