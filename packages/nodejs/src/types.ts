import type {
  CompletionRequest as BaseCompletionRequest,
  RequestMessage as BaseRequestMessage,
  RequestMessageToolCall,
  RequestToolChoiceItem,
  RequestTools,
} from './proto-types/completion';

export type CompletionRequest = Omit<BaseCompletionRequest, 'tools' | 'messages' | 'toolChoice'> & {
  tools?: RequestTools[];
  messages: RequestMessage[];
  toolChoice?: 'auto' | 'none' | RequestToolChoiceItem;
};

export type RequestMessageRole = 'system' | 'user' | 'assistant' | 'tool';

export type RequestMessage = Omit<BaseRequestMessage, 'toolCalls' | 'role'> & {
  toolCalls?: RequestMessageToolCall[];
  role: RequestMessageRole;
};
