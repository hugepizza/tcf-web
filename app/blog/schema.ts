import { dateStringSchema } from "@/shared/schemas/base-schema";
import { z } from "zod";

export const postSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  cover: z.string(),
  tags: z.array(z.object({ id: z.string(), title: z.string() })),
  createdAt: dateStringSchema,
  readingTime: z.number(),
});
export type Post = z.infer<typeof postSchema>;
