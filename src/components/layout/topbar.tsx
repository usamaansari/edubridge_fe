"use client";

import { useEffect } from "react";
import { Bell, LogOut, Menu } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth/actions";
import { roleLabels } from "@/lib/auth/config";
import { useSessionStore } from "@/store/session-store";
import { useUiStore } from "@/store/ui-store";
import type { SessionUser } from "@/types";
import { Breadcrumbs } from "./breadcrumbs";

type TopbarProps = {
  user: SessionUser;
};

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

export function Topbar({ user }: TopbarProps) {
  const toggleSidebar = useUiStore((s) => s.toggleSidebar);
  const setUser = useSessionStore((s) => s.setUser);

  useEffect(() => {
    setUser(user);
  }, [user, setUser]);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/85 px-4 backdrop-blur sm:px-6 lg:px-8">
      <Button
        variant="ghost"
        size="icon-sm"
        className="lg:hidden"
        onClick={toggleSidebar}
        aria-label="Open menu"
      >
        <Menu />
      </Button>

      <div className="min-w-0 flex-1">
        <Breadcrumbs />
      </div>

      <Button variant="ghost" size="icon-sm" aria-label="Notifications">
        <Bell />
      </Button>

      <div className="flex items-center gap-3 border-l border-border pl-3">
        <Avatar className="size-8">
          <AvatarFallback className="text-xs font-semibold">
            {initials(user.name)}
          </AvatarFallback>
        </Avatar>
        <div className="hidden leading-tight md:block">
          <p className="text-sm font-medium">{user.name}</p>
          <p className="text-xs text-muted-foreground">{roleLabels[user.role]}</p>
        </div>
        <form action={signOut}>
          <Button type="submit" variant="ghost" size="icon-sm" aria-label="Sign out">
            <LogOut />
          </Button>
        </form>
      </div>
    </header>
  );
}
