const schools = [
  "Delhi Public School",
  "Ryan International",
  "Kendriya Vidyalaya",
  "DAV Public School",
  "Amity International",
  "Bal Bharati Public School",
  "Modern School",
  "Sanskriti School",
];

export function PartnersSection() {
  const track = [...schools, ...schools];

  return (
    <section className="overflow-hidden border-y border-border bg-[#f4f8ff] py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-semibold uppercase tracking-[0.16em] text-primary">
          Trusted by Leading Schools
        </p>
      </div>

      <div className="relative mt-8">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#f4f8ff] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#f4f8ff] to-transparent" />
        <div className="animate-marquee flex w-max gap-4">
          {track.map((school, index) => (
            <div
              key={`${school}-${index}`}
              className="flex h-14 min-w-[220px] items-center justify-center rounded-xl border border-border bg-white px-5 text-sm font-semibold text-foreground/80 shadow-sm"
            >
              {school}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
