import { z } from 'zod';

// Base schema for country fields
const countryBaseSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  nameCN: z.string().nullable(),
  code: z.string().min(1, 'Country code is required'),
  weight: z.number().int().default(0),
});

// Schema for creating a new country
export const createCountrySchema = countryBaseSchema;
export type CreateCountryInput = z.infer<typeof createCountrySchema>;

// Schema for updating a country
export const updateCountrySchema = countryBaseSchema.partial().extend({
  id: z.string().min(1, 'Country ID is required'),
});
export type UpdateCountryInput = z.infer<typeof updateCountrySchema>;

// Schema for country output (response)
export const countrySchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  ...countryBaseSchema.shape,
});
export type CountryOutput = z.infer<typeof countrySchema>;

// Schema for listing countries with pagination
export const listCountrySchema = z.object({
  items: z.array(countrySchema),
  total: z.number(),
});
export type ListCountryOutput = z.infer<typeof listCountrySchema>;

// Schema for country query params
export const countryQuerySchema = z
  .object({
    keyword: z.string().optional(),
  })
  .merge(
    z.object({
      pageSize: z.coerce.number().positive().max(1000).optional().default(10),
      page: z.coerce.number().positive().optional().default(1),
    }),
  );
export type CountryQueryInput = z.infer<typeof countryQuerySchema>;
