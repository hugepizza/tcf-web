import { z } from "zod";

enum QuestionContentType {
  LISTENING_SELECTION = "LISTENING_SELECTION",
  READING_SELECTION = "READING_SELECTION",
}

const listeningSelectionSchema = z.object({
  type: z.literal("LISTENING_SELECTION"),
  imagePath: z.string(),
  introduction: z.string(),
  options: z.array(
    z
      .object({
        text: z.string(),
      })
      .array()
      .length(4)
  ),
});

const readingSelectionSchema = listeningSelectionSchema;

export const optionsTranslationSchema = z.object({
  chinese: z.string(),
  english: z.string(),
});

export const imageContentSchema = z.object({
  original_text: z.string().optional().default(""),
  questions_translation: z.string().optional().default(""),
  questions: z.string().optional().default(""),
  original_text_translation: z.string().optional().default(""),
});

export const writingContentSchema = z.object({
  tache: z.enum(["1", "2", "3"]),
  background: z.string(),
  backgroundTranslation: z.string(),
  requirements: z.string(),
  requirementsTranslation: z.string(),

  instructions: z.string(),
  instructionsTranslation: z.string(),
  document: z.string().array(),
  documentTranslation: z.string().array(),
});

export const questionContentSchema = z.object({
  type: z.nativeEnum(QuestionContentType),
  listening: listeningSelectionSchema.optional(),
  reading: readingSelectionSchema.optional(),
});
