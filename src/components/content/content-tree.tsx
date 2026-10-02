import Link from "next/link";
import { CheckCircle2, FileText, PencilLine, PlayCircle } from "lucide-react";
import type { ContentKind, Subject } from "@/types";
import { cn } from "@/lib/utils";

const kindIcon: Record<ContentKind, typeof PlayCircle> = {
  video: PlayCircle,
  pdf: FileText,
  practice: PencilLine,
};

type ContentTreeProps = {
  subject: Subject;
  activeTopicId?: string;
  hrefFor: (topicId: string) => string;
};

export function ContentTree({ subject, activeTopicId, hrefFor }: ContentTreeProps) {
  return (
    <nav aria-label={`${subject.name} chapters`} className="space-y-5">
      {subject.chapters.map((chapter, chapterIndex) => (
        <div key={chapter.id}>
          <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {chapterIndex + 1}. {chapter.title}
          </p>
          <ul className="space-y-0.5">
            {chapter.topics.map((topic) => {
              const Icon = topic.completed ? CheckCircle2 : kindIcon[topic.kind];
              const active = topic.id === activeTopicId;
              return (
                <li key={topic.id}>
                  <Link
                    href={hrefFor(topic.id)}
                    className={cn(
                      "flex items-center gap-2.5 rounded-lg px-2 py-2 text-sm transition-colors",
                      active
                        ? "bg-primary/10 font-medium text-primary"
                        : "text-foreground/80 hover:bg-muted",
                    )}
                  >
                    <Icon
                      className={cn(
                        "size-4 shrink-0",
                        topic.completed && !active ? "text-emerald-500" : undefined,
                      )}
                    />
                    <span className="flex-1 truncate">{topic.title}</span>
                    <span className="text-xs text-muted-foreground">{topic.durationMin}m</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
