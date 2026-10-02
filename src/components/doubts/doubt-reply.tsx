import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { roleLabels } from "@/lib/auth/config";
import { formatDateTime } from "@/lib/utils";
import type { DoubtReply as DoubtReplyType } from "@/types";

export function DoubtReply({ reply }: { reply: DoubtReplyType }) {
  const initials = reply.author
    .replace(/^(Dr\.|Prof\.)\s*/, "")
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="flex gap-3">
      <Avatar className="size-8">
        <AvatarFallback className="text-xs font-semibold">{initials}</AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1 rounded-xl bg-muted/50 px-4 py-3">
        <div className="flex flex-wrap items-baseline gap-x-2 text-xs">
          <span className="font-semibold text-foreground">{reply.author}</span>
          <span className="text-primary">{roleLabels[reply.role]}</span>
          <span className="text-muted-foreground">{formatDateTime(reply.createdAt)}</span>
        </div>
        <p className="mt-1.5 whitespace-pre-line text-sm leading-relaxed">{reply.body}</p>
      </div>
    </div>
  );
}
