"use client";

import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const contactDetails = [
  {
    icon: MapPin,
    title: "Visit Us",
    body: "Aligarh, UP – 202001",
  },
  {
    icon: Phone,
    title: "Call Us",
    body: "+91 98765 43210 | +91 11 4567 8900",
  },
  {
    icon: Mail,
    title: "Email Us",
    body: "info@edubridgeacademy.in",
  },
  {
    icon: Clock3,
    title: "Office Hours",
    body: "Mon – Sat: 8:00 AM – 6:00 PM",
  },
];

const fieldClass =
  "mt-1.5 w-full rounded-xl border border-border bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-3 focus:ring-primary/20";

export function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-20 bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
          Get In Touch
        </p>
        <h2 className="mt-3 max-w-3xl font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Ready to Get Started?
        </h2>

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-5">
            {contactDetails.map((item) => (
              <div key={item.title} className="flex gap-4 rounded-2xl bg-[#f4f8ff] p-5">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <item.icon className="size-5" />
                </span>
                <div>
                  <h3 className="font-heading font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <form
            className="rounded-3xl border border-border bg-[#fafbfd] p-6 shadow-sm sm:p-8"
            onSubmit={(event) => event.preventDefault()}
          >
            <h3 className="font-heading text-xl font-semibold text-foreground">
              Send an Inquiry
            </h3>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-medium text-foreground">
                Student Name
                <input
                  type="text"
                  placeholder="Full name"
                  className={fieldClass}
                  required
                />
              </label>

              <label className="block text-sm font-medium text-foreground">
                Class
                <select className={fieldClass} defaultValue="" required>
                  <option value="" disabled>
                    Select Class
                  </option>
                  <option>Class 9</option>
                  <option>Class 10</option>
                  <option>Class 11</option>
                  <option>Class 12</option>
                </select>
              </label>

              <label className="block text-sm font-medium text-foreground">
                Parent/Guardian Name
                <input
                  type="text"
                  placeholder="Parent's name"
                  className={fieldClass}
                  required
                />
              </label>

              <label className="block text-sm font-medium text-foreground">
                Phone
                <input
                  type="tel"
                  placeholder="+91"
                  className={fieldClass}
                  required
                />
              </label>

              <label className="block text-sm font-medium text-foreground sm:col-span-2">
                Email
                <input
                  type="email"
                  placeholder="email@example.com"
                  className={fieldClass}
                  required
                />
              </label>

              <label className="block text-sm font-medium text-foreground sm:col-span-2">
                Program Interested In
                <select className={fieldClass} defaultValue="" required>
                  <option value="" disabled>
                    Select Program
                  </option>
                  <option>Foundation (Class 9–10)</option>
                  <option>JEE Preparation (Class 11–12)</option>
                  <option>NEET Preparation (Class 11–12)</option>
                  <option>Crash Course (3–6 months)</option>
                  <option>Scholarship Program</option>
                </select>
              </label>

              <label className="block text-sm font-medium text-foreground sm:col-span-2">
                Message
                <textarea
                  rows={4}
                  placeholder="Any questions or special requirements..."
                  className={`${fieldClass} resize-y`}
                />
              </label>
            </div>

            <Button type="submit" size="lg" className="mt-6 w-full sm:w-auto">
              Submit Inquiry
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
