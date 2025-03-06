import { z } from 'zod';

import { ProgramDegree, Status } from '@/shared/enum';

import { adminPageQuerySchema } from '../base-schema';

export const programSchema = z.object({
  id: z.string(),
  shortName: z.string(),
  name: z.string(),
  faculty: z.object({
    id: z.string(),
    name: z.string(),
    school: z
      .object({
        id: z.string(),
        name: z.string(),
      })
      .optional(),
  }),
  degree: z.nativeEnum(ProgramDegree),
  competencies: z.array(z.object({ id: z.string(), name: z.string() })),
  competencySets: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      competencies: z.array(z.object({ id: z.string(), name: z.string() })),
    }),
  ),
  weight: z.number(),
});

export const programQuerySchema = z
  .object({
    name: z.string().optional(),
    facultyId: z.string().optional(),
    schoolId: z.string().optional(),
    degree: z.nativeEnum(ProgramDegree).optional(),
    status: z.nativeEnum(Status).optional(),
  })
  .merge(adminPageQuerySchema);

export const createProgramSchema = programSchema.omit({ id: true });
