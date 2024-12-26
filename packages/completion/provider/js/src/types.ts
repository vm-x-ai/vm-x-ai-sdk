import type { JSONSchema7 } from 'json-schema';
import type { AIProviderStatus, AIProviderType, AIProviderVisibility } from './enums';

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

export type AIProviderLogo = {
  url: string;
};

export type AIProviderHandler = {
  url: string;
  module: string;
};

export type AIProviderSource = {
  url: string;
};

export type AIProviderConnectionAccordionComponent = {
  type: 'accordion';
  title: string;
  elements: (AIProviderConnectionTypographyComponent | AIProviderConnectionEditorComponent)[];
};

export type AIProviderConnectionButtonComponent = {
  type: 'link-button';
  content: string;
  sx?: Record<string, unknown>;
  url: string;
  target?: string;
};

export type AIProviderConnectionTypographyComponent = {
  type: 'typography';
  content: string;
  variant: 'body1' | 'body2' | 'caption' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2';
  sx?: Record<string, unknown>;
};

export type AIProviderConnectionEditorComponent = {
  type: 'editor';
  content: string;
  language: string;
  height: string;
  readOnly?: boolean;
  readOnlyMessage?: string;
};

export type AIProviderConnection = {
  form: JSONSchema7;
  uiComponents?: (AIProviderConnectionAccordionComponent | AIProviderConnectionAccordionComponent)[];
};

export type AIProviderModel = {
  value: string;
  label: string;
  logo?: AIProviderLogo;
  options?: AIProviderModelOptions;
};

export type AIProviderModelOptions = {
  maxTokens?: number;
};

export type AIProviderProperties = {
  logo: AIProviderLogo;
  source: AIProviderSource;
  handler: AIProviderHandler;
  connection: AIProviderConnection;
  models: AIProviderModel[];
};

export interface AIProviderConfig {
  id: string;
  name: string;
  description?: string;
  version: string;
  type: AIProviderType;
  config: AIProviderProperties;
  visibility: AIProviderVisibility;
  status: AIProviderStatus;
}
