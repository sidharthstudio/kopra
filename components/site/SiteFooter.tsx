import Link from "next/link";
import { BUSINESS, WHATSAPP_URL } from "@/lib/business";
import { getEvents } from "@/lib/db";

const explore = [
  { href: "/menu", label: "Digital menu" },
  { href: "/about", label: "Our story" },
  { href: "/events", label: "Events & experiences" },
  { href: "/gallery", label: "Gallery" },
  { href: "/private-events", label: "Private events" },
  { href: "/reservations", label: "Reservations" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact & location" },
];

export default function SiteFooter() {
  const events = getEvents().slice(0, 2);

  return (
    <footer className="relative overflow-hidden border-t border-[var(--line)] bg-[#090908]">
      <div className="container-x pt-16 pb-10 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.7fr_0.7fr_0.9fr]">
          <div>
            <p className="display display-md max-w-sm text-ivory">
              A full bar experience.
              <br />
              <span className="serif-italic">Zero alcohol.</span>
            </p>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">
              India&apos;s first non-alcoholic cocktail bar, on the third floor in Nanthancodu. Ferments, fresh produce and
              Kerala flavours, built into every glass.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              <a
                href={BUSINESS.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-[var(--line)] px-4 py-2 font-mono text-[0.64rem] font-medium uppercase tracking-[0.12em] text-ivory/80 transition-colors hover:border-[var(--brass)] hover:bg-[var(--brass)] hover:text-ink"
              >
                Instagram
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-[var(--line)] px-4 py-2 font-mono text-[0.64rem] font-medium uppercase tracking-[0.12em] text-ivory/80 transition-colors hover:border-[var(--brass)] hover:bg-[var(--brass)] hover:text-ink"
              >
                WhatsApp
              </a>
              <a
                href={BUSINESS.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-[var(--line)] px-4 py-2 font-mono text-[0.64rem] font-medium uppercase tracking-[0.12em] text-ivory/80 transition-colors hover:border-[var(--brass)] hover:bg-[var(--brass)] hover:text-ink"
              >
                Google Maps
              </a>
            </div>
          </div>

          <nav aria-label="Footer" className="text-sm">
            <h2 className="font-mono text-[0.6rem] font-medium uppercase tracking-[0.16em] text-brass">Explore</h2>
            <ul className="mt-5 space-y-2.5">
              {explore.slice(0, 5).map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-ivory/70 transition-colors hover:text-ivory">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="text-sm">
            <h2 className="font-mono text-[0.6rem] font-medium uppercase tracking-[0.16em] text-brass">Visit</h2>
            <ul className="mt-5 space-y-2.5 text-ivory/70">
              <li>
                <a href={BUSINESS.directionsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-ivory">
                  {BUSINESS.address.line1}
                  <br />
                  {BUSINESS.address.line2}
                  <br />
                  {BUSINESS.address.city} {BUSINESS.address.postalCode}
                </a>
              </li>
              <li>
                <a href={`tel:${BUSINESS.phoneRaw}`} className="hover:text-ivory">
                  {BUSINESS.phone}
                </a>
              </li>
              <li className="text-ivory/50">{BUSINESS.hours.display}</li>
            </ul>
          </div>

          <div className="text-sm">
            <h2 className="font-mono text-[0.6rem] font-medium uppercase tracking-[0.16em] text-brass">Coming up</h2>
            <ul className="mt-5 space-y-4">
              {events.map((event) => (
                <li key={event.id}>
                  <Link href={event.ctaHref || "/events"} className="group block">
                    <span className="block text-[0.6rem] uppercase tracking-[0.2em] text-muted">
                      {event.kind}
                    </span>
                    <span className="mt-1 block text-ivory/85 transition-colors group-hover:text-brass">
                      {event.title}
                    </span>
                    <span className="mt-1 block text-[0.72rem] text-muted">
                      {event.priceInr ? `₹${event.priceInr} per person` : "Enquire for dates"}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/events" className="link-underline mt-6 inline-flex">
              All experiences
            </Link>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-[var(--line)] pt-6 text-[0.7rem] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} KOPRA. All rights reserved.</p>
          <p className="text-ivory/40">
            Menu and pricing shown as published by KOPRA · Information last verified November 2026
          </p>
          <Link href="/admin" className="text-ivory/35 transition-colors hover:text-brass">
            Team login
          </Link>
        </div>
      </div>
    </footer>
  );
}
