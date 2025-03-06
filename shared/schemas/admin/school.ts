import { Status } from '@/shared/enum';
import { z } from 'zod';

// Base schema for school fields
const schoolBaseSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  nameCN: z.string().nullable(),
  shortName: z.string().min(1, 'Short name is required'),
  logoPath: z.string().nullable(),
  weight: z.number().int().default(0),
  status: z.nativeEnum(Status),
  countryId: z.string().min(1, 'Country is required'),
});

// Schema for creating a new school
export const createSchoolSchema = schoolBaseSchema;
export type CreateSchoolInput = z.infer<typeof createSchoolSchema>;

// Schema for updating a school
export const updateSchoolSchema = schoolBaseSchema.partial();
export type UpdateSchoolInput = z.infer<typeof updateSchoolSchema>;

// Schema for school output (response)
export const schoolSchema = z.object({
  ...schoolBaseSchema.shape,
  id: z.string(),
  country: z.object({
    id: z.string(),
    name: z.string(),
    nameCN: z.string().nullable(),
    code: z.string(),
  }),
});
export type SchoolOutput = z.infer<typeof schoolSchema>;

// Schema for listing schools with pagination
export const listSchoolSchema = z.object({
  items: z.array(schoolSchema),
  total: z.number(),
});
export type ListSchoolOutput = z.infer<typeof listSchoolSchema>;

// Schema for school query params
export const schoolQuerySchema = z
  .object({
    keyword: z.string().optional(),
    status: z.nativeEnum(Status).optional(),
    countryId: z.string().optional(),
  })
  .merge(
    z.object({
      pageSize: z.coerce.number().positive().max(1000).optional().default(10),
      page: z.coerce.number().positive().optional().default(1),
    }),
  );
