import type { Metadata } from '@grpc/grpc-js';
import type { VMXClient } from '../client';

export interface VMXClientAuthProvider {
  injectCredentials(client: VMXClient, grpcMetadataOrHeaders: Metadata | Record<string, string>): Promise<void>;
}
