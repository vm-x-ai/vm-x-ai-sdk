import { Metadata, credentials } from '@grpc/grpc-js';
import type { VMXClientAuthProvider } from './auth';
import type { CompletionRequest, CompletionResponse } from './proto-types/completion/completion';
import { CompletionServiceClient } from './proto-types/completion/completion';

export type VMXClientOptions = {
  workspaceId: string;
  environmentId: string;
  domain: string;
  auth: VMXClientAuthProvider;
};

export class VMXClient {
  private completionClient: CompletionServiceClient;

  constructor(public readonly options: VMXClientOptions) {
    this.completionClient = new CompletionServiceClient(`grpc.${this.options.domain}`, credentials.createSsl(), {
      'grpc.enable_retries': 3,
    });
  }

  public async completion<
    TStream extends boolean = true,
    TResult = TStream extends true ? AsyncIterable<CompletionResponse> : CompletionResponse,
  >(request: Omit<CompletionRequest, 'stream'>, stream: TStream = true as TStream): Promise<TResult> {
    const grpcMetadata = new Metadata();
    if (process.env._X_AMZN_TRACE_ID) {
      grpcMetadata.add('x-amzn-trace-id', process.env._X_AMZN_TRACE_ID as string);
    }

    await this.options.auth.injectCredentials(this, grpcMetadata);
    const call = this.completionClient.create(
      {
        ...request,
        stream,
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
}
