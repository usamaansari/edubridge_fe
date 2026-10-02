import { Download, FileText } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

type PDFViewerProps = {
  title: string;
  src?: string;
};

export function PDFViewer({ title, src }: PDFViewerProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border">
      <div className="flex items-center justify-between gap-3 border-b border-border bg-muted/40 px-4 py-2.5">
        <p className="flex min-w-0 items-center gap-2 text-sm font-medium">
          <FileText className="size-4 shrink-0 text-primary" />
          <span className="truncate">{title}</span>
        </p>
        {src ? (
          <a href={src} download className={buttonVariants({ variant: "outline", size: "xs" })}>
            <Download /> Download
          </a>
        ) : null}
      </div>
      {src ? (
        <iframe src={src} title={title} className="h-[70vh] w-full bg-white" />
      ) : (
        <div className="flex h-80 flex-col items-center justify-center gap-2 bg-white text-sm text-muted-foreground">
          <FileText className="size-10 text-muted-foreground/50" strokeWidth={1.25} />
          The document will appear here once it is published.
        </div>
      )}
    </div>
  );
}
