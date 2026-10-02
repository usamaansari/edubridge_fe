import { Clock3, Mail, MapPin, Phone } from "lucide-react";

const channels = [
  {
    icon: Mail,
    title: "Email Us",
    subtitle: "Send us an email anytime",
    primary: "info@edubridgeacademy.in",
    note: "We'll respond within 24 hours",
    href: "mailto:info@edubridgeacademy.in",
  },
  {
    icon: Phone,
    title: "Call Us",
    subtitle: "Speak with our admissions team",
    primary: "+91 98765 43210",
    note: "Mon – Sat: 8:00 AM – 6:00 PM",
    href: "tel:+919876543210",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    subtitle: "Our campus location",
    primary: "Sector 62, Noida, UP",
    note: "123, Education Hub – 201301",
    href: "#map",
  },
];

export function ContactChannels() {
  return (
    <section className="bg-white pb-8 pt-2 sm:pb-10">
      <div className="mx-auto grid max-w-6xl gap-5 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
        {channels.map((channel) => (
          <a
            key={channel.title}
            href={channel.href}
            className="group rounded-2xl border border-border bg-[#fafbfd] p-6 transition hover:-translate-y-1 hover:border-primary/30 hover:bg-white hover:shadow-lg"
          >
            <span className="flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground transition group-hover:scale-105">
              <channel.icon className="size-5" />
            </span>
            <h2 className="mt-5 font-heading text-xl font-semibold text-foreground">
              {channel.title}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {channel.subtitle}
            </p>
            <p className="mt-4 font-heading text-base font-semibold text-primary">
              {channel.primary}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{channel.note}</p>
          </a>
        ))}
      </div>

      <div className="mx-auto mt-5 flex max-w-6xl items-center justify-center gap-2 px-4 text-sm text-muted-foreground sm:px-6 lg:px-8">
        <Clock3 className="size-4 text-primary" />
        Office hours: Monday to Saturday, 8:00 AM – 6:00 PM
      </div>
    </section>
  );
}
