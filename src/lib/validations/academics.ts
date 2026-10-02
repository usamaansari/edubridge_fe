import { z } from "zod";

export const subjectSchema = z.enum(["physics", "chemistry", "maths", "biology"]);

export const doubtSchema = z.object({
  subject: subjectSchema,
  topic: z.string().trim().min(3, "Add the topic this doubt is about"),
  question: z.string().trim().min(10, "Describe your doubt in a little more detail"),
});

export const doubtReplySchema = z.object({
  body: z.string().trim().min(2, "Reply cannot be empty"),
});

export const questionSchema = z
  .object({
    subject: subjectSchema,
    type: z.enum(["single", "multiple", "numeric"]),
    text: z.string().trim().min(5, "Question text is required"),
    options: z.array(z.string().trim().min(1)).optional(),
    correct: z.array(z.string()).min(1, "Mark at least one correct answer"),
    marks: z.number().positive(),
    negative: z.number().min(0),
  })
  .refine((q) => q.type === "numeric" || (q.options?.length ?? 0) >= 2, {
    message: "Add at least two options",
    path: ["options"],
  });

export const testSchema = z.object({
  title: z.string().trim().min(3, "Give the test a title"),
  exam: z.enum(["JEE Main", "JEE Advanced", "NEET", "Chapter test"]),
  durationMin: z.number().int().min(10).max(240),
  scheduledAt: z.string().min(1, "Pick a date and time"),
  batchIds: z.array(z.string()).min(1, "Assign at least one batch"),
  questions: z.array(questionSchema).min(1, "Add at least one question"),
});

export const contentUploadSchema = z.object({
  title: z.string().trim().min(3, "Title is required"),
  subject: subjectSchema,
  chapter: z.string().trim().min(2, "Chapter is required"),
  kind: z.enum(["video", "pdf", "practice"]),
  batchIds: z.array(z.string()).min(1, "Publish to at least one batch"),
});

export type DoubtInput = z.infer<typeof doubtSchema>;
export type QuestionInput = z.infer<typeof questionSchema>;
export type TestInput = z.infer<typeof testSchema>;
export type ContentUploadInput = z.infer<typeof contentUploadSchema>;
