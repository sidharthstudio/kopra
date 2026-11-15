import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import PageHero from "@/components/site/PageHero";
import Reveal from "@/components/site/Reveal";
import Parallax from "@/components/site/Parallax";
import Marquee from "@/components/site/Marquee";
import SectionHeading from "@/components/site/SectionHeading";
import { BUSINESS, FOUNDERS } from "@/lib/business";
import { PRINCIPLES, PROCESS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Our Story — A Non-Alcoholic Cocktail Bar in Trivandrum",
  description:
    "How KOPRA became India's first non-alcoholic cocktail bar: founder Arun Kumar with co-founders Athira J, Yeji Yesu, Renjith Reji and Azad K V, building cocktails from house ferments and Kerala flavours.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        index="02 / 09"
        eyebrow="Our story"
        title={
          <>
            A bar with nothing <span className="serif-italic">to hide behind.</span>
          </>
        }
        copy="KOPRA is India's first non-alcoholic cocktail bar. It exists because a great drink should not depend on alcohol — and because Kerala already had the ingredients."
        meta={[
          { label: "Opened", value: "2026" },
          { label: "Home", value: "Nanthancodu" },
          { label: "Concept", value: "Zero alcohol" },
          { label: "Google", value: `${BUSINESS.rating.value} ★` },
        ]}
      />

      <section className="on-ivory bg-sun section">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <div>
              <Reveal>
                <span className="eyebrow">The beginning</span>
              </Reveal>
              <Reveal variant="mask" delay={0.06}>
                <h2 className="display display-lg mt-5 text-ink">
                  Two mixologists, one question, <span className="serif-italic text-scarlet-deep">a full bar.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <div className="mt-7 space-y-5 text-[1.01rem] leading-[1.78] text-[#56514a]">
                  <p>
                    After their time at The Ivory Club, mixologists Renjith Reji and Azad K V wanted to explore a
                    drinking culture that moved away from alcohol — without giving up any of the craft. Together with
                    founder Arun Kumar and co-founders Athira J and Yeji Yesu, they opened KOPRA on the third floor of
                    Capitol Building in Nanthancodu, Thiruvananthapuram.
                  </p>
                  <p>
                    The idea was not to make &ldquo;mocktails&rdquo;. It was to run a proper bar — a counter, a
                    programme, a room with a soundtrack — where every drink is built from scratch and none of them
                    contains alcohol.
                  </p>
                  <p>
                    The menu started with flavours people already knew. Pazhamkanji, panakam, kanji vellam. Rather than
                    hiding behind exotic ingredients, KOPRA took the everyday pantry of Kerala and put it through real
                    mixology: fermentation, carbonation, clarification, infusion.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.18}>
                <div className="mt-9 border-t border-[var(--line-dark)] pt-6">
                  <p className="text-[0.6rem] uppercase tracking-[0.22em] text-[#877f72]">The team</p>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {FOUNDERS.map((person) => (
                      <li key={person.name}>
                        <p className="font-display text-lg text-ink">{person.name}</p>
                        <p className="text-[0.7rem] uppercase tracking-[0.16em] text-[#877f72]">{person.role}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>

            <div className="relative">
              <Reveal delay={0.1}>
                <div className="relative">
                  <Parallax distance={30} className="relative aspect-[4/5] overflow-hidden bg-[var(--sand)]">
                    <Image
                      src="https://images.unsplash.com/photo-1587223962930-cb7f31384c19?auto=format&fit=crop&w=1200&q=80"
                      alt="A bartender finishing a drink at the bar"
                      fill
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      className="object-cover"
                    />
                  </Parallax>
                  <div
                    aria-hidden="true"
                    className="absolute -right-4 -top-4 bottom-12 left-12 border border-[var(--scarlet)]/25"
                  />
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="mt-6 border border-[var(--line-dark)] bg-[#fffaf2] p-5">
                  <p className="text-[0.62rem] uppercase tracking-[0.2em] text-scarlet-deep">In the press</p>
                  <p className="mt-2 font-display text-lg leading-snug text-ink">
                    &ldquo;A drinking culture moving away from alcohol while tapping into Thiruvananthapuram&apos;s
                    budding cocktail scene.&rdquo;
                  </p>
                  <p className="mt-3 text-[0.72rem] uppercase tracking-[0.14em] text-[#877f72]">The Hindu, October 2026</p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <Marquee
        tone="ivory"
        items={["From scratch", "No alcohol", "House ferments", "Kerala flavours", "A full bar experience"]}
      />

      <section className="section bg-[var(--ink)]">
        <div className="container-x">
          <SectionHeading
            eyebrow="What we believe"
            title={
              <>
                Four things KOPRA <span className="serif-italic">will not compromise on.</span>
              </>
            }
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {PRINCIPLES.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.07}>
                <div className="group h-full border border-[var(--line)] bg-[#15100d] p-7 transition-colors duration-500 hover:border-[var(--brass)]/40 sm:p-9">
                  <span className="font-mono text-[0.62rem] tracking-[0.24em] text-scarlet">
                    0{index + 1}
                  </span>
                  <h3 className="display display-sm mt-4 text-ivory">{item.title}</h3>
                  <p className="mt-3 text-[0.92rem] leading-relaxed text-ivory/60">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="on-ivory bg-sun section">
        <div className="container-x">
          <SectionHeading
            eyebrow="The beverage concept"
            title={
              <>
                The bar is the kitchen. <span className="serif-italic text-scarlet-deep">The kitchen is the bar.</span>
              </>
            }
            copy="Nothing on the drinks list is poured from a bottle and called a cocktail. Each element is fermented, infused or clarified in-house, then assembled to order."
          />

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((step, index) => (
              <Reveal key={step.step} delay={index * 0.06}>
                <div className="border-t border-[var(--line-dark)] pt-5">
                  <div className="flex items-baseline justify-between">
                    <span className="font-mono text-[0.62rem] tracking-[0.2em] text-[#877f72]">{step.step}</span>
                    <span className="font-display text-2xl text-scarlet-deep/25">{step.title.charAt(0)}</span>
                  </div>
                  <h3 className="display display-sm mt-3 text-ink">{step.title}</h3>
                  <p className="mt-3 text-[0.88rem] leading-relaxed text-[#6b655b]">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.12}>
            <div className="mt-14 grid gap-8 border-t border-[var(--line-dark)] pt-10 md:grid-cols-3">
              <div>
                <p className="text-[0.6rem] uppercase tracking-[0.22em] text-[#877f72]">What is in the glass</p>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-[#56514a]">
                  Kombucha, milk kefir, water kefir, tepache, kanji vellam. Fresh fruit, herbs, spices and house
                  infusions — not a powdered mix.
                </p>
              </div>
              <div>
                <p className="text-[0.6rem] uppercase tracking-[0.22em] text-[#877f72]">What is not</p>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-[#56514a]">
                  Alcohol — and, by KOPRA&apos;s own approach, reliance on syrups and added sugar to carry the drink.
                </p>
              </div>
              <div>
                <p className="text-[0.6rem] uppercase tracking-[0.22em] text-[#877f72]">Why it matters</p>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-[#56514a]">
                  A drink without alcohol has nowhere to hide. The balance is either built properly or it is not there
                  at all.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#0b0b0a] py-20">
        <div className="container-x">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <Reveal>
                <span className="eyebrow">The room</span>
              </Reveal>
              <Reveal variant="mask" delay={0.06}>
                <h2 className="display display-lg mt-5 text-ivory">
                  Scarlet-tinted, pop-culture <span className="serif-italic">on the walls.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="lede mt-6">
                  A third-floor room with scarlet light and pop-culture references — the kind of bar you stay in longer
                  than you planned. The hospitality is loud, warm and genuinely glad you came.
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/gallery" className="btn btn-ivory">
                    See the gallery
                  </Link>
                  <Link href="/reservations" className="btn btn-ghost">
                    Reserve a table
                  </Link>
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.14}>
              <Parallax distance={40} className="relative aspect-[5/4] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1481833761820-0509d3217039?auto=format&fit=crop&w=1200&q=80"
                  alt="Guests at a warmly lit cocktail bar"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </Parallax>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="on-ivory bg-sun section-tight">
        <div className="container-narrow text-center">
          <Reveal>
            <span className="eyebrow">See it for yourself</span>
          </Reveal>
          <Reveal variant="mask" delay={0.06}>
            <h2 className="display display-lg mt-5 text-ink">
              The drinks are the argument. <span className="serif-italic text-scarlet-deep">Come taste one.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link href="/menu" className="btn btn-dark">
                Explore the menu
              </Link>
              <Link href="/reservations" className="btn btn-primary">
                Reserve a table
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
