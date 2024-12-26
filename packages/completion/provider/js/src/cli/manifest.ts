import { z } from 'zod';

export const manifestSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  version: z.string(),
  visibility: z.enum(['public', 'private']).default('private'),
  type: z.enum(['official', 'community']).default('community'),
  config: z.object({
    logo: z.object({
      src: z.string(),
      url: z.string().optional(),
    }),
    connection: z.object({
      form: z.custom().default({
        type: 'object',
        properties: {},
      }),
      uiComponents: z
        .array(
          z.union([
            z.object({
              type: z.literal('accordion'),
              title: z.string(),
              elements: z.array(
                z.union([
                  z.object({
                    type: z.enum(['typography']),
                    content: z.string(),
                    variant: z
                      .enum(['body1', 'body2', 'caption', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2'])
                      .optional(),
                    sx: z.custom().default({}),
                  }),
                  z.object({
                    type: z.enum(['editor']),
                    content: z.string(),
                    language: z.string(),
                    height: z.string(),
                    readOnly: z.boolean().optional(),
                    readOnlyMessage: z.string().optional(),
                  }),
                ]),
              ),
            }),
            z.object({
              type: z.literal('link-button'),
              content: z.string(),
              sx: z.custom().default({}),
              url: z.string(),
              target: z.string().optional(),
            }),
          ]),
        )
        .optional(),
    }),
    models: z.array(
      z.object({
        value: z.string(),
        label: z.string(),
        logo: z
          .object({
            src: z.string(),
            url: z.string().optional(),
          })
          .optional(),
      }),
    ),
    handler: z.object({
      src: z.string(),
      url: z.string().optional(),
      module: z.string(),
      tsConfigPath: z.string(),
    }),
  }),
});

export type Manifest = z.infer<typeof manifestSchema>;
