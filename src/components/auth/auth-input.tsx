"use client";

import { useState, type InputHTMLAttributes, type ReactNode } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

type AuthInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hideLabel?: boolean;
  endAdornment?: ReactNode;
};

export function AuthInput({
  label,
  hideLabel = false,
  id,
  className,
  endAdornment,
  type = "text",
  ...props
}: AuthInputProps) {
  const inputId = id ?? props.name;

  return (
    <label
      className={cn("block", !hideLabel && "space-y-1.5")}
      htmlFor={inputId}
    >
      <span
        className={cn(
          "text-sm font-medium text-foreground/80",
          hideLabel && "sr-only",
        )}
      >
        {label}
      </span>
      <span className="relative block">
        <input
          id={inputId}
          type={type}
          className={cn(
            "h-11 w-full rounded-lg border border-[#e5e7eb] bg-white px-3.5 text-sm text-foreground outline-none transition-[border-color,box-shadow] placeholder:text-muted-foreground/70 focus:border-primary focus:ring-3 focus:ring-primary/20",
            endAdornment && "pr-11",
            className,
          )}
          {...props}
        />
        {endAdornment ? (
          <span className="absolute inset-y-0 right-0 flex items-center pr-3.5">
            {endAdornment}
          </span>
        ) : null}
      </span>
    </label>
  );
}

type AuthPasswordInputProps = Omit<AuthInputProps, "type" | "endAdornment">;

export function AuthPasswordInput(props: AuthPasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <AuthInput
      {...props}
      type={visible ? "text" : "password"}
      endAdornment={
        <button
          type="button"
          onClick={() => setVisible((value) => !value)}
          className="text-muted-foreground transition-colors hover:text-foreground"
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      }
    />
  );
}
