export type ResourceModelConfig = {
  provider: string;
  model: string;
  connectionId: string;
};

export type CompletionMetadata = {
  primaryModel: boolean;
  secondaryModel: boolean;
  secondaryModelIndex?: number;
  fallback?: boolean;
  fallbackAttempts?: number;
};

export interface AIConnection<TConfig = Record<string, unknown>> {
  workspaceEnvironmentId: string;
  connectionId: string;
  name: string;
  description: string;
  provider: string;
  allowedModels?: string[];
  config?: TConfig;
}
