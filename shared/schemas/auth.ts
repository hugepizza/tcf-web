import { z } from "zod";
import { dateStringSchema, safeEmailSchema } from "./base-schema";

export const signUpInputSchema = z.object({
  email: safeEmailSchema,
  password: z.string().min(6).max(24),
  verificationCode: z.string(),
  registerCode: z.string(),
});

export const signInByPasswordInputSchema = z.object({
  account: z.string().min(6).max(100),
  password: z.string().min(6).max(24),
});

export const signInByEmailVerifyCodeInputSchema = z.object({
  account: safeEmailSchema,
  verificationCode: z.string().length(6),
});

export const signInBy2FaInputSchema = z.object({
  account: safeEmailSchema,
  password: z.string().min(6).max(24),
  verificationCode: z.string().length(6),
});

export const signInByMagicLinkInputSchema = z.object({
  token: z.string(),
});

export const getSessionsOutputSchema = z.object({
  items: z
    .object({
      ua: z.string(),
      lastActicveAt: dateStringSchema,
      city: z.string(),
      ip: z.string(),
      country: z.string(),
      id: z.string(),
      isCurrent: z.boolean(),
    })
    .array(),
});
