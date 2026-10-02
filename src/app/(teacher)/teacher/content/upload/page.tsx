"use client";

import { useState, type DragEvent } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, UploadCloud, X } from "lucide-react";
import { FormField, FormSelect, FormTextarea } from "@/components/admin";
import { PageHeader } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { batches, subjectLabels } from "@/lib/mock-data";
import { contentUploadSchema } from "@/lib/validations/academics";
import { cn } from "@/lib/utils";

const accept: Record<string, string> = {
  video: "video/mp4,video/webm",
  pdf: "application/pdf",
  practice: "application/pdf,.csv,.xlsx",
};

export default function ContentUploadPage() {
  const router = useRouter();
  const [kind, setKind] = useState("video");
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [selectedBatches, setSelectedBatches] = useState<string[]>([batches[0].id]);
  const [errors, setErrors] = useState<string[]>([]);
  const [published, setPublished] = useState(false);

  const onDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) setFile(dropped);
  };

  if (published) {
    return (
      <div className="mx-auto max-w-lg rounded-2xl border border-border bg-background p-8 text-center">
        <CheckCircle2 className="mx-auto size-12 text-emerald-500" />
        <h1 className="mt-4 font-heading text-xl font-bold">Content published</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Students in {selectedBatches.length} batch{selectedBatches.length === 1 ? "" : "es"} will see it in their Learn section.
        </p>
        <div className="mt-6 flex justify-center gap-2">
          <Button variant="outline" onClick={() => { setPublished(false); setFile(null); }}>Upload another</Button>
          <Button onClick={() => router.push("/teacher/content")}>Go to library</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader title="Upload content" description="Add a lecture video, notes PDF or practice set to your batches." />

      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          const parsed = contentUploadSchema.safeParse({
            title: fd.get("title"),
            subject: fd.get("subject"),
            chapter: fd.get("chapter"),
            kind,
            batchIds: selectedBatches,
          });
          const issues = parsed.success ? [] : parsed.error.issues.map((i) => i.message);
          if (!file) issues.push("Attach a file to upload");
          setErrors(issues);
          if (issues.length === 0) setPublished(true);
        }}
      >
        <section className="space-y-4 rounded-2xl border border-border bg-background p-5">
          <div className="grid gap-2 sm:grid-cols-3">
            {[
              ["video", "Lecture video"],
              ["pdf", "Notes / PDF"],
              ["practice", "Practice set"],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => { setKind(value); setFile(null); }}
                className={cn(
                  "rounded-xl border px-4 py-3 text-sm font-medium transition-colors",
                  kind === value ? "border-primary bg-primary/5 text-primary" : "border-border hover:bg-muted/50",
                )}
              >
                {label}
              </button>
            ))}
          </div>

          <label
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            className={cn(
              "flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-10 text-center transition-colors",
              dragging ? "border-primary bg-primary/5" : "border-border hover:bg-muted/30",
            )}
          >
            <input type="file" accept={accept[kind]} className="sr-only" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
            {file ? (
              <div className="flex items-center gap-3 rounded-xl bg-muted px-4 py-2 text-sm">
                <span className="font-medium">{file.name}</span>
                <span className="text-muted-foreground">{(file.size / 1024 / 1024).toFixed(1)} MB</span>
                <button type="button" onClick={(e) => { e.preventDefault(); setFile(null); }} aria-label="Remove file">
                  <X className="size-4" />
                </button>
              </div>
            ) : (
              <>
                <UploadCloud className="size-10 text-primary" strokeWidth={1.5} />
                <p className="mt-3 text-sm font-medium">Drag & drop or click to browse</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {kind === "video" ? "MP4 or WebM, up to 2 GB" : "PDF, up to 50 MB"}
                </p>
              </>
            )}
          </label>
        </section>

        <section className="grid gap-4 rounded-2xl border border-border bg-background p-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <FormField label="Title" name="title" placeholder="e.g. Projectile Motion — Part 2" />
          </div>
          <FormSelect
            label="Subject"
            name="subject"
            options={Object.entries(subjectLabels).map(([value, label]) => ({ value, label }))}
          />
          <FormField label="Chapter" name="chapter" placeholder="e.g. Kinematics" />
          <div className="sm:col-span-2">
            <FormTextarea label="Description (optional)" name="description" placeholder="What will students learn?" />
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-background p-5">
          <p className="text-sm font-medium text-foreground/80">Publish to batches</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {batches.map((b) => {
              const on = selectedBatches.includes(b.id);
              return (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setSelectedBatches((prev) => (on ? prev.filter((id) => id !== b.id) : [...prev, b.id]))}
                  className={cn(
                    "rounded-lg border px-3 py-1.5 text-sm transition-colors",
                    on ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-muted/50",
                  )}
                >
                  {b.name}
                </button>
              );
            })}
          </div>
        </section>

        {errors.length ? (
          <ul className="list-inside list-disc rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
            {errors.map((e) => <li key={e}>{e}</li>)}
          </ul>
        ) : null}

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
          <Button type="submit">Publish</Button>
        </div>
      </form>
    </div>
  );
}
