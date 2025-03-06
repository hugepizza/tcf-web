import { CompetencyAccessType, Status } from '@/shared/enum';
import { z } from 'zod';
import { adminPageQuerySchema } from '../base-schema';

export const purchasePlanSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  weight: z.number(),
  mockDays: z.number(),
  interviewDays: z.number(),
  mockFullAccess: z.boolean().default(false),
  status: z.nativeEnum(Status),
  accessTypes: z.array(z.nativeEnum(CompetencyAccessType)),
  mockSelectType: z.enum(['self', 'specific']),
  mockRangeType: z.enum(['question', 'competency']),
  programSelectType: z.enum(['self', 'specific']),
  mockQuestionSelfSelectCount: z.number().min(0),
  mockCompetencySelfSelectCount: z.number().min(0),
  programSelfSelectCount: z.number().min(0),
  mockQuestionAccesses: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
    }),
  ),
  mockCompetencyAccesses: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
    }),
  ),
  programAccesses: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
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
  ),
});

export type PurchasePlanOutput = z.infer<typeof purchasePlanSchema>;

export const queryPurchasePlanSchema = z
  .object({
    name: z.string().optional(),
    status: z.nativeEnum(Status).optional(),
    slug: z.string().optional(),
  })
  .merge(adminPageQuerySchema);

export const createPurchasePlanSchema = z.object({
  name: z.string().min(1, '请输入方案名称'),
  slug: z.string().min(1, '请输入方案Slug'),
  weight: z.number().min(0),
  mockDays: z.number().min(0),
  interviewDays: z.number().min(0),
  mockFullAccess: z.boolean().default(false),
  forOneTimeCreateUser: z.boolean().default(false),
  mockQuestionAccesses: z.array(z.string()),
  mockCompetencyAccesses: z.array(z.string()),
  programAccesses: z.array(z.string()),
  mockQuestionSelfSelectCount: z.number().min(0),
  mockCompetencySelfSelectCount: z.number().min(0),
  programSelfSelectCount: z.number().min(0),
  accessTypes: z.array(z.nativeEnum(CompetencyAccessType)),
  mockSelectType: z.enum(['self', 'specific']),
  programSelectType: z.enum(['self', 'specific']),
  mockRangeType: z.enum(['question', 'competency']),
  status: z.nativeEnum(Status).default(Status.ACTIVE),
});

export const updatePurchasePlanSchema = createPurchasePlanSchema.omit({
  forOneTimeCreateUser: true,
});
