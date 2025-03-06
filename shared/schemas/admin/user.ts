import { z } from 'zod';

import { LoginMethod, UserChannel, UserStatus } from '../../enum';
import { dateStringSchema, pageQuerySchema } from '../base-schema';

import { userAccessesSchema } from './access';

export const listUsersInputSchema = z
  .object({
    username: z.string().optional(),
    status: z.nativeEnum(UserStatus).optional(),
    channel: z.nativeEnum(UserChannel).optional(),
  })
  .merge(pageQuerySchema);
export const userDetailSchame = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string().nullable(),
  initPassword: z.string().optional(),
  status: z.nativeEnum(UserStatus),

  createdAt: dateStringSchema,
  channel: z.nativeEnum(UserChannel),
  firstUsedAt: dateStringSchema.optional(),
  ipCount60Days: z.number(),
  maxSessionCount: z.number(),
  maxEmailChangeCount: z.number(),
  emailChangeCount: z.number(),
  restrictLoginMethod: z.nativeEnum(LoginMethod).nullable(),

  accesses: userAccessesSchema.optional(),
  initPlan: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .nullable(),
});
export const listUsersOutputSchema = z.object({
  items: userDetailSchame.array(),
  count: z.number(),
});

export const updateUserStatusInputSchema = z.object({
  id: z.string(),
  status: z.nativeEnum(UserStatus),
});

export const createUsersInputSchema = z.object({
  count: z.number().positive().max(100),
  usernameLength: z.number().min(8).max(15),
  passwordOnlyNumber: z.boolean(),
  initPlan: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .nullable(),
});

export const createUsersOutputSchema = z.object({
  items: z
    .object({
      username: z.string(),
      password: z.string(),
    })
    .array(),
});

export const configSchema = z.object({
  openRegister: z.boolean(),
});

export const resetPasswordOutputSchema = z.object({
  password: z.string(),
});
