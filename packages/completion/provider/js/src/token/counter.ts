import type { Tiktoken } from 'js-tiktoken';
import { encodingForModel, getEncoding } from 'js-tiktoken';
import type { TokenMessage } from './types';

export class TokenCounter<TMessage extends TokenMessage = TokenMessage> {
  private static modelEncodingCache: { [key in string]?: Tiktoken } = {};

  public static getEncodingForModelCached(model: string): Tiktoken {
    if (!this.modelEncodingCache[model]) {
      try {
        this.modelEncodingCache[model] = encodingForModel(model as Parameters<typeof encodingForModel>[0]);
      } catch (e) {
        console.error('Model not found. Using cl100k_base encoding.');
        this.modelEncodingCache[model] = getEncoding('cl100k_base');
      }
    }

    return this.modelEncodingCache[model] as Tiktoken;
  }

  constructor(options: { model?: string; messages: TMessage[] }) {
    const { messages } = options;
    this.model = options.model || 'cl100k_base';
    this.messages = messages;
  }

  public readonly model;
  public readonly messages;

  // Used Tokens (total)
  public get usedTokens() {
    return this.promptUsedTokens + this.completionUsedTokens;
  }

  // Used Tokens (prompt)
  public get promptUsedTokens() {
    return this.tokensFromMessages(this.promptMessages);
  }

  // Used Tokens (completion)
  public get completionUsedTokens() {
    return this.completionMessage ? this.contentUsedTokens(this.completionMessage) : 0;
  }

  public chunks(text: string, maxTokens: number): string[] {
    const encoding = TokenCounter.getEncodingForModelCached(this.model);
    const tokens = encoding.encode(text);
    const parts: number[][] = [];
    let currentPart: number[] = [];
    let currentCount = 0;

    for (const token of tokens) {
      currentPart.push(Number(token));
      currentCount += 1;

      if (currentCount >= maxTokens) {
        parts.push(currentPart);
        currentPart = [];
        currentCount = 0;
      }
    }

    if (currentPart.length) parts.push(currentPart);

    const result = parts.map((part) => encoding.decode(part));

    return result;
  }

  private contentUsedTokens(content: string) {
    const encoding = TokenCounter.getEncodingForModelCached(this.model);
    return encoding.encode(content).length;
  }

  private get lastMessage() {
    return this.messages[this.messages.length - 1];
  }

  private get promptMessages() {
    return this.lastMessage.role === 'assistant' ? this.messages.slice(0, -1) : this.messages;
  }

  private get completionMessage() {
    return this.lastMessage.role === 'assistant' ? this.lastMessage.content : '';
  }

  private tokensFromMessages(messages: TMessage[]) {
    const tokensPerMessage = 3;
    const tokensPerName = 1;
    let numTokens = 0;

    const encoding = TokenCounter.getEncodingForModelCached(this.model);
    for (const message of messages) {
      numTokens += tokensPerMessage;

      for (const [key, value] of Object.entries(message)) {
        if (key === 'tool_calls' && value) {
          numTokens += encoding.encode(JSON.stringify(value)).length;
          continue;
        }
        if (key === 'name') {
          numTokens += tokensPerName;
        }

        if (value === null || value === undefined) continue;
        numTokens += encoding.encode(value as string).length;
      }
    }

    return numTokens + 3;
  }
}
