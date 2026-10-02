"use client";

import { Clock3, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const fieldClass =
  "mt-1.5 w-full rounded-xl border border-border bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-3 focus:ring-primary/20";

export function ContactFormSection() {
  return (
    <section className="bg-[#f7f9fc] py-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            Send a Message
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Let&apos;s Start a Conversation
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            Fill out the form and we&apos;ll get back to you as soon as possible.
            Whether you&apos;re interested in enrollment, a school partnership,
            scholarships, or just want to learn more — we&apos;re here to help.
          </p>

          <div className="mt-8 rounded-2xl border border-border bg-white p-5 shadow-sm">
            <div className="flex items-start gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Clock3 className="size-5" />
              </span>
              <div>
                <h3 className="font-heading font-semibold text-foreground">
                  Quick Response
                </h3>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  Average response time: 2–4 hours during office hours
                </p>
              </div>
            </div>
          </div>

          <div id="map" className="mt-5 rounded-2xl border border-border bg-white p-5 shadow-sm">
            <h3 className="font-heading font-semibold text-foreground">
              Campus Address
            </h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              123, Education Hub, Sector 62, Noida, UP – 201301
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Also available: +91 11 4567 8900
            </p>
          </div>
        </div>

        <form
          className="rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="mb-6">
            <h3 className="font-heading text-xl font-semibold text-foreground">
              Contact Form
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Fill out the form below and we&apos;ll get back to you
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium text-foreground">
              First Name
              <input
                type="text"
                placeholder="First name"
                className={fieldClass}
                required
              />
            </label>

            <label className="block text-sm font-medium text-foreground">
              Last Name
              <input
                type="text"
                placeholder="Last name"
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

            <label className="block text-sm font-medium text-foreground">
              Phone
              <input
                type="tel"
                placeholder="+91"
                className={fieldClass}
                required
              />
            </label>

            <label className="block text-sm font-medium text-foreground">
              Subject
              <select className={fieldClass} defaultValue="" required>
                <option value="" disabled>
                  Select subject
                </option>
                <option>Admissions Inquiry</option>
                <option>Book a Demo</option>
                <option>School Partnership</option>
                <option>Scholarship Support</option>
                <option>General Question</option>
              </select>
            </label>

            <label className="block text-sm font-medium text-foreground sm:col-span-2">
              Program Interested In
              <select className={fieldClass} defaultValue="">
                <option value="">Select program (optional)</option>
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
                rows={5}
                placeholder="Tell us how we can help..."
                className={`${fieldClass} resize-y`}
                required
              />
            </label>
          </div>

          <Button type="submit" size="lg" className="mt-6 w-full sm:w-auto">
            Send Message
            <Send data-icon="inline-end" />
          </Button>
        </form>
      </div>
    </section>
  );
}
