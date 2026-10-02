import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type AuthShellProps = {
  children: React.ReactNode;
};

export function AuthShell({ children }: AuthShellProps) {
  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      <aside className="relative hidden overflow-hidden bg-[#0b1220] lg:block">
        <Image
          src="/images/hero-classroom.png"
          alt="Students learning in an EduBridge classroom"
          fill
          priority
          className="object-cover"
          sizes="50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1220]/90 via-[#0b1220]/35 to-[#0b1220]/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(9,102,255,0.35),_transparent_55%)]" />

        <Link
          href="/"
          className="absolute left-6 top-6 z-10 inline-flex size-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-white/25"
          aria-label="Back to home"
        >
          <ArrowLeft className="size-5" />
        </Link>

        <div className="absolute inset-x-0 bottom-0 z-10 p-10">
          <p className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
            EduBridge Academy
          </p>
          <h2 className="mt-3 max-w-md font-heading text-3xl font-bold leading-tight tracking-tight text-white">
            Where school meets success
          </h2>
          <p className="mt-3 max-w-sm text-sm leading-6 text-white/75">
            Boards + JEE/NEET preparation in one integrated system — for Classes
            9–12.
          </p>
        </div>
      </aside>

      <div className="relative flex flex-col bg-white">
        <div className="flex items-center justify-between px-5 pt-5 sm:px-8 lg:hidden">
          <Link
            href="/"
            className="inline-flex size-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-muted"
            aria-label="Back to home"
          >
            <ArrowLeft className="size-5" />
          </Link>
          <Link
            href="/"
            className="font-heading text-sm font-bold tracking-tight text-foreground"
          >
            Edu<span className="text-primary">Bridge</span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center px-5 py-10 sm:px-10">
          <div className="w-full max-w-[420px] animate-fade-up">{children}</div>
        </div>
      </div>
    </div>
  );
}
