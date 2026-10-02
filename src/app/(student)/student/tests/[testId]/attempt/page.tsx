import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TestAttempt } from "@/components/tests";
import { sampleQuestions, tests } from "@/lib/mock-data";

export async function generateMetadata({
  params,
}: PageProps<"/student/tests/[testId]/attempt">): Promise<Metadata> {
  const { testId } = await params;
  const test = tests.find((t) => t.id === testId);
  return { title: test ? `Attempt · ${test.title}` : "Attempt test" };
}

export default async function TestAttemptPage({
  params,
}: PageProps<"/student/tests/[testId]/attempt">) {
  const { testId } = await params;
  const test = tests.find((t) => t.id === testId);
  if (!test) notFound();

  const questions = sampleQuestions.filter((q) => test.subjects.includes(q.subject));

  return <TestAttempt test={test} questions={questions.length ? questions : sampleQuestions} />;
}
