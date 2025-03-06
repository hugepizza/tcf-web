import { z } from "zod";

export const pageQuerySchema = z.object({
  pageSize: z.coerce.number().positive().max(20).optional().default(10),
  page: z.coerce.number().positive().optional().default(1),
});
export const adminPageQuerySchema = z.object({
  pageSize: z.coerce.number().positive().max(1000).optional().default(10),
  page: z.coerce.number().positive().optional().default(1),
});

export const baseIdSchema = z.object({
  id: z.string(),
});

export const multipleIdsSchema = z.object({
  ids: z.string().array(),
});

export const idsFromQuerySchema = z
  .string()
  .transform((str) => (str === "" ? [] : str.split(",")));

export const sortSchema = z.enum(["asc", "desc"]).optional().default("desc");

export const emailListSchema = z.object({ to: z.string().email().array() });

export const dateStringSchema = z.union([z.string(), z.date()]);

export const summarySchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const emailRegexSafe = /^[^\s@]{1,30}@[^\s@]{1,20}\.[^\s@]{2,10}$/;

export const safeEmailSchema = z
  .string()
  .refine((email) => emailRegexSafe.test(email), {
    message: "Invalid email address",
  });

export const dateQuerySchema = z.object({
  createdAtFrom: z.string().optional(),
  createdAtTo: z.string().optional(),
});
