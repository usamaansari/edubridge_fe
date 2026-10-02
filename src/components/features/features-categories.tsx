const categories = [
  {
    label: "Learn",
    title: "Learning Systems",
    href: "#learning",
    count: "5 features",
  },
  {
    label: "Grow",
    title: "Progress & Mentorship",
    href: "#progress",
    count: "3 features",
  },
  {
    label: "Support",
    title: "Support Ecosystem",
    href: "#support",
    count: "4 features",
  },
];

export function FeaturesCategories() {
  return (
    <section className="border-y border-border bg-white py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
              The Ecosystem
            </p>
            <p className="mt-2 max-w-md font-heading text-xl font-semibold text-foreground">
              Twelve connected features across learning, progress, and support
            </p>
          </div>
          <nav
            aria-label="Feature categories"
            className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:max-w-2xl lg:flex-1"
          >
            {categories.map((category, index) => (
              <a
                key={category.href}
                href={category.href}
                className="group rounded-2xl border border-border bg-[#fafbfd] px-4 py-3 transition hover:border-primary/30 hover:bg-white hover:shadow-md"
              >
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {String(index + 1).padStart(2, "0")} · {category.label}
                </span>
                <span className="mt-1 block font-heading text-sm font-semibold text-foreground transition group-hover:text-primary">
                  {category.title}
                </span>
                <span className="mt-1 block text-xs text-muted-foreground">
                  {category.count}
                </span>
              </a>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}
