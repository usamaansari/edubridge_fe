"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

const snippets = [
  { label: "x²", insert: "^{2}" },
  { label: "√", insert: "\\sqrt{}" },
  { label: "a/b", insert: "\\frac{a}{b}" },
  { label: "∫", insert: "\\int_{a}^{b}" },
  { label: "Σ", insert: "\\sum_{i=1}^{n}" },
  { label: "θ", insert: "\\theta" },
  { label: "π", insert: "\\pi" },
  { label: "→", insert: "\\rightarrow" },
];

type LatexEditorProps = {
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  className?: string;
};

export function LatexEditor({
  name,
  value,
  onChange,
  placeholder = "Type your question. Use $…$ for inline maths, e.g. $v^{2} = u^{2} + 2as$",
  rows = 5,
  className,
}: LatexEditorProps) {
  const ref = useRef<HTMLTextAreaElement>(null);

  const insert = (snippet: string) => {
    const el = ref.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const next = `${value.slice(0, start)}${snippet}${value.slice(end)}`;
    onChange(next);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(start + snippet.length, start + snippet.length);
    });
  };

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-3 focus-within:ring-primary/20",
        className,
      )}
    >
      <div className="flex flex-wrap gap-1 border-b border-border bg-muted/40 px-2 py-1.5">
        {snippets.map((s) => (
          <button
            key={s.label}
            type="button"
            onClick={() => insert(s.insert)}
            className="rounded-md px-2 py-1 font-mono text-xs text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
            title={s.insert}
          >
            {s.label}
          </button>
        ))}
      </div>
      <textarea
        ref={ref}
        name={name}
        value={value}
        rows={rows}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="block w-full resize-y bg-transparent px-3 py-2.5 font-mono text-sm outline-none placeholder:font-sans placeholder:text-muted-foreground/70"
      />
    </div>
  );
}
