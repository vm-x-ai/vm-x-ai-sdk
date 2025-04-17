import { Metadata } from '@grpc/grpc-js';
import type { VMXClient } from '../client';
import type { VMXClientAuthProvider } from './types';

export type VMXClientAPIKeyOptions = {
  apiKey: string;
};

const AUTH_HEADER = 'x-api-key';

export class VMXClientAPIKey implements VMXClientAuthProvider {
  constructor(private readonly options: VMXClientAPIKeyOptions) {}

  public async injectCredentials(
    _client: VMXClient,
    grpcMetadataOrHeaders: Metadata | Record<string, string>,
  ): Promise<void> {
    if (grpcMetadataOrHeaders instanceof Metadata) {
      grpcMetadataOrHeaders.add(AUTH_HEADER, this.options.apiKey);
    } else {
      grpcMetadataOrHeaders[AUTH_HEADER] = this.options.apiKey;
    }
  }
}
