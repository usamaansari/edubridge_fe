export function ContactHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(9,102,255,0.16),_transparent_52%),linear-gradient(180deg,#eef5ff_0%,#ffffff_78%)]" />
      <div className="pointer-events-none absolute -left-20 top-10 size-64 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 top-24 size-72 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-4 pb-14 pt-16 text-center sm:px-6 lg:px-8 lg:pb-16 lg:pt-24">
        <p className="animate-fade-up text-sm font-semibold uppercase tracking-[0.18em] text-primary">
          Get in Touch
        </p>
        <h1 className="animate-fade-up mt-4 font-heading text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Contact{" "}
          <span className="text-primary">EduBridge</span>
        </h1>
        <p
          className="animate-fade-up mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg"
          style={{ animationDelay: "80ms" }}
        >
          Have questions about admissions, programs, or school partnerships?
          Send us a message and we&apos;ll respond as soon as possible.
        </p>
      </div>
    </section>
  );
}
