export type Role =
  | "student"
  | "parent"
  | "teacher"
  | "mentor"
  | "centre_admin"
  | "super_admin";

export type Portal = "student" | "parent" | "teacher" | "mentor" | "admin";

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  role: Role;
  organisationId?: string;
};

export type Tone = "success" | "warning" | "danger" | "neutral" | "info";

export type SubjectKey = "physics" | "chemistry" | "maths" | "biology";

export type ContentKind = "video" | "pdf" | "practice";

export type Topic = {
  id: string;
  title: string;
  kind: ContentKind;
  durationMin: number;
  completed: boolean;
  summary: string;
  keyPoints: string[];
};

export type Chapter = {
  id: string;
  title: string;
  topics: Topic[];
};

export type Subject = {
  id: SubjectKey;
  name: string;
  progress: number;
  chapters: Chapter[];
};

export type QuestionType = "single" | "multiple" | "numeric";

export type Question = {
  id: string;
  subject: SubjectKey;
  type: QuestionType;
  text: string;
  options?: { id: string; text: string }[];
  correct: string[];
  marks: number;
  negative: number;
  explanation?: string;
};

export type TestStatus = "upcoming" | "live" | "completed";

export type Test = {
  id: string;
  title: string;
  exam: "JEE Main" | "JEE Advanced" | "NEET" | "Chapter test";
  subjects: SubjectKey[];
  durationMin: number;
  totalMarks: number;
  questionCount: number;
  scheduledAt: string;
  status: TestStatus;
  score?: number;
  rank?: number;
};

export type DoubtStatus = "open" | "answered" | "resolved";

export type DoubtReply = {
  id: string;
  author: string;
  role: Role;
  body: string;
  createdAt: string;
};

export type Doubt = {
  id: string;
  subject: SubjectKey;
  topic: string;
  question: string;
  student: string;
  createdAt: string;
  status: DoubtStatus;
  replies: DoubtReply[];
};

export type StudentSummary = {
  id: string;
  name: string;
  className: string;
  batch: string;
  target: "JEE" | "NEET";
  avgScore: number;
  attendance: number;
  streak: number;
  weakTopics: string[];
};

export type ApiError = {
  status: number;
  message: string;
  details?: Record<string, string[]>;
};
