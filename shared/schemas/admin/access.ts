import { z } from 'zod';
import { dateStringSchema } from '../base-schema';

export const userAccessesSchema = z.object({
  mockFullAccessExpiresAt: dateStringSchema.nullable(),
  userProgramAccesses: z.array(
    z.object({
      expiresAt: dateStringSchema,
      program: z.object({
        id: z.string(),
        name: z.string(),
        shortName: z.string(),

        faculty: z.object({
          id: z.string(),
          name: z.string(),
          nameCN: z.string().nullable(),
          shortName: z.string(),
          school: z.object({
            id: z.string(),
            name: z.string(),
            shortName: z.string(),
            nameCN: z.string().nullable(),
          }),
        }),
      }),
    }),
  ),
  userMockCompetencyAccesses: z.array(
    z.object({
      competency: z.object({ id: z.string(), name: z.string() }),
      expiresAt: dateStringSchema,
    }),
  ),
  userMockQuestionAccesses: z.array(
    z.object({
      question: z.object({ id: z.string(), name: z.string() }),
      expiresAt: dateStringSchema,
    }),
  ),
});
