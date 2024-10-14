import { Metadata, credentials } from '@grpc/grpc-js';
import type {
  CompletionResponse,
  RequestToolChoice,
  RequestToolChoiceItem,
  CompletionRequest as GrpcCompletionRequest,
} from '@vm-x-ai/completion-client';
import { CompletionServiceClient } from '@vm-x-ai/completion-client';
import { v4 as uuidv4 } from 'uuid';
import { VMXClientAPIKey, type VMXClientAuthProvider } from './auth';
import type { CompletionRequestPayload } from './types';

export type VMXClientOptions = {
  domain?: string;
  apiKey?: string;
  secureChannel?: boolean;
  workspaceId?: string;
  environmentId?: string;
};

export class VMXClient {
  private completionClient: CompletionServiceClient;
  public domain: string;
  public workspaceId?: string;
  public environmentId?: string;

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
      secureChannel ? `grpc.${this.domain}` : this.domain,
      secureChannel ? credentials.createSsl() : credentials.createInsecure(),
      {
        'grpc.enable_retries': 3,
      },
    );
  }

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
