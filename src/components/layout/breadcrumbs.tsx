"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { Fragment } from "react";

const labelOverrides: Record<string, string> = {
  "audit-logs": "Audit logs",
  builder: "Test builder",
};

function toLabel(segment: string) {
  const decoded = decodeURIComponent(segment);
  return (
    labelOverrides[decoded] ??
    decoded.replace(/-/g, " ").replace(/^\w/, (c) => c.toUpperCase())
  );
}

export function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length <= 1) return null;

  const crumbs = segments.slice(1).map((segment, index) => ({
    label: toLabel(segment),
    href: `/${segments.slice(0, index + 2).join("/")}`,
  }));

  return (
    <nav aria-label="Breadcrumb" className="hidden min-w-0 items-center gap-1.5 text-sm sm:flex">
      {crumbs.map((crumb, index) => {
        const last = index === crumbs.length - 1;
        return (
          <Fragment key={crumb.href}>
            {index > 0 ? (
              <ChevronRight className="size-3.5 shrink-0 text-muted-foreground/60" />
            ) : null}
            {last ? (
              <span className="truncate font-medium text-foreground">{crumb.label}</span>
            ) : (
              <Link
                href={crumb.href}
                className="truncate text-muted-foreground transition-colors hover:text-foreground"
              >
                {crumb.label}
              </Link>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
}
