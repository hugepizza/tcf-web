import { z } from 'zod';

import { CompetencyAccessType, CompetencyQuestionType, Status } from '@/shared/enum';

import { adminPageQuerySchema } from '../base-schema';

export const questionSchema = z.object({
  id: z.string(),
  name: z.string(),
  content: z.string(),
  type: z.nativeEnum(CompetencyQuestionType),
  accessType: z.nativeEnum(CompetencyAccessType),
  weight: z.number(),
  audio: z.boolean(),
  preparationTime: z.number(),
  answerTime: z.number(),
  status: z.nativeEnum(Status),
});

export const createQuestionSchema = questionSchema.omit({ id: true });

export const questionQuerySchema = z
  .object({
    name: z.string().optional(),
    accessType: z.nativeEnum(CompetencyAccessType).optional(),
    type: z.nativeEnum(CompetencyQuestionType).optional(),
    excludeIds: z.array(z.string()).optional(),
    status: z.nativeEnum(Status).optional(),
  })
  .merge(adminPageQuerySchema);
