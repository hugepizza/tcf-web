import { z } from 'zod';

export const signInOutputSchema = z.object({
  id: z.string(),
  username: z.string(),
  accessToken: z.string(),
});

export const signInInputSchema = z.object({
  username: z.string(),
  password: z.string(),
});
