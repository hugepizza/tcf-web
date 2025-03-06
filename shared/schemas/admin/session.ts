import { z } from 'zod';
import { dateStringSchema, pageQuerySchema } from '../base-schema';

export const listSessionsInputSchema = z
  .object({
    userId: z.string().optional(),
  })
  .merge(pageQuerySchema);

export const listSessionLogsInputSchema = z
  .object({
    userId: z.string().optional(),
    sessionId: z.string().optional(),
    scene: z.string().optional(),
  })
  .merge(pageQuerySchema);

export const listSessionsOutputSchema = z.object({
  items: z
    .object({
      id: z.string(),
      userId: z.string(),
      username: z.string(),
      isActice: z.boolean(),
      lastIp: z.string(),
      lastUa: z.string(),
      lastCountry: z.string(),
      lastCity: z.string(),
      createdAt: dateStringSchema,
      lastUsedAt: dateStringSchema,
    })
    .array(),
  count: z.number(),
});

export const listSessionLogsOutputSchema = z.object({
  items: z
    .object({
      userId: z.string(),
      username: z.string(),
      sessionId: z.string(),
      ip: z.string(),
      ua: z.string(),
      country: z.string(),
      city: z.string(),
      createdAt: dateStringSchema,
      scene: z.string(),
    })
    .array(),
  count: z.number(),
});
