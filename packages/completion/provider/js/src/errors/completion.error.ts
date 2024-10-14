import type { status } from '@grpc/grpc-js';
import { RpcException } from '@nestjs/microservices';

export type CompletionRpcExceptionError = {
  code: status;
  message: string;
  rate: boolean;
  retryable: boolean;
  retryDelay?: number;
  statusCode?: number;
  failureReason?: string;
  metadata?: Record<string, unknown>;
};

export class CompletionRpcException extends RpcException {
  constructor(error: CompletionRpcExceptionError) {
    super({
      ...error,
      metadata: error.metadata ? JSON.stringify(error.metadata) : '{}',
    });
  }

  override getError(): CompletionRpcException {
    return super.getError() as CompletionRpcException;
  }
}
