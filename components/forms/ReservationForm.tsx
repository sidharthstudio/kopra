"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { BUSINESS, WHATSAPP_URL } from "@/lib/business";
import { RESERVATION_TIMES } from "@/lib/content";
import { formatDate, formatTime } from "@/lib/format";
import { addDaysISO, todayISO, type FieldErrors } from "@/lib/validation";

type Success = { reference: string; name: string; date: string; time: string; guests: number };

export default function ReservationForm() {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [message, setMessage] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState<Success | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      phone: String(data.get("phone") ?? ""),
      email: String(data.get("email") ?? ""),
      date: String(data.get("date") ?? ""),
      time: String(data.get("time") ?? ""),
      guests: Number(data.get("guests") ?? 0),
      requests: String(data.get("requests") ?? ""),
    };

    setPending(true);
    setErrors({});
    setMessage(null);

    try {
      const response = await fetch("/api/reservations", {
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

      setSuccess({
        reference: result.reference ?? "",
        name: payload.name,
        date: payload.date,
        time: payload.time,
        guests: payload.guests,
      });
      form.reset();
    } catch {
      setMessage("We could not reach the server. Please call the bar on " + BUSINESS.phone + ".");
    } finally {
      setPending(false);
    }
  }

  if (success) {
    const shareText = encodeURIComponent(
      `Hello KOPRA, I've sent a table request (${success.reference}) for ${success.guests} on ${formatDate(
        success.date,
      )} at ${formatTime(success.time)}. Could you confirm?`,
    );

    return (
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="border border-[var(--line)] bg-[#15100d] p-7 sm:p-9"
        role="status"
        aria-live="polite"
      >
        <span className="eyebrow">Request received</span>
        <h2 className="display display-md mt-4 text-ivory">
          Thank you, {success.name.split(" ")[0]}.
        </h2>
        <p className="mt-3 text-[0.92rem] leading-relaxed text-ivory/65">
          Your table request is with the KOPRA team. This is <strong className="text-ivory">not a confirmed
          booking yet</strong> — the team will call or WhatsApp you to confirm the table.
        </p>

        <dl className="mt-7 divide-y divide-[var(--line)] border-y border-[var(--line)] text-sm">
          <div className="flex items-center justify-between py-3">
            <dt className="text-[0.62rem] uppercase tracking-[0.2em] text-muted">Reference</dt>
            <dd className="font-mono text-[0.78rem] text-brass-soft">{success.reference}</dd>
          </div>
          <div className="flex items-center justify-between py-3">
            <dt className="text-[0.62rem] uppercase tracking-[0.2em] text-muted">Date</dt>
            <dd className="text-ivory">{formatDate(success.date)}</dd>
          </div>
          <div className="flex items-center justify-between py-3">
            <dt className="text-[0.62rem] uppercase tracking-[0.2em] text-muted">Time</dt>
            <dd className="text-ivory">{formatTime(success.time)}</dd>
          </div>
          <div className="flex items-center justify-between py-3">
            <dt className="text-[0.62rem] uppercase tracking-[0.2em] text-muted">Guests</dt>
            <dd className="text-ivory">{success.guests}</dd>
          </div>
          <div className="flex items-center justify-between py-3">
            <dt className="text-[0.62rem] uppercase tracking-[0.2em] text-muted">Status</dt>
            <dd>
              <span className="status-pill status-pending">Pending confirmation</span>
            </dd>
          </div>
        </dl>

        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href={`https://wa.me/${BUSINESS.whatsapp}?text=${shareText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm"
          >
            Send details on WhatsApp
          </a>
          <a href={`tel:${BUSINESS.phoneRaw}`} className="btn btn-ghost btn-sm">
            Call the bar
          </a>
          <button type="button" onClick={() => setSuccess(null)} className="btn btn-ghost btn-sm">
            Make another request
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="border border-[var(--line)] bg-[#15100d] p-7 sm:p-9">
      <div className="form-grid">
        <div className="field span-2">
          <label htmlFor="res-name">Your name</label>
          <input
            id="res-name"
            name="name"
            className="input"
            autoComplete="name"
            placeholder="Aditi Nair"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "res-name-error" : undefined}
            required
          />
          {errors.name ? <p id="res-name-error" className="field-error">{errors.name}</p> : null}
        </div>

        <div className="field">
          <label htmlFor="res-phone">Phone number</label>
          <input
            id="res-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            className="input"
            autoComplete="tel"
            placeholder="+91 98470 00000"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "res-phone-error" : undefined}
            required
          />
          {errors.phone ? <p id="res-phone-error" className="field-error">{errors.phone}</p> : null}
        </div>

        <div className="field">
          <label htmlFor="res-email">Email</label>
          <input
            id="res-email"
            name="email"
            type="email"
            className="input"
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "res-email-error" : undefined}
            required
          />
          {errors.email ? <p id="res-email-error" className="field-error">{errors.email}</p> : null}
        </div>

        <div className="field">
          <label htmlFor="res-date">Preferred date</label>
          <input
            id="res-date"
            name="date"
            type="date"
            className="input"
            min={todayISO()}
            max={addDaysISO(120)}
            defaultValue={todayISO()}
            aria-invalid={Boolean(errors.date)}
            aria-describedby={errors.date ? "res-date-error" : undefined}
            required
          />
          {errors.date ? <p id="res-date-error" className="field-error">{errors.date}</p> : null}
        </div>

        <div className="field">
          <label htmlFor="res-time">Preferred time</label>
          <select
            id="res-time"
            name="time"
            className="select"
            defaultValue="19:00"
            aria-invalid={Boolean(errors.time)}
            aria-describedby={errors.time ? "res-time-error" : undefined}
            required
          >
            {RESERVATION_TIMES.map((time) => (
              <option key={time} value={time}>
                {formatTime(time)}
              </option>
            ))}
          </select>
          {errors.time ? <p id="res-time-error" className="field-error">{errors.time}</p> : null}
        </div>

        <div className="field">
          <label htmlFor="res-guests">Number of guests</label>
          <select id="res-guests" name="guests" className="select" defaultValue="2" required>
            {Array.from({ length: 20 }, (_, index) => index + 1).map((count) => (
              <option key={count} value={count}>
                {count} {count === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
          {errors.guests ? <p className="field-error">{errors.guests}</p> : null}
        </div>

        <div className="field">
          <label htmlFor="res-requests">Special requests</label>
          <textarea
            id="res-requests"
            name="requests"
            className="textarea"
            placeholder="A birthday, a corner table, an allergy the bar should know about…"
            rows={3}
          />
        </div>
      </div>

      {message ? (
        <p role="alert" className="mt-5 border border-[var(--scarlet)]/40 bg-[var(--scarlet)]/10 px-4 py-3 text-[0.85rem] text-[#f2b6a8]">
          {message}
        </p>
      ) : null}

      <div className="mt-7 flex flex-col gap-4 border-t border-[var(--line)] pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-[0.72rem] leading-relaxed text-ivory/45">
          By sending a request you agree to be contacted about this booking. We do not take card details or payments on
          this site. Requests for more than 20 guests go through{" "}
          <Link href="/private-events" className="text-brass-soft underline decoration-dotted">
            private events
          </Link>
          .
        </p>
        <button type="submit" className="btn btn-primary shrink-0" disabled={pending}>
          {pending ? "Sending…" : "Send table request"}
        </button>
      </div>

      <p className="mt-4 text-[0.72rem] text-ivory/35">
        Prefer to talk?{" "}
        <a href={`tel:${BUSINESS.phoneRaw}`} className="text-brass-soft">
          {BUSINESS.phone}
        </a>{" "}
        or{" "}
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-brass-soft">
          WhatsApp
        </a>
        .
      </p>
    </form>
  );
}
