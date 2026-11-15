import Link from "next/link";
import type { Metadata } from "next";
import PageHero from "@/components/site/PageHero";
import ReservationForm from "@/components/forms/ReservationForm";
import Reveal from "@/components/site/Reveal";
import { BUSINESS, WHATSAPP_URL } from "@/lib/business";
import { SEATING_NOTES } from "@/lib/content";

export const metadata: Metadata = {
  title: "Reserve a Table — KOPRA, Nanthancodu",
  description:
    "Send a table request to KOPRA, India's first non-alcoholic cocktail bar in Nanthancodu, Thiruvananthapuram. Open daily 7 AM – 11 PM. Requests are confirmed by the team by phone or WhatsApp.",
  alternates: { canonical: "/reservations" },
};

export default function ReservationsPage() {
  return (
    <>
      <PageHero
        index="04 / 09"
        eyebrow="Reservations"
        title={
          <>
            Save a seat. <span className="serif-italic">We&apos;ll build the drinks.</span>
          </>
        }
        copy="Send a table request and the KOPRA team will confirm it with you directly. Requests are answered by phone or WhatsApp — you will always hear back before you travel."
        meta={[
          { label: "Open", value: "7 AM – 11 PM" },
          { label: "Last seating", value: "10:30 PM" },
          { label: "Group size", value: "1–20 guests" },
          { label: "Larger groups", value: "Private events" },
        ]}
      />

      <section className="section bg-[var(--ink)]">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
            <div>
              <Reveal>
                <div className="mb-6 flex items-start gap-3 border border-[var(--brass)]/25 bg-[var(--brass)]/5 px-4 py-3">
                  <span aria-hidden="true" className="mt-0.5 text-brass">
                    ✦
                  </span>
                  <p className="text-[0.82rem] leading-relaxed text-ivory/70">
                    This sends a <strong className="text-ivory">request</strong>, not a confirmed booking.
                    KOPRA does not run an automated reservation system — a member of the team confirms every table
                    personally.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.06}>
                <ReservationForm />
              </Reveal>
            </div>

            <aside className="space-y-6">
              <Reveal delay={0.1}>
                <div className="border border-[var(--line)] bg-[#15100d] p-7">
                  <p className="text-[0.6rem] uppercase tracking-[0.22em] text-brass">Opening hours</p>
                  <p className="display display-sm mt-3 text-ivory">7 AM – 11 PM</p>
                  <p className="mt-1 text-[0.82rem] text-muted">Every day, including weekends.</p>
                  <dl className="mt-5 space-y-2 border-t border-[var(--line)] pt-5 text-[0.82rem]">
                    {BUSINESS.hours.days.map((day) => (
                      <div key={day.day} className="flex justify-between gap-4">
                        <dt className="text-ivory/55">{day.day}</dt>
                        <dd className="text-ivory/85">{day.hours}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>

              <Reveal delay={0.16}>
                <div className="border border-[var(--line)] bg-[#15100d] p-7">
                  <p className="text-[0.6rem] uppercase tracking-[0.22em] text-brass">Rather talk to us?</p>
                  <a
                    href={`tel:${BUSINESS.phoneRaw}`}
                    className="mt-3 block font-display text-2xl text-ivory transition-colors hover:text-brass"
                  >
                    {BUSINESS.phone}
                  </a>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-ghost btn-sm"
                    >
                      WhatsApp
                    </a>
                    <a
                      href={BUSINESS.directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-ghost btn-sm"
                    >
                      Directions
                    </a>
                  </div>
                  <address className="mt-5 border-t border-[var(--line)] pt-5 text-[0.82rem] not-italic leading-relaxed text-ivory/60">
                    {BUSINESS.address.line1}
                    <br />
                    {BUSINESS.address.line2}
                    <br />
                    {BUSINESS.address.city}, {BUSINESS.address.state} {BUSINESS.address.postalCode}
                  </address>
                </div>
              </Reveal>

              <Reveal delay={0.22}>
                <div className="border border-[var(--line)] bg-[#15100d] p-7">
                  <p className="text-[0.6rem] uppercase tracking-[0.22em] text-brass">Good to know</p>
                  <ul className="mt-4 space-y-3 text-[0.84rem] leading-relaxed text-ivory/60">
                    {SEATING_NOTES.map((note) => (
                      <li key={note} className="flex gap-3">
                        <span aria-hidden="true" className="mt-1 text-scarlet">
                          —
                        </span>
                        {note}
                      </li>
                    ))}
                  </ul>
                  <Link href="/private-events" className="link-underline mt-6 inline-flex">
                    Planning something bigger?
                  </Link>
                </div>
              </Reveal>
            </aside>
          </div>
        </div>
      </section>

      <section className="on-ivory bg-sun section-tight">
        <div className="container-narrow text-center">
          <Reveal>
            <h2 className="display display-md text-ink">
              Not sure what to order? <span className="serif-italic text-scarlet-deep">Ask the bar.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mx-auto mt-4 max-w-xl text-[0.94rem] leading-relaxed text-[#56514a]">
              Tell the team what you normally drink and they will build something in that direction — no alcohol
              required.
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <Link href="/menu" className="link-underline mt-7 inline-flex">
              Read the menu first
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
