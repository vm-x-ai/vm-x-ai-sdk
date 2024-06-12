import { Metadata, credentials } from '@grpc/grpc-js';
import { VMXClientAPIKey, type VMXClientAuthProvider } from './auth';
import type { CompletionResponse, RequestToolChoice, RequestToolChoiceItem } from './proto-types/completion/completion';
import { CompletionServiceClient } from './proto-types/completion/completion';
import type { CompletionRequest } from './types';

export type VMXClientOptions = {
  workspaceId: string;
  environmentId: string;
  domain: string;
} & (
  | {
      apiKey: string;
    }
  | {
      auth: VMXClientAuthProvider;
    }
);

export class VMXClient {
  private completionClient: CompletionServiceClient;

  constructor(public readonly options: VMXClientOptions) {
    this.completionClient = new CompletionServiceClient(`grpc.${this.options.domain}`, credentials.createSsl(), {
      'grpc.enable_retries': 3,
    });

    if (!('auth' in this.options) && !('apiKey' in this.options)) {
      throw new Error('Either `auth` or `apiKey` must be provided');
    }
  }

  public async completion<
    TStream extends boolean = true,
    TResult = TStream extends true ? AsyncIterable<CompletionResponse> : CompletionResponse,
  >(request: Omit<CompletionRequest, 'stream'>, stream: TStream = true as TStream): Promise<TResult> {
    const grpcMetadata = new Metadata();
    if (process.env._X_AMZN_TRACE_ID) {
      grpcMetadata.add('x-amzn-trace-id', process.env._X_AMZN_TRACE_ID as string);
    }

    await this.getAuthProvider().injectCredentials(this, grpcMetadata);
    const call = this.completionClient.create(
      {
        ...request,
        tools: request.tools ?? [],
        toolChoice: this.parseToolChoice(request.toolChoice),
        stream,
        messages: request.messages.map((message) => ({
          ...message,
          toolCalls: message.toolCalls ?? [],
        })),
      },
      grpcMetadata,
    );

    if (stream) {
      return call as TResult;
    } else {
      for await (const response of call as AsyncIterable<CompletionResponse>) {
        return response as TResult;
      }
    }

    throw new Error('unreachable');
  }

  private getAuthProvider(): VMXClientAuthProvider {
    if ('apiKey' in this.options) {
      return new VMXClientAPIKey({
        apiKey: this.options.apiKey,
      });
    } else {
      return this.options.auth;
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
