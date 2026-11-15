import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import PageHero from "@/components/site/PageHero";
import EventCard from "@/components/events/EventCard";
import Reveal from "@/components/site/Reveal";
import SectionHeading from "@/components/site/SectionHeading";
import Marquee from "@/components/site/Marquee";
import { BUSINESS, WHATSAPP_EVENT_URL } from "@/lib/business";
import { getEvents } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Events & Experiences — Cocktail Workshops in Trivandrum",
  description:
    "KOPRA's cocktail workshops (₹699 per person, no experience needed), guided tastings, and private hire in Nanthancodu, Thiruvananthapuram. Send an enquiry for the next date.",
  alternates: { canonical: "/events" },
};

export default function EventsPage() {
  const events = getEvents();
  const workshop = events.find((event) => event.slug === "cocktail-workshop");

  return (
    <>
      <PageHero
        index="05 / 09"
        eyebrow="Events & experiences"
        title={
          <>
            Learn the craft. <span className="serif-italic">Then drink it.</span>
          </>
        }
        copy="Workshops, guided tastings and private gatherings at the bar. Dates are released on Instagram — send an enquiry and the team will hold a place for you."
        meta={[
          { label: "Workshop", value: `₹${BUSINESS.workshop.priceInr}` },
          { label: "Experience", value: "None needed" },
          { label: "Group tastings", value: "4+ guests" },
          { label: "Private hire", value: "On request" },
        ]}
      />

      <section className="section bg-[var(--ink)]">
        <div className="container-x">
          <SectionHeading
            eyebrow="What's on"
            title={
              <>
                Three ways to spend <span className="serif-italic">an evening here.</span>
              </>
            }
            copy="KOPRA does not publish a fixed events calendar. Every experience below is booked by enquiry, so you get the date, the group size and the menu that actually works for you."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {events.map((event, index) => (
              <Reveal key={event.id} delay={index * 0.08}>
                <EventCard event={event} index={index} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {workshop ? (
        <section className="on-ivory bg-sun section">
          <div className="container-x">
            <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
              <Reveal>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={workshop.imageUrl ?? ""}
                    alt="A cocktail workshop in progress behind the bar"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <span className="absolute left-4 top-4 rounded-none bg-[var(--scarlet)] px-4 py-1.5 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-ivory">
                    ₹{workshop.priceInr} per person
                  </span>
                </div>
              </Reveal>

              <div>
                <Reveal>
                  <span className="eyebrow">The workshop</span>
                </Reveal>
                <Reveal variant="mask" delay={0.06}>
                  <h2 className="display display-lg mt-5 text-ink">
                    Make a cocktail that <span className="serif-italic text-scarlet-deep">never needed a spirit.</span>
                  </h2>
                </Reveal>
                <Reveal delay={0.12}>
                  <p className="mt-6 text-[1rem] leading-relaxed text-[#56514a]">
                    A hands-on session with the KOPRA bar team: how kombucha and kefir are cultured, how a drink is
                    clarified and carbonated, and how flavour is balanced without alcohol. You build your own pour
                    before the session ends.
                  </p>
                </Reveal>
                <Reveal delay={0.16}>
                  <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                    {[
                      "₹699 per person",
                      "No experience needed",
                      "All ingredients included",
                      "Small-group sessions",
                      "Behind the KOPRA bar",
                      "Private sessions available",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-[0.86rem] text-[#56514a]">
                        <span aria-hidden="true" className="mt-0.5 text-scarlet">
                          ✦
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>
                <Reveal delay={0.22}>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link href="/private-events?type=workshop" className="btn btn-dark">
                      Enquire about the next date
                    </Link>
                    <a
                      href={WHATSAPP_EVENT_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-ghost !border-[var(--line-dark)] !text-ink hover:!bg-[var(--ink)]/5"
                    >
                      WhatsApp
                    </a>
                  </div>
                </Reveal>
                <Reveal delay={0.26}>
                  <p className="mt-5 text-[0.74rem] leading-relaxed text-[#877f72]">
                    Workshop dates are announced on Instagram{" "}
                    <a
                      href={BUSINESS.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-scarlet-deep underline decoration-dotted"
                    >
                      {BUSINESS.instagramHandle}
                    </a>
                    . The price above is KOPRA&apos;s published workshop price; what is included beyond the session is
                    confirmed when you book.
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <Marquee
        tone="ivory"
        items={["Workshops", "Guided tastings", "Private hire", "Zero-alcohol mixology", "Kerala flavours"]}
      />

      <section className="section bg-[#0b0b0a]">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <Reveal>
                <span className="eyebrow">Private hire</span>
              </Reveal>
              <Reveal variant="mask" delay={0.06}>
                <h2 className="display display-lg mt-5 text-ivory">
                  Take the room <span className="serif-italic">for the evening.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="lede mt-6">
                  Birthdays, engagements, team offsites, launches, tastings. KOPRA will build the drinks list around
                  your group and the occasion — and nobody has to be the person nursing a soda.
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/private-events" className="btn btn-primary">
                    Start a private event enquiry
                  </Link>
                  <Link href="/contact" className="btn btn-ghost">
                    Find us
                  </Link>
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.14}>
              <div className="border border-[var(--line)] bg-[#15100d] p-7">
                <p className="text-[0.6rem] uppercase tracking-[0.22em] text-brass">How enquiries work</p>
                <ol className="mt-5 space-y-5">
                  {[
                    "Send the date, headcount and occasion through the private events form.",
                    "The team confirms availability, capacity and the menu options with you.",
                    "You get a written summary before anything is committed.",
                  ].map((step, index) => (
                    <li key={step} className="flex gap-4">
                      <span className="mt-0.5 font-mono text-[0.66rem] tracking-[0.2em] text-scarlet">
                        0{index + 1}
                      </span>
                      <p className="text-[0.9rem] leading-relaxed text-ivory/65">{step}</p>
                    </li>
                  ))}
                </ol>
                <p className="mt-6 border-t border-[var(--line)] pt-5 text-[0.78rem] leading-relaxed text-ivory/40">
                  Capacity and minimum spend are not published — the team will confirm both for your date.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
