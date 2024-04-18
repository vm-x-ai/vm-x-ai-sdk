import type { Metadata } from '@grpc/grpc-js';
import axios from 'axios';
import type { Cache, Store, MemoryStore } from 'cache-manager';
import { memoryStore } from 'cache-manager';
import type { VMXClient } from '../client';
import type { VMXClientAuthProvider } from './types';

export type VMXClientOAuthOptions<TCacheStore extends Store = MemoryStore> = {
  clientId: string;
  clientSecret: string;
  cacheManager?: Cache<TCacheStore>;
};

type OAuthTokenResult = {
  access_token: string;
  expires_in: number;
  token_type: string;
};

export class VMXClientOAuth<TCacheStore extends Store = MemoryStore> implements VMXClientAuthProvider {
  private cache: Cache<TCacheStore> | MemoryStore;

  constructor(private readonly options: VMXClientOAuthOptions<TCacheStore>) {
    this.cache = options.cacheManager || memoryStore();
  }

  public async injectCredentials(client: VMXClient, grpcMetadata: Metadata): Promise<void> {
    const token = await this.getOAuthToken(client.options.domain);

    grpcMetadata.add('Authorization', `Bearer ${token}`);
  }

  private async getOAuthToken(domain: string): Promise<string> {
    const token = await this.cache.get<string>('oauth_token');
    if (token) {
      return token;
    }

    const response = await axios.post(
      `https://auth.${domain}/oauth2/token`,
      {
        grant_type: 'client_credentials',
        client_id: this.options.clientId,
        client_secret: this.options.clientSecret,
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    const result = response.data as OAuthTokenResult;

    this.cache.set('oauth_token', result.access_token, (result.expires_in - 5) * 1000);

    return result.access_token;
  }
}
