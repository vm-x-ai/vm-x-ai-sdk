import type { Logger } from '@nestjs/common';
import type { CompletionRequest, CompletionResponse, CompletionResponseMetadata } from '@vm-x-ai/completion-client';
import type { Subject } from 'rxjs';
import { TokenCounter } from './token';
import type {
  AIConnection,
  AIProviderConfig,
  AIProviderRateLimit,
  CompletionMetadata,
  ResourceModelConfig,
} from './types';

export interface ICompletionProvider {
  getRateLimit(connection: AIConnection, modelConfig: ResourceModelConfig): Promise<AIProviderRateLimit | null>;
  getMaxReplyTokens(request: CompletionRequest, modelConfig: ResourceModelConfig): number;
  getRequestTokens(request: CompletionRequest, modelConfig: ResourceModelConfig): Promise<number>;
  completion(
    request: CompletionRequest,
    connection: AIConnection,
    model: ResourceModelConfig,
    metadata: CompletionMetadata,
    observable: Subject<CompletionResponse>,
  ): Promise<CompletionResponse>;
}

export abstract class BaseCompletionProvider<TClient> {
  protected constructor(
    protected readonly logger: Logger,
    protected readonly provider: AIProviderConfig,
  ) {
    this.initializeTokenCounterModels(provider);
  }

  protected initializeTokenCounterModels(provider: AIProviderConfig) {
    const startAt = Date.now();
    this.logger.log('Initializing token counter models');

    provider.config.models.forEach((model) => {
      TokenCounter.getEncodingForModelCached(model.value);
    });

    this.logger.log(`Token counter models initialized in ${Date.now() - startAt}ms`);
  }

  protected abstract createClient(connection: AIConnection): Promise<TClient>;

  protected getMetadata(
    model: ResourceModelConfig,
    metadata: CompletionMetadata,
  ): Omit<CompletionResponseMetadata, 'done'> {
    return {
      primary: metadata.primaryModel,
      secondaryModelIndex: metadata.secondaryModelIndex,
      provider: model.provider,
      model: model.model,
      fallback: metadata.fallback ?? false,
      fallbackAttempts: metadata.fallbackAttempts ?? 0,
      success: true,
    };
  }
}
