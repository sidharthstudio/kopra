"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BUSINESS } from "@/lib/business";
import { todayISO, type FieldErrors } from "@/lib/validation";

const TYPE_OPTIONS = [
  { value: "private-event", label: "Private party or celebration" },
  { value: "workshop", label: "Cocktail workshop" },
  { value: "event", label: "Group tasting or event" },
  { value: "general", label: "Something else" },
];

export default function EnquiryForm({
  defaultType = "private-event",
  tone = "dark",
  compact = false,
  heading = "Tell us about it",
}: {
  defaultType?: string;
  tone?: "dark" | "ivory";
  compact?: boolean;
  heading?: string;
}) {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [message, setMessage] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [reference, setReference] = useState<string | null>(null);
  const ivory = tone === "ivory";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      type: String(data.get("type") ?? "general"),
      name: String(data.get("name") ?? ""),
      phone: String(data.get("phone") ?? ""),
      email: String(data.get("email") ?? ""),
      eventDate: String(data.get("eventDate") ?? ""),
      guests: String(data.get("guests") ?? ""),
      message: String(data.get("message") ?? ""),
    };

    setPending(true);
    setErrors({});
    setMessage(null);

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as {
        ok: boolean;
        errors?: FieldErrors;
        message?: string;
        reference?: string;
      };
      if (!result.ok) {
        setErrors(result.errors ?? {});
        setMessage(result.message ?? "Please check the form and try again.");
        return;
      }
      setReference(result.reference ?? "received");
      form.reset();
    } catch {
      setMessage("We could not reach the server. Please WhatsApp the bar on " + BUSINESS.phone + ".");
    } finally {
      setPending(false);
    }
  }

  if (reference) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        role="status"
        aria-live="polite"
        className={`border p-7 sm:p-9 ${
          ivory ? "border-[var(--line-dark)] bg-[#fffaf2] text-ink" : "border-[var(--line)] bg-[#15100d]"
        }`}
      >
        <span className="eyebrow">Enquiry received</span>
        <h2 className={`display display-md mt-4 ${ivory ? "text-ink" : "text-ivory"}`}>
          We&apos;ll be in touch.
        </h2>
        <p className={`mt-3 text-[0.92rem] leading-relaxed ${ivory ? "text-[#56514a]" : "text-ivory/65"}`}>
          Your enquiry is with the KOPRA team. Nothing is booked yet — someone will call or email you to plan the
          details.
        </p>
        <p className="mt-5 font-mono text-[0.78rem] text-brass-soft">
          {ivory ? <span className="text-scarlet-deep">Reference: {reference}</span> : `Reference: ${reference}`}
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a href={`tel:${BUSINESS.phoneRaw}`} className={`btn btn-sm ${ivory ? "btn-dark" : "btn-primary"}`}>
            Call the bar
          </a>
          <button
            type="button"
            onClick={() => setReference(null)}
            className={`btn btn-sm btn-ghost ${ivory ? "!border-[var(--line-dark)] !text-ink" : ""}`}
          >
            Send another enquiry
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={`border p-7 sm:p-9 ${
        ivory ? "border-[var(--line-dark)] bg-[#fffaf2]" : "border-[var(--line)] bg-[#15100d]"
      }`}
    >
      <h2 className={`display display-sm ${ivory ? "text-ink" : "text-ivory"}`}>{heading}</h2>
      <p className={`mt-2 text-[0.82rem] ${ivory ? "text-[#7d7365]" : "text-muted"}`}>
        Every enquiry is read by the KOPRA team. Expect a reply within one working day.
      </p>

      <div className="form-grid mt-7">
        <div className="field span-2">
          <label htmlFor="enq-type">What is the occasion?</label>
          <select id="enq-type" name="type" className="select" defaultValue={defaultType} required>
            {TYPE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="enq-name">Name</label>
          <input id="enq-name" name="name" className="input" autoComplete="name" placeholder="Your name" required />
          {errors.name ? <p className="field-error">{errors.name}</p> : null}
        </div>

        <div className="field">
          <label htmlFor="enq-phone">Phone</label>
          <input
            id="enq-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            className="input"
            autoComplete="tel"
            placeholder="+91 98470 00000"
            required
          />
          {errors.phone ? <p className="field-error">{errors.phone}</p> : null}
        </div>

        <div className="field">
          <label htmlFor="enq-email">Email</label>
          <input
            id="enq-email"
            name="email"
            type="email"
            className="input"
            autoComplete="email"
            placeholder="you@example.com"
            required
          />
          {errors.email ? <p className="field-error">{errors.email}</p> : null}
        </div>

        <div className="field">
          <label htmlFor="enq-date">Preferred date</label>
          <input id="enq-date" name="eventDate" type="date" className="input" min={todayISO()} />
          {errors.eventDate ? <p className="field-error">{errors.eventDate}</p> : null}
        </div>

        <div className="field">
          <label htmlFor="enq-guests">Headcount</label>
          <input
            id="enq-guests"
            name="guests"
            type="number"
            min={1}
            max={300}
            className="input"
            placeholder="e.g. 18"
          />
          {errors.guests ? <p className="field-error">{errors.guests}</p> : null}
        </div>

        {!compact ? (
          <div className="field span-2">
            <label htmlFor="enq-message">Tell us more</label>
            <textarea
              id="enq-message"
              name="message"
              className="textarea"
              placeholder="Occasion, time of day, any dietary needs or ideas you have in mind…"
              rows={5}
              required
            />
            {errors.message ? <p className="field-error">{errors.message}</p> : null}
          </div>
        ) : (
          <div className="field span-2">
            <label htmlFor="enq-message">Message</label>
            <textarea id="enq-message" name="message" className="textarea" rows={4} required />
            {errors.message ? <p className="field-error">{errors.message}</p> : null}
          </div>
        )}
      </div>

      {message ? (
        <p role="alert" className="mt-5 border border-[var(--scarlet)]/40 bg-[var(--scarlet)]/10 px-4 py-3 text-[0.85rem] text-[#f2b6a8]">
          {message}
        </p>
      ) : null}

      <div className="mt-7 flex flex-col gap-4 border-t border-[var(--line-dark)]/40 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className={`max-w-xs text-[0.72rem] leading-relaxed ${ivory ? "text-[#877f72]" : "text-ivory/45"}`}>
          We only use these details to respond to your enquiry.
        </p>
        <button type="submit" className={`btn ${ivory ? "btn-dark" : "btn-primary"} shrink-0`} disabled={pending}>
          {pending ? "Sending…" : "Send enquiry"}
        </button>
      </div>
    </form>
  );
}
