import { QuestionDifficulty, Subject } from "@/shared/enum";
import { z } from "zod";
import { dateStringSchema } from "./base-schema";
import { imageContentSchema, writingContentSchema } from "./question";
import { optionsTranslationSchema } from "./question";

export type Practice = z.infer<typeof practiceSchema>;

export const gradeSchema = z.object({
  score: z.number(),
  nclc: z.string(),
  ceral: z.string(),
});

export type Grade = z.infer<typeof gradeSchema>;

export const practiceSchema = z.object({
  id: z.string(),
  createdAt: dateStringSchema,
  currentQuestion: z.string(),
  duration: z.number(),
  submittedAt: dateStringSchema.nullable(),
  answers: z.array(
    z.object({
      questionId: z.string(),
      answer: z.string(),
      answerKey: z.string(),
    })
  ),
  questions: z.array(
    z.object({
      id: z.string(),
      stem: z.string(),
      options: z.array(z.string()),
      optionsTranslation: optionsTranslationSchema.array(),
      image: z.string().optional(),
      imageContent: imageContentSchema.optional(),
      audio: z.string().optional(),
      caption: z.string().optional(),
      difficulty: z.nativeEnum(QuestionDifficulty),
      score: z.number(),
      subject: z.nativeEnum(Subject),
      writingContent: writingContentSchema.nullable(),
    })
  ),
  grade: gradeSchema.nullable(),
  durationConsumed: z.number(),
});

export const listPracticeItemSchema = practiceSchema.omit({
  answers: true,
  submittedAt: true,
  questions: true,
});
