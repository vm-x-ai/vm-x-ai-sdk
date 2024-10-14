import type { CompletionRequest, CompletionResponse, CompletionResponseMetadata } from '@vm-x-ai/completion-client';
import type { Subject } from 'rxjs';
import type { AIConnection, CompletionMetadata, ResourceModelConfig } from './types';

export interface ICompletionProvider {
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
