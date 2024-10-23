import type { LibraryGeneratorSchema } from '@nx/js/src/generators/library/schema';

export interface AiProviderGeneratorSchema extends LibraryGeneratorSchema {
  providerType: 'official' | 'community';
  providerVisibility: 'public' | 'private';
}
