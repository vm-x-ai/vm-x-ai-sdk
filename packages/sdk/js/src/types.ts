import type {
  CompletionRequest as BaseCompletionRequest,
  RequestMessage as BaseRequestMessage,
  RequestMessageToolCall,
  RequestToolChoiceItem,
  RequestTools,
} from '@vm-x-ai/completion-client';

export type CompletionRequestPayload = Omit<BaseCompletionRequest, 'tools' | 'messages' | 'toolChoice'> & {
  tools?: RequestTools[];
  messages: CompletionMessage[];
  toolChoice?: 'auto' | 'none' | RequestToolChoiceItem;
};

export type CompletionMessageRole = 'system' | 'user' | 'assistant' | 'tool';

export type CompletionMessage = Omit<BaseRequestMessage, 'toolCalls' | 'role'> & {
  toolCalls?: RequestMessageToolCall[];
  role: CompletionMessageRole;
};
