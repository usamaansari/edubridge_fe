import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, MessageCircleQuestion } from "lucide-react";
import { ContentTree, PDFViewer, VideoPlayer } from "@/components/content";
import { ProgressRing } from "@/components/student";
import { buttonVariants } from "@/components/ui/button";
import { findTopic, subjects } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export async function generateMetadata({
  params,
}: PageProps<"/student/learn/[subjectId]/[topicId]">): Promise<Metadata> {
  const { subjectId, topicId } = await params;
  const match = findTopic(subjectId, topicId);
  return { title: match ? `${match.topic.title} · ${match.subject.name}` : "Learn" };
}

export default async function LearnTopicPage({
  params,
}: PageProps<"/student/learn/[subjectId]/[topicId]">) {
  const { subjectId, topicId } = await params;
  const match = findTopic(subjectId, topicId);
  if (!match) notFound();

  const { subject, chapter, topic, next } = match;
  const hrefFor = (id: string) => `/student/learn/${subject.id}/${id}`;

  return (
    <div className="grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
      <aside className="order-2 space-y-5 xl:order-1">
        <div className="flex flex-wrap gap-1.5">
          {subjects.map((s) => {
            const first = s.chapters[0].topics[0];
            return (
              <Link
                key={s.id}
                href={`/student/learn/${s.id}/${first.id}`}
                className={cn(
                  "rounded-lg px-2.5 py-1 text-xs font-medium transition-colors",
                  s.id === subject.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground",
                )}
              >
                {s.name}
              </Link>
            );
          })}
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-border bg-background p-4">
          <ProgressRing value={subject.progress} size={52} strokeWidth={5} />
          <div>
            <p className="text-sm font-medium">{subject.name}</p>
            <p className="text-xs text-muted-foreground">Syllabus completed</p>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-background p-3">
          <ContentTree subject={subject} activeTopicId={topic.id} hrefFor={hrefFor} />
        </div>
      </aside>

      <div className="order-1 min-w-0 space-y-6 xl:order-2">
        <div>
          <p className="text-sm text-muted-foreground">
            {subject.name} · {chapter.title}
          </p>
          <h1 className="mt-1 font-heading text-2xl font-bold tracking-tight sm:text-3xl">
            {topic.title}
          </h1>
        </div>

        {topic.kind === "video" ? (
          <VideoPlayer title={topic.title} durationMin={topic.durationMin} />
        ) : topic.kind === "pdf" ? (
          <PDFViewer title={`${topic.title}.pdf`} />
        ) : (
          <div className="rounded-2xl border border-border bg-primary/[0.03] p-6">
            <p className="font-heading text-lg font-semibold">Practice set</p>
            <p className="mt-1 text-sm text-muted-foreground">{topic.summary}</p>
            <Link href="/student/tests" className={cn(buttonVariants({ size: "sm" }), "mt-4")}>
              Start practice
            </Link>
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-3">
          <section className="rounded-2xl border border-border bg-background p-5 lg:col-span-2">
            <h2 className="font-heading text-base font-semibold">About this lesson</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{topic.summary}</p>
            <h3 className="mt-5 text-sm font-semibold">Key takeaways</h3>
            <ul className="mt-2 space-y-2">
              {topic.keyPoints.map((point) => (
                <li key={point} className="flex gap-2 text-sm">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="flex flex-col gap-3 rounded-2xl border border-border bg-background p-5">
            <h2 className="font-heading text-base font-semibold">Stuck somewhere?</h2>
            <p className="text-sm text-muted-foreground">
              Post a doubt and a faculty member will reply, usually within a few hours.
            </p>
            <Link
              href="/student/doubts"
              className={cn(buttonVariants({ variant: "outline", size: "sm" }), "mt-auto")}
            >
              <MessageCircleQuestion /> Ask a doubt
            </Link>
            {next ? (
              <Link href={hrefFor(next.id)} className={buttonVariants({ size: "sm" })}>
                Next: {next.title} <ArrowRight />
              </Link>
            ) : null}
          </section>
        </div>
      </div>
    </div>
  );
}
