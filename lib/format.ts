export function formatTime(value: string) {
  const [hours, minutes] = value.split(":").map(Number);
  if (Number.isNaN(hours)) return value;
  const suffix = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;
  return `${hour12}:${String(minutes ?? 0).padStart(2, "0")} ${suffix}`;
}

export function formatDate(value: string | null) {
  if (!value) return "Date to be announced";
  const date = new Date(`${value.slice(0, 10)}T12:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export function formatDateTime(value: string) {
  if (!value) return "";
  const normalised = value.includes("T") ? value : value.replace(" ", "T") + "Z";
  const date = new Date(normalised);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function inr(value: number | null) {
  if (value === null || value === undefined) return "Price on request";
  return `₹${value.toLocaleString("en-IN")}`;
}

export function classNames(...values: (string | false | null | undefined)[]) {
  return values.filter(Boolean).join(" ");
}
