import Link from "next/link";
import type { Metadata } from "next";
import PageHero from "@/components/site/PageHero";
import EnquiryForm from "@/components/forms/EnquiryForm";
import Reveal from "@/components/site/Reveal";
import SectionHeading from "@/components/site/SectionHeading";
import { BUSINESS, WHATSAPP_URL } from "@/lib/business";
import { PRIVATE_EVENT_TYPES } from "@/lib/content";

export const metadata: Metadata = {
  title: "Private Events — Parties, Tastings & Workshops",
  description:
    "Host a private party, celebration, team gathering or cocktail workshop at KOPRA in Nanthancodu, Thiruvananthapuram. Send your date and headcount for a bespoke bar programme.",
  alternates: { canonical: "/private-events" },
};

export default function PrivateEventsPage() {
  return (
    <>
      <PageHero
        index="07 / 09"
        eyebrow="Private events"
        title={
          <>
            Your occasion. <span className="serif-italic">Our bar.</span>
          </>
        }
        copy="Birthdays, celebrations, team gatherings, tastings and workshops — KOPRA hosts private groups on the third floor with a drinks programme built for the room."
        meta={[
          { label: "Enquiries", value: "1 working day" },
          { label: "Workshop", value: `₹${BUSINESS.workshop.priceInr} pp` },
          { label: "Capacity", value: "Confirmed per date" },
          { label: "Location", value: "Nanthancodu" },
        ]}
      >
        <Link href="#enquire" className="btn btn-primary">
          Send an enquiry
        </Link>
        <a href={`tel:${BUSINESS.phoneRaw}`} className="btn btn-ghost">
          Call the team
        </a>
      </PageHero>

      <section className="section bg-[var(--ink)]">
        <div className="container-x">
          <SectionHeading
            eyebrow="Occasions"
            title={
              <>
                Small rooms make <span className="serif-italic">better nights.</span>
              </>
            }
            copy="KOPRA does not publish rigid party packages. Tell the team what you have in mind and they will come back with a menu, a capacity and a price for your date."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PRIVATE_EVENT_TYPES.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06}>
                <div className="group h-full border border-[var(--line)] bg-[#15100d] p-7 transition-colors duration-500 hover:border-[var(--brass)]/40">
                  <span className="font-mono text-[0.6rem] tracking-[0.24em] text-scarlet">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="display display-sm mt-4 text-ivory">{item.title}</h3>
                  <p className="mt-3 text-[0.9rem] leading-relaxed text-ivory/60">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="enquire" className="on-ivory bg-sun section scroll-mt-24">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
            <div>
              <Reveal>
                <EnquiryForm defaultType="private-event" tone="ivory" heading="Tell us about your occasion" />
              </Reveal>
            </div>

            <aside className="space-y-6">
              <Reveal delay={0.1}>
                <div className="border border-[var(--line-dark)] bg-[#fffaf2] p-7">
                  <p className="text-[0.6rem] uppercase tracking-[0.22em] text-scarlet-deep">
                    What to include
                  </p>
                  <ul className="mt-4 space-y-3 text-[0.86rem] leading-relaxed text-[#56514a]">
                    {[
                      "Your preferred date, or a date range",
                      "Rough headcount — adults and children",
                      "The occasion and the mood you want",
                      "Any dietary needs or non-negotiables",
                      "Whether you want the room exclusively",
                    ].map((item) => (
                      <li key={item} className="flex gap-3">
                        <span aria-hidden="true" className="mt-1 text-scarlet">
                          ✦
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={0.16}>
                <div className="border border-[var(--line-dark)] bg-[#fffaf2] p-7">
                  <p className="text-[0.6rem] uppercase tracking-[0.22em] text-scarlet-deep">
                    Booking the workshop
                  </p>
                  <p className="mt-3 font-display text-3xl text-ink">₹{BUSINESS.workshop.priceInr}</p>
                  <p className="mt-1 text-[0.8rem] text-[#877f72]">{BUSINESS.workshop.note}</p>
                  <p className="mt-4 text-[0.86rem] leading-relaxed text-[#56514a]">
                    For a private workshop, choose &ldquo;Cocktail workshop&rdquo; in the form and add your headcount.
                    Sessions are hosted by the KOPRA bar team.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.22}>
                <div className="border border-[var(--line-dark)] bg-[#fffaf2] p-7">
                  <p className="text-[0.6rem] uppercase tracking-[0.22em] text-scarlet-deep">
                    Prefer to talk it through?
                  </p>
                  <a
                    href={`tel:${BUSINESS.phoneRaw}`}
                    className="mt-3 block font-display text-2xl text-ink transition-colors hover:text-scarlet-deep"
                  >
                    {BUSINESS.phone}
                  </a>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-dark btn-sm mt-4">
                    WhatsApp the team
                  </a>
                  <p className="mt-5 border-t border-[var(--line-dark)] pt-4 text-[0.78rem] leading-relaxed text-[#877f72]">
                    Capacity, minimum spend and exclusivity are confirmed for your specific date — they are not fixed
                    on this page because they are not fixed by KOPRA.
                  </p>
                </div>
              </Reveal>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
