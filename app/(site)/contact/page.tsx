import Link from "next/link";
import type { Metadata } from "next";
import PageHero from "@/components/site/PageHero";
import EnquiryForm from "@/components/forms/EnquiryForm";
import Reveal from "@/components/site/Reveal";
import { BUSINESS, WHATSAPP_URL } from "@/lib/business";
import { formatTime } from "@/lib/format";

export const metadata: Metadata = {
  title: "Contact & Location — Nanthancodu, Thiruvananthapuram",
  description:
    "Visit KOPRA at 3rd Floor, Capitol Building, Nalanda Lane, Nanthancodu, Thiruvananthapuram 695003. Call +91 96336 67600, WhatsApp us, or get directions. Open daily 7 AM – 11 PM.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        index="08 / 09"
        eyebrow="Contact & location"
        title={
          <>
            Third floor, <span className="serif-italic">Capitol Building.</span>
          </>
        }
        copy="Nanthancodu, Thiruvananthapuram. Open every day from 7 in the morning until 11 at night — for coffee, for cocktails, or for both."
        meta={[
          { label: "Open daily", value: "7 AM – 11 PM" },
          { label: "Phone", value: BUSINESS.phone },
          { label: "Parking", value: "Call ahead" },
          { label: "Google", value: `${BUSINESS.rating.value} ★` },
        ]}
      >
        <a href={BUSINESS.directionsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
          Get directions
        </a>
        <a href={`tel:${BUSINESS.phoneRaw}`} className="btn btn-ghost">
          Call {BUSINESS.phone}
        </a>
      </PageHero>

      <section className="on-ivory bg-sun section">
        <div className="container-x">
          <div className="grid gap-px overflow-hidden border border-[var(--line-dark)] bg-[var(--line-dark)] sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                label: "Address",
                value: (
                  <>
                    {BUSINESS.address.line1}
                    <br />
                    {BUSINESS.address.line2}
                    <br />
                    {BUSINESS.address.city}, {BUSINESS.address.state}
                    <br />
                    {BUSINESS.address.postalCode}
                  </>
                ),
                href: BUSINESS.directionsUrl,
                external: true,
                cta: "Open in Maps",
              },
              {
                label: "Phone",
                value: (
                  <>
                    {BUSINESS.phone}
                    <br />
                    <span className="text-[0.78rem] text-[#877f72]">Call or WhatsApp</span>
                  </>
                ),
                href: `tel:${BUSINESS.phoneRaw}`,
                external: false,
                cta: "Click to call",
              },
              {
                label: "Instagram",
                value: (
                  <>
                    {BUSINESS.instagramHandle}
                    <br />
                    <span className="text-[0.78rem] text-[#877f72]">Menu drops & workshop dates</span>
                  </>
                ),
                href: BUSINESS.instagramUrl,
                external: true,
                cta: "Follow KOPRA",
              },
              {
                label: "Email",
                value: (
                  <>
                    Not published
                    <br />
                    <span className="text-[0.78rem] text-[#877f72]">Use the form or WhatsApp</span>
                  </>
                ),
                href: "#message",
                external: false,
                cta: "Send a message",
              },
            ].map((card, index) => (
              <Reveal key={card.label} delay={index * 0.06}>
                <div className="flex h-full flex-col justify-between bg-[#fffaf2] p-7">
                  <div>
                    <p className="text-[0.6rem] uppercase tracking-[0.22em] text-scarlet-deep">{card.label}</p>
                    <p className="mt-3 text-[0.92rem] leading-relaxed text-[#3f352c]">{card.value}</p>
                  </div>
                  <a
                    href={card.href}
                    {...(card.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="link-underline mt-6 self-start"
                  >
                    {card.cta}
                  </a>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-14 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
            <Reveal>
              <div className="relative h-[380px] overflow-hidden border border-[var(--line-dark)] sm:h-[480px]">
                <iframe
                  title="Google map showing KOPRA at Capitol Building, Nanthancodu, Thiruvananthapuram"
                  src={BUSINESS.mapsEmbedUrl}
                  className="h-full w-full grayscale-[25%]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <p className="text-[0.74rem] text-[#877f72]">
                  {BUSINESS.geo.lat.toFixed(5)}, {BUSINESS.geo.lng.toFixed(5)} · Nanthancodu
                </p>
                <a
                  href={BUSINESS.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline"
                >
                  View on Google Maps
                </a>
              </div>
            </Reveal>

            <div className="space-y-6">
              <Reveal delay={0.08}>
                <div className="border border-[var(--line-dark)] bg-[#fffaf2] p-7">
                  <p className="text-[0.6rem] uppercase tracking-[0.22em] text-scarlet-deep">
                    Opening hours
                  </p>
                  <p className="mt-3 font-display text-2xl text-ink">
                    {formatTime(BUSINESS.hours.open)} – {formatTime(BUSINESS.hours.close)}
                  </p>
                  <dl className="mt-4 space-y-2 border-t border-[var(--line-dark)] pt-4 text-[0.84rem]">
                    {BUSINESS.hours.days.map((day) => (
                      <div key={day.day} className="flex justify-between gap-4">
                        <dt className="text-[#7d7365]">{day.day}</dt>
                        <dd className="text-ink">{day.hours}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>

              <Reveal delay={0.14}>
                <div className="border border-[var(--line-dark)] bg-[#fffaf2] p-7">
                  <p className="text-[0.6rem] uppercase tracking-[0.22em] text-scarlet-deep">
                    Getting there
                  </p>
                  <p className="mt-3 text-[0.88rem] leading-relaxed text-[#56514a]">
                    Capitol Building sits on Nalanda Lane in Nanthancodu, a few minutes from the Kowdiar–Vellayambalam
                    stretch. Take the lift to the third floor. Parking arrangements have not been published — call{" "}
                    <a href={`tel:${BUSINESS.phoneRaw}`} className="text-scarlet-deep underline decoration-dotted">
                      {BUSINESS.phone}
                    </a>{" "}
                    and the team will point you right.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-dark btn-sm"
                    >
                      WhatsApp the bar
                    </a>
                    <Link href="/reservations" className="btn btn-sm btn-ghost !border-[var(--line-dark)] !text-ink hover:!bg-[var(--ink)]/5">
                      Reserve a table
                    </Link>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section id="message" className="section scroll-mt-24 bg-[var(--ink)]">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div>
              <Reveal>
                <span className="eyebrow">Write to us</span>
              </Reveal>
              <Reveal variant="mask" delay={0.06}>
                <h2 className="display display-lg mt-5 text-ivory">
                  Questions, allergies, <span className="serif-italic">big ideas.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="lede mt-6">
                  Tell the team what you need. For bookings, WhatsApp is usually fastest — but this form reaches the
                  same people.
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <div className="mt-8 space-y-3 text-[0.88rem] text-ivory/60">
                  <p>
                    <span className="block text-[0.6rem] uppercase tracking-[0.2em] text-brass">Phone</span>
                    <a href={`tel:${BUSINESS.phoneRaw}`} className="mt-1 block hover:text-ivory">
                      {BUSINESS.phone}
                    </a>
                  </p>
                  <p>
                    <span className="block text-[0.6rem] uppercase tracking-[0.2em] text-brass">WhatsApp</span>
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 block hover:text-ivory"
                    >
                      Message the bar
                    </a>
                  </p>
                  <p>
                    <span className="block text-[0.6rem] uppercase tracking-[0.2em] text-brass">Instagram</span>
                    <a
                      href={BUSINESS.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 block hover:text-ivory"
                    >
                      {BUSINESS.instagramHandle}
                    </a>
                  </p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.12}>
              <EnquiryForm defaultType="general" heading="Send a message" />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
