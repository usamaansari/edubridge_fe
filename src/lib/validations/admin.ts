import { z } from "zod";

export const batchSchema = z.object({
  name: z.string().trim().min(3, "Batch name is required"),
  program: z.enum(["JEE", "NEET", "Foundation"]),
  className: z.enum(["9", "10", "11", "12"]),
  capacity: z.coerce.number().int().min(1).max(200),
  startDate: z.string().min(1, "Start date is required"),
  mentor: z.string().optional(),
});

export const feeSchema = z.object({
  studentId: z.string().min(1),
  amount: z.coerce.number().positive("Amount must be greater than zero"),
  dueDate: z.string().min(1, "Due date is required"),
  mode: z.enum(["UPI", "Card", "Bank transfer", "Cash"]).optional(),
});

export const scholarshipSchema = z.object({
  studentId: z.string().min(1),
  type: z.enum(["Merit", "Need-based", "Sibling", "Staff ward"]),
  percentage: z.coerce.number().min(5).max(100),
});

export type BatchInput = z.infer<typeof batchSchema>;
export type FeeInput = z.infer<typeof feeSchema>;
export type ScholarshipInput = z.infer<typeof scholarshipSchema>;
