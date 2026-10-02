import type { Doubt, DoubtReply, StudentSummary, Subject, Test } from "@/types";
import type { ContentUploadInput, DoubtInput, TestInput } from "@/lib/validations";
import { api } from "./client";

export type TestAttemptPayload = {
  answers: Record<string, string[]>;
  timeTakenSec: number;
};

export type TestResult = {
  testId: string;
  score: number;
  totalMarks: number;
  rank: number;
  percentile: number;
};

export const subjectsApi = {
  list: () => api.get<Subject[]>("/subjects").then((r) => r.data),
  get: (subjectId: string) => api.get<Subject>(`/subjects/${subjectId}`).then((r) => r.data),
};

export const testsApi = {
  list: () => api.get<Test[]>("/tests").then((r) => r.data),
  get: (testId: string) => api.get<Test>(`/tests/${testId}`).then((r) => r.data),
  create: (input: TestInput) => api.post<Test>("/tests", input).then((r) => r.data),
  submit: (testId: string, payload: TestAttemptPayload) =>
    api.post<TestResult>(`/tests/${testId}/attempts`, payload).then((r) => r.data),
  result: (testId: string) =>
    api.get<TestResult>(`/tests/${testId}/result`).then((r) => r.data),
};

export const doubtsApi = {
  list: (params?: { status?: string; subject?: string }) =>
    api.get<Doubt[]>("/doubts", { params }).then((r) => r.data),
  create: (input: DoubtInput) => api.post<Doubt>("/doubts", input).then((r) => r.data),
  reply: (doubtId: string, body: string) =>
    api.post<DoubtReply>(`/doubts/${doubtId}/replies`, { body }).then((r) => r.data),
  resolve: (doubtId: string) =>
    api.patch<Doubt>(`/doubts/${doubtId}`, { status: "resolved" }).then((r) => r.data),
};

export const studentsApi = {
  get: (studentId: string) =>
    api.get<StudentSummary>(`/students/${studentId}`).then((r) => r.data),
};

export const contentApi = {
  upload: (input: ContentUploadInput, file: File) => {
    const form = new FormData();
    Object.entries(input).forEach(([key, value]) =>
      form.append(key, Array.isArray(value) ? value.join(",") : String(value)),
    );
    form.append("file", file);
    return api
      .post("/content", form, { headers: { "Content-Type": "multipart/form-data" } })
      .then((r) => r.data);
  },
};
