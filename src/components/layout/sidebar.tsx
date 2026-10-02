"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useUiStore } from "@/store/ui-store";
import type { Portal, Role } from "@/types";
import { portalLabels, portalNav, type NavItem } from "./nav-config";

type SidebarProps = {
  portal: Portal;
  role: Role;
};

const prefixOf = (item: NavItem) => item.match ?? item.href;

function useActiveHref(items: NavItem[]) {
  const pathname = usePathname();
  const matches = items.filter((item) => {
    const prefix = prefixOf(item);
    return pathname === prefix || pathname.startsWith(`${prefix}/`);
  });
  matches.sort((a, b) => prefixOf(b).length - prefixOf(a).length);
  return matches[0]?.href;
}

export function Sidebar({ portal, role }: SidebarProps) {
  const open = useUiStore((s) => s.sidebarOpen);
  const setOpen = useUiStore((s) => s.setSidebarOpen);
  const items = portalNav[portal].filter(
    (item) => !item.roles || item.roles.includes(role),
  );
  const activeHref = useActiveHref(items);
  const home = items[0]?.href ?? "/";

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-foreground/20 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-sidebar-border bg-sidebar transition-transform duration-200 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-5">
          <Link
            href={home}
            className="font-heading text-lg font-bold tracking-tight text-sidebar-foreground"
          >
            Edu<span className="text-primary">Bridge</span>
            <span className="ml-2 rounded-md bg-primary/10 px-1.5 py-0.5 align-middle text-[10px] font-semibold uppercase tracking-wide text-primary">
              {portalLabels[portal]}
            </span>
          </Link>
          <Button
            variant="ghost"
            size="icon-sm"
            className="lg:hidden"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <X />
          </Button>
        </div>

        <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-3 py-4">
          {items.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                href === activeHref
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <Icon className="size-4 shrink-0" />
              {label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
