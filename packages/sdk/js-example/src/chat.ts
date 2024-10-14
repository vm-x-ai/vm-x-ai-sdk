import { input } from '@inquirer/prompts';
import type { CompletionResponseMetadata, CompletionMessage, CompletionResponse } from '@vm-x-ai/sdk';
import { VMXClient } from '@vm-x-ai/sdk';

const messages: CompletionMessage[] = [
  {
    role: 'system',
    content: 'Always try to return small and concise messages to the user.',
  },
];

const main = async () => {
  const resource = await input({
    message: 'Enter the resource name:',
    default: 'default',
    required: true,
  });

  const continueChat = true;

  do {
    const message = await input({
      message: 'User message:',
    });

    messages.push({
      content: message,
      role: 'user',
    });

    const client = new VMXClient();
    const response = await client.completion({
      request: {
        messages,
        resource,
      },
    });

    let metadata: CompletionResponseMetadata | undefined = undefined;
    let aiResponse: CompletionResponse | undefined = undefined;

    console.log('AI Response:');
    try {
      for await (const message of response) {
        if (message.metadata && metadata?.model !== message.metadata.model) {
          if (message.metadata.fallbackAttempts) {
            console.log('Fallback provider is used.');
          }
          console.log('Provider:', message.metadata.provider);
          console.log('Model:', message.metadata.model);
          metadata = message.metadata;
        }

        aiResponse = {
          ...message,
          message: aiResponse && aiResponse.message ? aiResponse.message + message.message : message.message,
        };

        process.stdout.write(message.message || '');
      }

      console.log('\n');
      messages.push({
        content: aiResponse?.message || '',
        role: 'assistant',
        toolCalls: aiResponse?.toolCalls,
      });
    } catch (error) {
      console.log('Error:', error);
    }
  } while (continueChat);
};

main().finally(() => process.exit(0));
