import Link from "next/link";
import { Compass } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[linear-gradient(180deg,#f7f9fc_0%,#ffffff_60%)] px-6 text-center">
      <span className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Compass className="size-7" />
      </span>
      <p className="mt-6 font-heading text-6xl font-bold tracking-tight text-primary">404</p>
      <h1 className="mt-3 font-heading text-2xl font-bold tracking-tight">
        This page took a wrong turn
      </h1>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or has been moved. Check the URL, or
        head back to familiar ground.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className={buttonVariants()}>
          Back to home
        </Link>
        <Link href="/dashboard" className={buttonVariants({ variant: "outline" })}>
          Go to my dashboard
        </Link>
      </div>
    </main>
  );
}
