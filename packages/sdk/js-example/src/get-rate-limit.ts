import { VMXClient } from '@vm-x-ai/sdk';

const main = async () => {
  const client = new VMXClient();

  const connectionId = '886cae06-2dde-4b3e-8e26-77f342acd487';
  const response = await client.getRateLimit(connectionId, 'gpt-4o');
  console.log('Rate limit', response);
};

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => process.exit(0));
