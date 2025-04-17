import { VMXClient } from '@vm-x-ai/sdk';

const main = async () => {
  const client = new VMXClient();
  console.log('Get batch status');

  const batchId = '91369a41-c97f-4177-b67d-f3d98e477814';
  const response = await client.getCompletionBatchResult(batchId);
  console.log('Batch status', response.status);

  const result = await client.waitForCompletionBatch(batchId);
  console.log('Batch completed', result);
};

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => process.exit(0));
