import { VMXClient } from '@vm-x-ai/sdk';

const main = async () => {
  const client = new VMXClient();

  // Function Call
  const functionResponse = await client.completion({
    request: {
      messages: [
        {
          role: 'user',
          content: 'whats the temperature in Dallas, New York and San Diego?',
        },
      ],
      resource: 'default',
      tools: [
        {
          type: 'function',
          function: {
            name: 'get_weather',
            description: 'Lookup the temperature.',
            parameters: {
              type: 'object',
              required: ['city'],
              properties: {
                city: {
                  type: 'string',
                  description: 'City you want to get the temperature',
                },
              },
            },
          },
        },
      ],
    },
  });

  console.log('Function response:');
  console.log('#'.repeat(100));
  for await (const message of functionResponse) {
    console.log(JSON.stringify(message, null, 2));
  }
  console.log('\n'.repeat(2));

  // Function Callback
  const functionCallbackResponse = await client.completion({
    request: {
      messages: [
        {
          role: 'user',
          content: 'whats the temperature in Dallas, New York and San Diego?',
        },
        {
          role: 'assistant',
          toolCalls: [
            {
              id: 'call_NLcWB6VCdG6x9UW6xrGVTTTR',
              type: 'function',
              function: {
                name: 'get_weather',
                arguments: '{"city": "Dallas"}',
              },
            },
            {
              id: 'call_6RDTuEDsaHvWr8XjwDXx4UjX',
              type: 'function',
              function: {
                name: 'get_weather',
                arguments: '{"city": "New York"}',
              },
            },
            {
              id: 'call_NsFzeGVbAWl5bor6RrUDCvTv',
              type: 'function',
              function: {
                name: 'get_weather',
                arguments: '{"city": "San Diego"}',
              },
            },
          ],
        },
        {
          role: 'tool',
          content: 'The temperature in Dallas is 81F',
          toolCallId: 'call_NLcWB6VCdG6x9UW6xrGVTTTR',
        },
        {
          role: 'tool',
          content: 'The temperature in New York is 78F',
          toolCallId: 'call_6RDTuEDsaHvWr8XjwDXx4UjX',
        },
        {
          role: 'tool',
          content: 'The temperature in San Diego is 68F',
          toolCallId: 'call_NsFzeGVbAWl5bor6RrUDCvTv',
        },
      ],
      resource: 'default',
      tools: [
        {
          type: 'function',
          function: {
            name: 'get_weather',
            description: 'Lookup the temperature.',
            parameters: {
              type: 'object',
              required: ['city'],
              properties: {
                city: {
                  type: 'string',
                  description: 'City you want to get the temperature',
                },
              },
            },
          },
        },
      ],
    },
  });

  console.log('Function Callback response:');
  console.log('#'.repeat(100));
  for await (const message of functionCallbackResponse) {
    process.stdout.write(message.message || '');
  }
  console.log('\n'.repeat(2));
};

main().finally(() => process.exit(0));
