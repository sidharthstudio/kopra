import { BUSINESS } from "./business";

export type FieldErrors = Record<string, string>;

const PHONE_RE = /^(?:\+?91)?[6-9]\d{9}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

export function normalisePhone(value: string) {
  return value.replace(/[\s()-]/g, "");
}

export function todayISO() {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  return new Date(now.getTime() - offset * 60_000).toISOString().slice(0, 10);
}

export function addDaysISO(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  const offset = date.getTimezoneOffset();
  return new Date(date.getTime() - offset * 60_000).toISOString().slice(0, 10);
}

function cleanText(value: unknown, max: number) {
  return String(value ?? "").replace(/\s+/g, " ").trim().slice(0, max);
}

export type ReservationInput = {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  requests: string | null;
};

export function validateReservation(payload: Record<string, unknown>): {
  errors: FieldErrors;
  value: ReservationInput;
} {
  const errors: FieldErrors = {};
  const name = cleanText(payload.name, 80);
  const phone = normalisePhone(String(payload.phone ?? ""));
  const email = String(payload.email ?? "").trim().toLowerCase();
  const date = String(payload.date ?? "").trim();
  const time = String(payload.time ?? "").trim();
  const guests = Number(payload.guests);
  const requests = String(payload.requests ?? "").trim().slice(0, 500);

  if (name.length < 2) errors.name = "Please tell us your name.";
  if (!PHONE_RE.test(phone)) errors.phone = "Enter a valid Indian mobile number.";
  if (!EMAIL_RE.test(email)) errors.email = "Enter a valid email address.";

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    errors.date = "Choose a date for your visit.";
  } else if (date < todayISO()) {
    errors.date = "Please choose today or a future date.";
  } else if (date > addDaysISO(120)) {
    errors.date = "Please book within the next 120 days.";
  }

  // KOPRA serves 7:00 AM – 11:00 PM; last seating is 30 minutes before close.
  if (!/^\d{2}:\d{2}$/.test(time)) {
    errors.time = "Choose a time for your table.";
  } else if (time < BUSINESS.hours.open || time > "22:30") {
    errors.time = "KOPRA seats guests between 7:00 AM and 10:30 PM.";
  }

  if (!Number.isInteger(guests) || guests < 1 || guests > 20) {
    errors.guests = "For 1–20 guests. Larger groups — use Private Events.";
  }

  return { errors, value: { name, phone, email, date, time, guests, requests: requests || null } };
}

export type EnquiryInput = {
  type: "private-event" | "workshop" | "general" | "event";
  name: string;
  phone: string;
  email: string;
  eventDate: string | null;
  guests: number | null;
  message: string;
};

const ENQUIRY_TYPES = new Set(["private-event", "workshop", "general", "event"]);

export function validateEnquiry(payload: Record<string, unknown>): {
  errors: FieldErrors;
  value: EnquiryInput;
} {
  const errors: FieldErrors = {};
  const type = String(payload.type ?? "general");
  const name = cleanText(payload.name, 80);
  const phone = normalisePhone(String(payload.phone ?? ""));
  const email = String(payload.email ?? "").trim().toLowerCase();
  const eventDate = String(payload.eventDate ?? "").trim();
  const guestsRaw = String(payload.guests ?? "").trim();
  const guests = guestsRaw ? Number(guestsRaw) : null;
  const message = String(payload.message ?? "").trim().slice(0, 1500);

  if (!ENQUIRY_TYPES.has(type)) errors.type = "Choose an enquiry type.";
  if (name.length < 2) errors.name = "Please tell us your name.";
  if (!PHONE_RE.test(phone)) errors.phone = "Enter a valid Indian mobile number.";
  if (!EMAIL_RE.test(email)) errors.email = "Enter a valid email address.";
  if (message.length < 10) errors.message = "A little more detail helps us plan — at least 10 characters.";

  if (eventDate) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(eventDate)) errors.eventDate = "Use a valid date.";
    else if (eventDate < todayISO()) errors.eventDate = "Choose today or a future date.";
  }

  if (guests !== null && (!Number.isInteger(guests) || guests < 1 || guests > 300)) {
    errors.guests = "Enter a headcount between 1 and 300.";
  }

  return {
    errors,
    value: {
      type: type as EnquiryInput["type"],
      name,
      phone,
      email,
      eventDate: eventDate || null,
      guests,
      message,
    },
  };
}

/* --------------------------- rate limiting --------------------------- */

const buckets = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(key: string, limit = 5, windowMs = 10 * 60_000) {
  const now = Date.now();
  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1 };
  }
  if (bucket.count >= limit) {
    return { allowed: false, remaining: 0 };
  }
  bucket.count += 1;
  return { allowed: true, remaining: limit - bucket.count };
}
