import { Metadata, credentials } from '@grpc/grpc-js';
import type {
  CompletionResponse,
  RequestToolChoice,
  RequestToolChoiceItem,
  CompletionRequest as GrpcCompletionRequest,
} from '@vm-x-ai/completion-client';
import { CompletionServiceClient } from '@vm-x-ai/completion-client';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { VMXClientAPIKey, type VMXClientAuthProvider } from './auth';
import type { BatchRequestCallbackOptions, CompletionBatchStream } from './types';
import {
  BatchRequestType,
  CompletionBatchRequestStatus,
  type CompletionBatchRequest,
  type CompletionBatchResponse,
  type CompletionRequestPayload,
} from './types';

/**
 * Configuration options for the VMX client
 */
export type VMXClientOptions = {
  /** Domain name for the VM-X AI service */
  domain?: string;
  /** API key for authentication */
  apiKey?: string;
  /** Whether to use a secure channel for gRPC communication */
  secureChannel?: boolean;
  /** Default workspace ID to use for requests */
  workspaceId?: string;
  /** Default environment ID to use for requests */
  environmentId?: string;
};

/**
 * Client for interacting with VM-X AI services
 *
 * This client provides access to VM-X AI's capabilities, including text completions,
 * batch processing, and related functionality. It handles authentication, connection
 * setup, and provides access to both gRPC and REST APIs.
 */
export class VMXClient {
  /** gRPC client for completion requests */
  private completionClient: CompletionServiceClient;
  /** Domain name for the VM-X AI service */
  public domain: string;
  /** Default workspace ID to use for requests */
  public workspaceId?: string;
  /** Default environment ID to use for requests */
  public environmentId?: string;

  /**
   * Create a new VM-X AI client
   *
   * @param options - Configuration options for the client
   * @throws Error if domain or authentication information is not provided
   */
  constructor(public readonly options?: VMXClientOptions) {
    const domain = this.options?.domain ?? process.env.VMX_DOMAIN;
    this.workspaceId = this.options?.workspaceId ?? process.env.VMX_WORKSPACE_ID;
    this.environmentId = this.options?.environmentId ?? process.env.VMX_ENVIRONMENT_ID;

    if (!domain) {
      throw new Error('`domain` must be provided or `VMX_DOMAIN` environment variable must be set');
    }

    this.domain = domain;

    const secureChannel = this.options?.secureChannel ?? process.env.VMX_SECURE_CHANNEL !== 'false';

    this.completionClient = new CompletionServiceClient(
      this.grpcDomain,
      secureChannel ? credentials.createSsl() : credentials.createInsecure(),
      {
        'grpc.enable_retries': 3,
      },
    );
  }

  /**
   * Get the gRPC domain for API calls
   *
   * When secureChannel is enabled, prefixes with "grpc.", otherwise returns domain as is.
   *
   * @returns The gRPC domain
   */
  get grpcDomain(): string {
    return this.options?.secureChannel ? `grpc.${this.domain}` : this.domain;
  }

  /**
   * Get the API domain for REST API calls
   *
   * For localhost domains, uses http://, otherwise uses https://api.{domain}.
   *
   * @returns The API domain
   */
  get apiDomain(): string {
    return this.domain.startsWith('localhost') ? `http://${this.domain}` : `https://api.${this.domain}`;
  }

  /**
   * Execute a completion request to generate text or perform other AI tasks
   *
   * This method supports different modes of operation:
   * - Standard streaming completions (default)
   * - Non-streaming completions
   * - Multi-answer completions that query multiple providers in parallel
   *
   * @param params - Parameters for the completion request
   * @param params.request - The completion request configuration
   * @param params.stream - Whether to stream the response (true) or wait for the full response (false)
   * @param params.multiAnswer - Whether to get multiple answers from different providers
   * @param params.answerCount - Optional number of answers to request when multiAnswer is true
   *
   * @returns Depending on the configuration:
   *   - For streaming single answers: An async iterable of completion responses
   *   - For streaming multi-answers: An array of promises resolving to async iterables
   *   - For non-streaming single answers: A completion response
   *   - For non-streaming multi-answers: An array of promises resolving to completion responses
   */
  public async completion<
    TStream extends boolean = true,
    TMultiAnswer extends boolean = false,
    TResult = TStream extends true
      ? TMultiAnswer extends true
        ? Promise<AsyncIterable<CompletionResponse>>[]
        : AsyncIterable<CompletionResponse>
      : TMultiAnswer extends true
        ? Promise<CompletionResponse>[]
        : CompletionResponse,
  >({
    request,
    stream = true as TStream,
    multiAnswer = false as TMultiAnswer,
    answerCount,
  }: {
    request: Omit<CompletionRequestPayload, 'stream'>;
    stream?: TStream;
    multiAnswer?: TMultiAnswer;
    answerCount?: number;
  }): Promise<TResult> {
    const grpcMetadata = new Metadata();
    if (process.env._X_AMZN_TRACE_ID) {
      grpcMetadata.add('x-amzn-trace-id', process.env._X_AMZN_TRACE_ID as string);
    }

    grpcMetadata.add('correlation-id', uuidv4());

    await this.getAuthProvider().injectCredentials(this, grpcMetadata);
    const grpcRequest = {
      ...(this.workspaceId && this.environmentId
        ? { workspaceId: this.workspaceId, environmentId: this.environmentId }
        : {}),
      ...request,
      tools: request.tools ?? [],
      toolChoice: this.parseToolChoice(request.toolChoice),
      stream,
      messages: request.messages.map((message) => ({
        ...message,
        toolCalls: message.toolCalls ?? [],
      })),
    };

    if (multiAnswer) {
      const count = answerCount ?? (await this.fetchResourceProviderCount(request, grpcMetadata));
      return Array(count)
        .fill(0)
        .map(async (_, index) =>
          this.call(
            { ...grpcRequest, primary: index === 0, secondaryModelIndex: index > 0 ? index - 1 : undefined },
            grpcMetadata,
          ),
        ) as TResult;
    } else {
      return this.call(grpcRequest, grpcMetadata) as TResult;
    }
  }

  /**
   * Get the result of a previously submitted batch completion request
   *
   * @param batchId - The ID of the batch to retrieve
   * @returns The batch response object
   */
  public async getCompletionBatchResult(batchId: string): Promise<CompletionBatchResponse> {
    const response = await this.executeApiRequest<undefined, CompletionBatchResponse>(
      `/completion-batch/${this.workspaceId}/${this.environmentId}/${batchId}`,
      'GET',
    );

    return response.data;
  }

  /**
   * Wait for a batch completion request to finish
   *
   * Polls the batch status until it's no longer pending or running.
   *
   * @param batchId - The ID of the batch to wait for
   * @param timeout - Optional timeout in milliseconds (throws an error if exceeded)
   * @param retryInterval - Time in milliseconds between status checks (default: 1000ms)
   * @returns The final batch response object
   * @throws Error if the timeout is exceeded
   */
  public async waitForCompletionBatch(
    batchId: string,
    timeout?: number,
    retryInterval = 1000,
  ): Promise<CompletionBatchResponse> {
    let response = await this.getCompletionBatchResult(batchId);
    const startAt = Date.now();

    while ([CompletionBatchRequestStatus.PENDING, CompletionBatchRequestStatus.RUNNING].includes(response.status)) {
      if (timeout !== undefined && Date.now() - startAt > timeout) {
        throw new Error('Timeout waiting for completion batch to finish');
      }

      await new Promise((resolve) => setTimeout(resolve, retryInterval));
      response = await this.getCompletionBatchResult(batchId);
    }

    return response;
  }

  /**
   * Execute a synchronous batch completion request and stream the results
   *
   * Processes batch requests synchronously and yields events as they occur.
   *
   * @param requests - List of completion requests to process in batch
   * @yields Stream of batch events as they occur
   */
  public async *completionBatchSync(
    requests: CompletionBatchRequest['requests'],
  ): AsyncGenerator<CompletionBatchStream, void, unknown> {
    const payload: CompletionBatchRequest = {
      type: BatchRequestType.SYNC,
      requests,
    };

    const authProvider = this.getAuthProvider();
    const headers = {};
    await authProvider.injectCredentials(this, headers);
    const response = await axios.post(
      `${this.apiDomain}/completion-batch/${this.workspaceId}/${this.environmentId}`,
      {
        ...payload,
        requests: payload.requests.map((request) => ({
          ...request,
          stream: false,
        })),
      },
      {
        headers: {
          ...headers,
          'Content-Type': 'application/json',
          Accept: 'text/event-stream',
        },
        responseType: 'stream',
        adapter: 'fetch',
      },
    );

    const stream = response.data as ReadableStream;
    const reader = stream.pipeThrough(new TextDecoderStream()).getReader();

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }

      const text = value.toString();
      const items = text
        .split('data: ')
        .slice(1)
        .map((item) => item.trim());
      for (const item of items) {
        if (item === '[DONE]') {
          break;
        }

        const data = JSON.parse(item) as CompletionBatchStream | { error: string };
        if ('error' in data) {
          throw new Error(data.error);
        }

        yield data;
      }
    }
  }

  /**
   * Execute an asynchronous batch completion request
   *
   * Submits the batch for processing and returns immediately.
   * Use getCompletionBatchResult or waitForCompletionBatch to check results.
   *
   * @param requests - List of completion requests to process in batch
   * @returns The batch response object with initial status
   */
  public async completionBatch(requests: CompletionBatchRequest['requests']): Promise<CompletionBatchResponse> {
    const payload: CompletionBatchRequest = {
      type: BatchRequestType.ASYNC,
      requests,
    };

    return await this.executeCompletionBatch(payload);
  }

  /**
   * Execute a batch completion request with results sent to a callback URL
   *
   * Submits the batch for processing and configures a callback URL to be
   * notified when processing is complete.
   *
   * @param requests - List of completion requests to process in batch
   * @param callbackOptions - Callback configuration including URL and optional headers
   * @returns The batch response object with initial status
   */
  public async completionBatchCallback(
    requests: CompletionBatchRequest['requests'],
    callbackOptions: BatchRequestCallbackOptions,
  ): Promise<CompletionBatchResponse> {
    const payload: CompletionBatchRequest = {
      type: BatchRequestType.CALLBACK,
      requests,
      callbackOptions,
    };

    return await this.executeCompletionBatch(payload);
  }

  /**
   * Internal method to execute a batch completion request
   *
   * @param payload - The batch request configuration
   * @returns The batch response object
   * @private
   */
  private async executeCompletionBatch(payload: CompletionBatchRequest): Promise<CompletionBatchResponse> {
    const response = await this.executeApiRequest<CompletionBatchRequest, CompletionBatchResponse>(
      `/completion-batch/${this.workspaceId}/${this.environmentId}`,
      'POST',
      {
        ...payload,
        requests: payload.requests.map((request) => ({
          ...request,
          stream: false,
        })),
      },
    );

    return response.data;
  }

  /**
   * Execute a REST API request to the VM-X API
   *
   * @param url - The URL path (without domain)
   * @param method - HTTP method (GET, POST, etc.)
   * @param payload - Optional request payload for POST requests
   * @returns The HTTP response from the API
   * @private
   */
  private async executeApiRequest<T, R>(
    url: string,
    method: AxiosRequestConfig['method'],
    payload?: T,
  ): Promise<AxiosResponse<R>> {
    const authProvider = this.getAuthProvider();
    const headers = {};
    await authProvider.injectCredentials(this, headers);
    const response = await axios.request<R>({
      url: `${this.apiDomain}${url}`,
      method,
      data: payload,
      headers: {
        ...headers,
        ...(payload ? { 'Content-Type': 'application/json' } : {}),
      },
    });
    return response;
  }

  /**
   * Internal method to call the gRPC completion service
   *
   * @param grpcRequest - The gRPC request to send
   * @param metadata - The metadata to include with the request
   * @returns For streaming requests: An async iterable of completion responses.
   *          For non-streaming requests: A single completion response.
   * @private
   */
  private async call(
    grpcRequest: GrpcCompletionRequest,
    metadata: Metadata,
  ): Promise<CompletionResponse | AsyncIterable<CompletionResponse>> {
    const call = this.completionClient.create(grpcRequest, metadata);

    if (grpcRequest.stream) {
      return call as AsyncIterable<CompletionResponse>;
    } else {
      for await (const response of call as AsyncIterable<CompletionResponse>) {
        return response as CompletionResponse;
      }
    }

    throw new Error('unreachable');
  }

  /**
   * Fetch the number of resource providers available
   *
   * Used for multi-answer requests when answerCount is not specified.
   *
   * @param request - The completion request
   * @param grpcMetadata - The metadata to include with the request
   * @returns The number of providers available for the resource
   * @private
   */
  private async fetchResourceProviderCount(
    request: Omit<CompletionRequestPayload, 'stream'>,
    grpcMetadata: Metadata,
  ): Promise<number> {
    return await new Promise<number>((resolve, reject) =>
      this.completionClient.getResourceProviderCount(
        {
          resource: request.resource,
        },
        grpcMetadata,
        (error, response) => {
          if (error) {
            reject(error);
          } else {
            resolve(response.count);
          }
        },
      ),
    );
  }

  /**
   * Get the appropriate authentication provider
   *
   * @returns The authentication provider
   * @throws Error if no authentication information is available
   * @private
   */
  private getAuthProvider(): VMXClientAuthProvider {
    if (this.options?.apiKey) {
      return new VMXClientAPIKey({
        apiKey: this.options.apiKey,
      });
    } else if (process.env.VMX_API_KEY) {
      return new VMXClientAPIKey({
        apiKey: process.env.VMX_API_KEY,
      });
    } else {
      throw new Error(
        '`apiKey` must be provided or `VMX_API_KEY` or `VMX_OAUTH_CLIENT_ID` and `VMX_OAUTH_CLIENT_SECRET` environment variables must be set',
      );
    }
  }

  /**
   * Convert tool_choice from external format to gRPC format
   *
   * @param toolChoice - The tool choice setting ("auto", "none", or a specific tool)
   * @returns The tool choice in gRPC format
   * @private
   */
  private parseToolChoice(toolChoice?: 'auto' | 'none' | RequestToolChoiceItem): RequestToolChoice {
    if (toolChoice === 'auto') {
      return {
        auto: true,
      };
    } else if (toolChoice === 'none') {
      return {
        none: true,
      };
    } else {
      return {
        tool: toolChoice,
      };
    }
  }
}
