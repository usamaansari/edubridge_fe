import type { Portal, SessionUser } from "@/types";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";

type ShellProps = {
  portal: Portal;
  user: SessionUser;
  children: React.ReactNode;
};

export function Shell({ portal, user, children }: ShellProps) {
  return (
    <div className="flex min-h-screen bg-[linear-gradient(180deg,#f7f9fc_0%,#ffffff_40%)]">
      <Sidebar portal={portal} role={user.role} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar user={user} />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
}
