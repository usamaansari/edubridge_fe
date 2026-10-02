import Link from "next/link";

const programLinks = [
  { href: "/programs#foundation", label: "Foundation (9-10)" },
  { href: "/programs#jee", label: "JEE Prep (11-12)" },
  { href: "/programs#neet", label: "NEET Prep (11-12)" },
  { href: "/programs#crash", label: "Crash Courses" },
  { href: "/programs#scholarships", label: "Scholarships" },
];

const companyLinks = [
  { href: "/about", label: "About Us" },
  { href: "/about#team", label: "Our Team" },
  { href: "/#results", label: "Partner Schools" },
  { href: "/contact", label: "Careers" },
  { href: "/features", label: "Features" },
];

const supportLinks = [
  { href: "/contact", label: "Contact Us" },
  { href: "/#how-it-works", label: "FAQ" },
  { href: "/contact", label: "Student Portal" },
  { href: "/contact", label: "Parent Login" },
  { href: "/contact", label: "Privacy Policy" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-[#0b1220] text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:px-8">
        <div>
          <Link href="/" className="font-heading text-xl font-bold tracking-tight">
            Edu<span className="text-[#6ea4ff]">Bridge</span> Academy
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-7 text-white/65">
            Bridging the gap between school education and competitive exam
            success through integrated smart learning.
          </p>
        </div>

        <div>
          <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-white/90">
            Programs
          </h3>
          <ul className="mt-4 space-y-2.5">
            {programLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-white/65 transition hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-white/90">
            Company
          </h3>
          <ul className="mt-4 space-y-2.5">
            {companyLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-white/65 transition hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-white/90">
            Support
          </h3>
          <ul className="mt-4 space-y-2.5">
            {supportLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-white/65 transition hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl px-4 py-5 sm:px-6 lg:px-8">
          <p className="text-sm text-white/50">
            © 2025 EduBridge Academy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
