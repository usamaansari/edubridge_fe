"use client";

import { useState } from "react";
import { ChevronDown, MessageSquare } from "lucide-react";
import { StatusBadge } from "@/components/admin/data-table";
import { Button } from "@/components/ui/button";
import { subjectLabels } from "@/lib/mock-data";
import { cn, formatRelative } from "@/lib/utils";
import type { Doubt, DoubtStatus, Tone } from "@/types";
import { DoubtReply } from "./doubt-reply";
import { LatexEditor } from "./latex-editor";

const statusMeta: Record<DoubtStatus, { label: string; tone: Tone }> = {
  open: { label: "Awaiting reply", tone: "warning" },
  answered: { label: "Answered", tone: "info" },
  resolved: { label: "Resolved", tone: "success" },
};

type DoubtCardProps = {
  doubt: Doubt;
  showStudent?: boolean;
  onReply?: (body: string) => void;
  onResolve?: () => void;
  defaultOpen?: boolean;
};

export function DoubtCard({
  doubt,
  showStudent = false,
  onReply,
  onResolve,
  defaultOpen = false,
}: DoubtCardProps) {
  const [open, setOpen] = useState(defaultOpen);
  const [draft, setDraft] = useState("");
  const meta = statusMeta[doubt.status];

  return (
    <article className="rounded-2xl border border-border bg-background">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start gap-4 p-5 text-left"
        aria-expanded={open}
      >
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-medium text-primary">{subjectLabels[doubt.subject]}</span>
            <span className="text-muted-foreground">· {doubt.topic}</span>
          </div>
          <p className="mt-1.5 font-medium leading-snug">{doubt.question}</p>
          <p className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
            {showStudent ? <span>{doubt.student}</span> : null}
            <span>{formatRelative(doubt.createdAt)}</span>
            <span className="flex items-center gap-1">
              <MessageSquare className="size-3" /> {doubt.replies.length}
            </span>
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <StatusBadge status={meta.label} tone={meta.tone} />
          <ChevronDown
            className={cn("size-4 text-muted-foreground transition-transform", open && "rotate-180")}
          />
        </div>
      </button>

      {open ? (
        <div className="space-y-4 border-t border-border px-5 py-4">
          {doubt.replies.length === 0 ? (
            <p className="text-sm text-muted-foreground">No replies yet.</p>
          ) : (
            doubt.replies.map((reply) => <DoubtReply key={reply.id} reply={reply} />)
          )}

          {onReply && doubt.status !== "resolved" ? (
            <form
              className="space-y-2"
              onSubmit={(e) => {
                e.preventDefault();
                if (!draft.trim()) return;
                onReply(draft.trim());
                setDraft("");
              }}
            >
              <LatexEditor name="reply" value={draft} onChange={setDraft} rows={3} placeholder="Write a reply…" />
              <div className="flex justify-end gap-2">
                {onResolve ? (
                  <Button type="button" variant="outline" size="sm" onClick={onResolve}>
                    Mark resolved
                  </Button>
                ) : null}
                <Button type="submit" size="sm" disabled={!draft.trim()}>
                  Send reply
                </Button>
              </div>
            </form>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
