import { z } from 'zod';

import { CompetencyAccessType, CompetencyQuestionType, Status } from '@/shared/enum';

import { adminPageQuerySchema } from '../base-schema';

export const competencySchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.nativeEnum(CompetencyQuestionType),
  accessType: z.nativeEnum(CompetencyAccessType),
  weight: z.number(),
  status: z.nativeEnum(Status),
  questions: z.array(z.object({ id: z.string(), name: z.string() })),
  description: z.string(),
});
export const createCompetencySchema = competencySchema.omit({ id: true });

export const competencyQuerySchema = z
  .object({
    name: z.string().optional(),
    accessType: z.nativeEnum(CompetencyAccessType).optional(),
    type: z.nativeEnum(CompetencyQuestionType).optional(),
    status: z.nativeEnum(Status).optional(),
  })
  .merge(adminPageQuerySchema);
