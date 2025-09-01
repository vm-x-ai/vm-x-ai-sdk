import type {
  CompletionRequest as BaseCompletionRequest,
  RequestMessage as BaseRequestMessage,
  CompletionResponse,
  RequestMessageToolCall,
  RequestToolChoiceItem,
  RequestTools,
} from '@vm-x-ai/completion-client';

/**
 * Payload for a completion request
 *
 * This is an extension of the base completion request with additional
 * fields specific to the VM-X AI SDK.
 */
export type CompletionRequestPayload = Omit<BaseCompletionRequest, 'tools' | 'messages' | 'toolChoice'> & {
  /** Optional list of tools available for this completion */
  tools?: RequestTools[];
  /** List of messages in the conversation */
  messages: CompletionMessage[];
  /** Controls how tools are used during the completion */
  toolChoice?: 'auto' | 'none' | RequestToolChoiceItem;
};

/**
 * Role of a message in a completion conversation
 */
export type CompletionMessageRole = 'system' | 'user' | 'assistant' | 'tool';

/**
 * A message in a completion conversation
 *
 * This extends the base request message with VM-X specific fields.
 */
export type CompletionMessage = Omit<BaseRequestMessage, 'toolCalls' | 'role'> & {
  /** Optional list of tool calls made in this message */
  toolCalls?: RequestMessageToolCall[];
  /** The role of the entity sending this message */
  role: CompletionMessageRole;
};

/**
 * Status of a batch completion request
 *
 * Represents the different states a batch request can be in during processing.
 */
export enum CompletionBatchRequestStatus {
  /** Batch is queued but not yet processing */
  PENDING = 'PENDING',
  /** Batch is currently being processed */
  RUNNING = 'RUNNING',
  /** Batch has completed successfully */
  COMPLETED = 'COMPLETED',
  /** Batch has encountered an error */
  FAILED = 'FAILED',
  /** Batch was cancelled */
  CANCELLED = 'CANCELLED',
}

/**
 * Base entity type with creation and update metadata
 */
export type BaseEntity = {
  /** ISO timestamp when the entity was created */
  createdAt: string;
  /** ISO timestamp when the entity was last updated */
  updatedAt: string;
  /** ID of the user or system that created the entity */
  createdBy: string;
  /** ID of the user or system that last updated the entity */
  updatedBy: string;
};

/**
 * Type of batch request execution
 */
export enum BatchRequestType {
  /** Execute the batch asynchronously and return immediately */
  ASYNC = 'ASYNC',
  /** Execute the batch synchronously and stream events as they occur */
  SYNC = 'SYNC',
  /** Execute the batch asynchronously and notify a callback URL when complete */
  CALLBACK = 'CALLBACK',
}

/**
 * Events to include in the callback request
 */
export type BatchCallbackEvent = 'BATCH_UPDATE' | 'ITEM_UPDATE' | 'ALL';

/**
 * Configuration for callback URL when using CALLBACK batch requests
 */
export type BatchRequestCallbackOptions = {
  /** URL to call when the batch completes or fails */
  url: string;
  /** Optional headers to include in the callback request */
  headers?: Record<string, string>;
  /** Events to include in the callback request */
  events: BatchCallbackEvent[];
};

/**
 * A single item in a batch completion request
 */
export type CompletionBatchItem = {
  /** The workspace environment batch item ID */
  workspaceEnvironmentItemId: string;
  /** The timestamp when the item was created */
  timestamp: string;
  /** The item ID */
  itemId: string;
  /** The batch ID */
  batchId: string;
  /** The original completion request */
  request: CompletionRequestPayload;
  /** The completion response */
  response: CompletionResponse;
  /** Current status of this item */
  status: CompletionBatchRequestStatus;
  /** Optional error message if the item failed */
  error?: string;
  /** Optional count of retries for this item */
  retryCount?: number;
} & BaseEntity;

/**
 * Response containing information about a batch completion request
 */
export type CompletionBatchResponse = {
  /** Workspace environment batch ID */
  workspaceEnvironmentBatchId: string;
  /** Timestamp when the batch was created */
  timestamp: string;
  /** Type of batch request that was executed */
  type: BatchRequestType;
  /** Unique identifier for this batch */
  batchId: string;
  /** Current status of the batch */
  status: CompletionBatchRequestStatus;
  /** List of items in this batch */
  items: CompletionBatchItem[];
  /** Optional error message if the batch failed */
  error?: string;
  /** Optional count of running items */
  running?: number;
  /** Optional count of completed items */
  completed?: number;
  /** Optional count of failed items */
  failed?: number;
  /** Optional count of pending items */
  pending?: number;
  /** Optional percentage of completed items */
  completedPercentage?: string;
} & BaseEntity;

export type CompletionBatchCapacity = {
  requests: number;
  tokens: number;
  period: 'minute' | 'hour' | 'day' | 'week' | 'month' | 'lifetime';
};

/**
 * Request to execute a batch of completion requests
 */
export type CompletionBatchRequest = {
  /** Type of batch execution to perform */
  type: BatchRequestType;
  /** List of completion requests to execute */
  requests: Omit<CompletionRequestPayload, 'stream'>[];
  /** Optional callback configuration for CALLBACK batch types */
  callbackOptions?: BatchRequestCallbackOptions;
  /** Optional capacity for the batch */
  capacity?: CompletionBatchCapacity[];
};

/**
 * Stream event from a batch completion request
 *
 * Can be one of three types:
 * - Batch created event
 * - Item status change event (running, completed, failed)
 * - Batch status change event (completed, failed)
 */
export type CompletionBatchStream =
  | {
      /** Action type: batch has been created */
      action: 'batch-created';
      /** Information about the created batch (without items) */
      payload: Omit<CompletionBatchResponse, 'items'>;
    }
  | {
      /** Action type: item status has changed */
      action: 'item-running' | 'item-completed' | 'item-failed';
      /** Information about the item that changed status */
      payload: CompletionBatchItem;
    }
  | {
      /** Action type: batch has completed or failed */
      action: 'batch-completed' | 'batch-failed';
      /** Information about the completed/failed batch (without items) */
      payload: Omit<CompletionBatchResponse, 'items'>;
    };

export type CompletionBatchUpdateCallbackPayload = {
  event: 'BATCH_UPDATE';
  payload: CompletionBatchResponse;
};

export type CompletionBatchItemUpdateCallbackPayload = {
  event: 'ITEM_UPDATE';
  payload: CompletionBatchItem;
};

export type CompletionBatchCallbackPayload =
  | CompletionBatchUpdateCallbackPayload
  | CompletionBatchItemUpdateCallbackPayload;

export type AIProviderRateLimit = {
  period: 'minute' | 'hour' | 'day';
  model: string;
  requests: number;
  tokens: number;
};
