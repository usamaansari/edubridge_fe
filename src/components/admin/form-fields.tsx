"use client";

import { cn } from "@/lib/utils";

const fieldClassName =
  "h-10 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none transition-[border-color,box-shadow] placeholder:text-muted-foreground/70 focus:border-primary focus:ring-3 focus:ring-primary/20";

type FormFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export function FormField({ label, id, className, ...props }: FormFieldProps) {
  const fieldId = id ?? props.name;
  return (
    <label className="block space-y-1.5" htmlFor={fieldId}>
      <span className="text-sm font-medium text-foreground/80">{label}</span>
      <input id={fieldId} className={cn(fieldClassName, className)} {...props} />
    </label>
  );
}

type FormSelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: { value: string; label: string }[];
};

export function FormSelect({
  label,
  id,
  className,
  options,
  ...props
}: FormSelectProps) {
  const fieldId = id ?? props.name;
  return (
    <label className="block space-y-1.5" htmlFor={fieldId}>
      <span className="text-sm font-medium text-foreground/80">{label}</span>
      <select
        id={fieldId}
        className={cn(fieldClassName, "appearance-none pr-8", className)}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}

type FormTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
};

export function FormTextarea({
  label,
  id,
  className,
  ...props
}: FormTextareaProps) {
  const fieldId = id ?? props.name;
  return (
    <label className="block space-y-1.5" htmlFor={fieldId}>
      <span className="text-sm font-medium text-foreground/80">{label}</span>
      <textarea
        id={fieldId}
        className={cn(
          "min-h-24 w-full resize-y rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none transition-[border-color,box-shadow] placeholder:text-muted-foreground/70 focus:border-primary focus:ring-3 focus:ring-primary/20",
          className,
        )}
        {...props}
      />
    </label>
  );
}
