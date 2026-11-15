import Link from "next/link";
import type { Metadata } from "next";
import PageHero from "@/components/site/PageHero";
import Reveal from "@/components/site/Reveal";
import { BUSINESS, WHATSAPP_URL } from "@/lib/business";
import { FAQS } from "@/lib/content";

export const metadata: Metadata = {
  title: "FAQ — Menu, Reservations, Hours & Location",
  description:
    "Answers about KOPRA: is everything alcohol-free, where the bar is, opening hours, reservations, prices, the ₹699 cocktail workshop, private events and delivery.",
  alternates: { canonical: "/faq" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.filter((faq) => !faq.pending).map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        index="09 / 09"
        eyebrow="FAQ"
        title={
          <>
            Ask us <span className="serif-italic">anything.</span>
          </>
        }
        copy="Everything guests usually want to know before their first visit. If your question is not here, call the bar — someone will pick up between 7 AM and 11 PM."
        meta={[
          { label: "Open daily", value: "7 AM – 11 PM" },
          { label: "Alcohol", value: "None served" },
          { label: "Workshop", value: "₹699 pp" },
          { label: "Location", value: "Nanthancodu" },
        ]}
      />

      <section className="on-ivory bg-sun section">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <span className="eyebrow">Good to know</span>
              </Reveal>
              <Reveal variant="mask" delay={0.06}>
                <h2 className="display display-md mt-5 text-ink">
                  The short answers, <span className="serif-italic text-scarlet-deep">in writing.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-5 text-[0.9rem] leading-relaxed text-[#56514a]">
                  We only answer what KOPRA has confirmed. Anything the business has not published is marked as pending
                  rather than guessed.
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <div className="mt-7 flex flex-wrap gap-2">
                  <a href={`tel:${BUSINESS.phoneRaw}`} className="btn btn-dark btn-sm">
                    Call the bar
                  </a>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                    WhatsApp
                  </a>
                </div>
              </Reveal>
            </div>

            <div>
              <dl className="border-t border-[var(--line-dark)]">
                {FAQS.map((faq, index) => (
                  <Reveal key={faq.question} delay={Math.min(index, 5) * 0.03}>
                    <details className="group border-b border-[var(--line-dark)] py-5" open={index === 0}>
                      <summary className="flex cursor-pointer list-none items-start justify-between gap-5 [&::-webkit-details-marker]:hidden">
                        <dt className="flex flex-1 items-baseline gap-4">
                          <span className="font-mono text-[0.6rem] tracking-[0.2em] text-scarlet-deep/60">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="font-display text-[1.12rem] leading-snug text-ink sm:text-[1.25rem]">
                            {faq.question}
                          </span>
                          {faq.pending ? (
                            <span className="shrink-0 rounded-none border border-[var(--brass)]/50 px-2 py-0.5 text-[0.52rem] font-bold uppercase tracking-[0.14em] text-[#8a6a34]">
                              Awaiting confirmation
                            </span>
                          ) : null}
                        </dt>
                        <span
                          aria-hidden="true"
                          className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-none border border-[var(--line-dark)] text-[0.8rem] text-[#6b655b] transition-transform duration-300 group-open:rotate-45"
                        >
                          +
                        </span>
                      </summary>
                      <dd className="pl-9 pr-6 pt-3 text-[0.92rem] leading-relaxed text-[#56514a]">{faq.answer}</dd>
                    </details>
                  </Reveal>
                ))}
              </dl>

              <Reveal>
                <div className="mt-8 flex flex-col gap-4 border border-[var(--line-dark)] bg-[#fffaf2] p-6 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-[0.88rem] leading-relaxed text-[#56514a]">
                    Still not sure? Call{" "}
                    <a href={`tel:${BUSINESS.phoneRaw}`} className="text-scarlet-deep underline decoration-dotted">
                      {BUSINESS.phone}
                    </a>{" "}
                    or send an enquiry — the team would rather answer twice than have you guess.
                  </p>
                  <Link href="/contact" className="btn btn-dark btn-sm shrink-0">
                    Contact us
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
