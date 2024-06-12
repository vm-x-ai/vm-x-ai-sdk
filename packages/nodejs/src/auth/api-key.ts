import type { Metadata } from '@grpc/grpc-js';
import type { VMXClient } from '../client';
import type { VMXClientAuthProvider } from './types';

export type VMXClientAPIKeyOptions = {
  apiKey: string;
};

export class VMXClientAPIKey implements VMXClientAuthProvider {
  constructor(private readonly options: VMXClientAPIKeyOptions) {}

  public async injectCredentials(_client: VMXClient, grpcMetadata: Metadata): Promise<void> {
    grpcMetadata.add('x-api-key', this.options.apiKey);
  }
}
