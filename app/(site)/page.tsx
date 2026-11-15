import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import HeroVisual from "@/components/three/HeroVisual";
import Marquee from "@/components/site/Marquee";
import SectionHeading from "@/components/site/SectionHeading";
import Reveal from "@/components/site/Reveal";
import Parallax from "@/components/site/Parallax";
import ProductCard from "@/components/menu/ProductCard";
import EventCard from "@/components/events/EventCard";
import { BUSINESS, WHATSAPP_URL } from "@/lib/business";
import { PRESS, PROCESS, REVIEWS, SEATING_NOTES } from "@/lib/content";
import { getCategoriesWithProducts, getEvents, getGallery, getSignatureProducts } from "@/lib/db";
import { formatTime } from "@/lib/format";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "KOPRA — India's First Non-Alcoholic Cocktail Bar in Trivandrum",
  description:
    "Non-alcoholic cocktails built from scratch in Nanthancodu, Thiruvananthapuram. House kombucha, kefir and tepache, Kerala-inspired signature pours, bar food and cocktail workshops. Open daily 7 AM – 11 PM.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const categories = getCategoriesWithProducts();
  const signatures = getSignatureProducts(3);
  const events = getEvents().slice(0, 3);
  const gallery = getGallery().slice(0, 6);
  const heroDrink = signatures[0];
  const drinkCount = categories.reduce((total, category) => total + category.products.length, 0);

  return (
    <>
      {/* ---------------------------------------------------------------- hero */}
      <section className="relative isolate min-h-[100svh] overflow-hidden bg-aurora grain">
        <div className="container-x pointer-events-none absolute inset-x-0 top-16 z-10 hidden items-center justify-between border-b border-[var(--line)] pb-3 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted lg:flex">
          <span className="text-brass">Index 01 / Home</span>
          <span>Zero alcohol — full bar experience</span>
          <span className="text-ivory/60">
            {BUSINESS.rating.value}★ · {BUSINESS.rating.count} Google reviews
          </span>
        </div>
        <div className="container-x relative z-10 grid min-h-[100svh] items-center gap-6 pt-28 pb-20 lg:grid-cols-[1.02fr_0.98fr] lg:gap-4 lg:pt-24 lg:pb-16">
          <div className="relative z-10 max-w-2xl">
            <Reveal>
              <span className="eyebrow">Nanthancodu · Thiruvananthapuram</span>
            </Reveal>

            <h1 className="display display-xl mt-6 text-ivory">
              <Reveal variant="mask" delay={0.05} as="span" className="block">
                Cocktails,
              </Reveal>
              <Reveal variant="mask" delay={0.16} as="span" className="block">
                <span className="serif-italic">without</span> the
              </Reveal>
              <Reveal variant="mask" delay={0.26} as="span" className="block">
                alcohol.
              </Reveal>
            </h1>

            <Reveal delay={0.2}>
              <p className="lede mt-7">
                India&apos;s first non-alcoholic cocktail bar. House ferments, fresh produce and Kerala&apos;s own
                flavours — built into a full bar experience on the third floor in Nanthancodu. Every drink is made
                from scratch. None of them need alcohol to be worth the trip.
              </p>
            </Reveal>

            <Reveal delay={0.28}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link href="/menu" className="btn btn-primary">
                  Explore the menu
                  <span aria-hidden="true">→</span>
                </Link>
                <Link href="/reservations" className="btn btn-ghost">
                  Reserve a table
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.36}>
              <dl className="mt-12 grid max-w-xl grid-cols-3 gap-4 border-y border-[var(--line)] py-5">
                <div>
                  <dt className="font-mono text-[0.56rem] uppercase tracking-[0.16em] text-muted">Google rating</dt>
                  <dd className="mt-2 font-display text-2xl font-extrabold text-ivory">
                    {BUSINESS.rating.value} <span className="text-brass">★</span>
                    <span className="ml-1 font-mono text-[0.6rem] font-normal tracking-wide text-muted">
                      ({BUSINESS.rating.count})
                    </span>
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.56rem] uppercase tracking-[0.16em] text-muted">Open daily</dt>
                  <dd className="mt-2 font-display text-2xl font-extrabold text-ivory">7–23</dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.56rem] uppercase tracking-[0.16em] text-muted">Workshop</dt>
                  <dd className="mt-2 font-display text-2xl font-extrabold text-ivory">₹699</dd>
                </div>
              </dl>
            </Reveal>
          </div>

          <div className="relative h-[400px] w-full border border-[var(--line)] sm:h-[520px] lg:h-full lg:min-h-[620px]">
            <span aria-hidden="true" className="pointer-events-none absolute left-0 top-0 z-20 h-3 w-3 border-l-2 border-t-2 border-[var(--brass)]" />
            <span aria-hidden="true" className="pointer-events-none absolute right-0 top-0 z-20 h-3 w-3 border-r-2 border-t-2 border-[var(--brass)]" />
            <span aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 z-20 h-3 w-3 border-b-2 border-l-2 border-[var(--brass)]" />
            <span aria-hidden="true" className="pointer-events-none absolute bottom-0 right-0 z-20 h-3 w-3 border-b-2 border-r-2 border-[var(--brass)]" />
            <HeroVisual />
            <div className="pointer-events-none absolute right-2 top-6 z-20 hidden border border-[var(--brass)] bg-[var(--ink)] px-4 py-2 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-brass sm:right-4 sm:block float-slow">
              Zero alcohol · Full flavour
            </div>
            <div
              className="pointer-events-none absolute bottom-8 left-0 z-20 hidden max-w-[220px] border border-[var(--line)] bg-[var(--ink)] p-3 sm:block"
              style={{ animation: "floaty 11s ease-in-out infinite 1.2s" }}
            >
              <p className="text-[0.58rem] uppercase tracking-[0.22em] text-brass">Now pouring</p>
              <p className="mt-1 font-display text-lg text-ivory">{heroDrink?.name ?? "Paadam"}</p>
              <p className="mt-1 text-[0.68rem] leading-relaxed text-ivory/55">
                {heroDrink?.tagline ?? "Pazhamkanji, reimagined as a cocktail"}
              </p>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
          <span className="font-mono text-[0.55rem] uppercase tracking-[0.24em] text-muted">Scroll</span>
          <span className="h-10 w-px bg-gradient-to-b from-[var(--brass)] to-transparent" />
        </div>
      </section>

      <Marquee
        items={[
          "India's first non-alcoholic cocktail bar",
          "House kombucha",
          "Milk kefir & water kefir",
          "Tepache",
          "Kerala flavours",
          "Cocktail workshops",
          "Open 7 AM – 11 PM",
        ]}
      />

      {/* --------------------------------------------------------------- story */}
      <section className="on-ivory bg-sun section grain relative overflow-hidden">
        <div className="container-x relative z-10">
          <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
            <div className="order-2 lg:order-1">
              <Reveal>
                <span className="eyebrow">The idea</span>
              </Reveal>
              <Reveal variant="mask" delay={0.06}>
                <h2 className="display display-lg mt-5 text-ink">
                  A bar built on what Kerala <span className="serif-italic text-scarlet-deep">already</span>{" "}
                  knows how to make.
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-7 text-[1.02rem] leading-[1.75] text-[#56514a]">
                  KOPRA began with a simple question: why should the best drink in the room be the one with alcohol in
                  it? Mixologists Renjith Reji and Azad K V, working with founder Arun Kumar and co-founders Athira J
                  and Yeji Yesu, built the answer from fermentation, clarification and infusion — kombucha and kefir
                  cultured in-house, kanji vellam turned into a cocktail, panakam poured as a highball.
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <p className="mt-5 text-[1.02rem] leading-[1.75] text-[#56514a]">
                  The result is a bar that behaves like a bar: a scarlet-lit room, a soundtrack, a counter to sit at,
                  and drinks with stories. Just no alcohol.
                </p>
              </Reveal>
              <Reveal delay={0.24}>
                <Link href="/about" className="link-underline mt-9 inline-flex">
                  Read our story
                  <span aria-hidden="true">→</span>
                </Link>
              </Reveal>
            </div>

            <div className="order-1 lg:order-2">
              <Reveal delay={0.1}>
                <div className="relative">
                  <div
                    aria-hidden="true"
                    className="absolute -bottom-5 -left-5 right-10 top-10 border border-[var(--scarlet)]/30"
                  />
                  <Parallax distance={34} className="relative aspect-[4/5] overflow-hidden bg-[var(--sand)]">
                    <Image
                      src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80"
                      alt="Warm, low-lit restaurant interior — the atmosphere KOPRA's third-floor room is built for"
                      fill
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      className="object-cover"
                    />
                  </Parallax>
                  <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 border border-white/15 bg-black/45 px-4 py-3 backdrop-blur">
                    <p className="text-[0.6rem] uppercase tracking-[0.18em] text-ivory/70">
                      Third floor, Capitol Building
                      <br />
                      Nanthancodu, Trivandrum
                    </p>
                    <span className="font-display text-2xl text-brass-soft">K</span>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="mt-20 grid gap-8 border-t border-[var(--line-dark)] pt-10 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "0%", label: "Alcohol, across the entire menu" },
              { value: `${drinkCount}`, label: "Drinks and plates on the current menu" },
              { value: `${BUSINESS.rating.value}★`, label: `${BUSINESS.rating.count} Google reviews, ${BUSINESS.rating.asOf}` },
              { value: "₹699", label: "Cocktail workshop, per person" },
            ].map((stat, index) => (
              <Reveal key={stat.label} delay={index * 0.06}>
                <div>
                  <p className="display display-md text-ink">{stat.value}</p>
                  <p className="mt-2 text-[0.78rem] leading-snug text-[#6b655b]">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- signatures */}
      <section className="section relative overflow-hidden bg-[var(--ink)]">
        <div className="container-x relative z-10">
          <SectionHeading
            eyebrow="Signature pours"
            title={
              <>
                Six drinks that explain <span className="serif-italic">the whole idea.</span>
              </>
            }
            copy="Each one built from scratch at the bar — fermented, infused, clarified, poured. These are the pours guests come back for."
            link={{ href: "/menu", label: "Full digital menu" }}
          />

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {signatures.map((product, index) => (
              <Reveal key={product.id} delay={index * 0.08}>
                <ProductCard product={product} priority={index === 0} />
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-col items-start justify-between gap-3 border-t border-[var(--line)] pt-6 text-[0.78rem] text-muted sm:flex-row sm:items-center">
              <p>
                Drink prices are not published by KOPRA — the menu lists every ingredient, and current prices are
                confirmed at the bar or on {BUSINESS.phone}.
              </p>
              <Link href="/menu" className="link-underline shrink-0">
                See all six
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------- menu index */}
      <section className="on-ivory bg-sun section">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <span className="eyebrow">The menu</span>
              </Reveal>
              <Reveal variant="mask" delay={0.06}>
                <h2 className="display display-lg mt-5 text-ink">
                  Five ways into <span className="serif-italic text-scarlet-deep">the list.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-6 text-[0.98rem] leading-relaxed text-[#56514a]">
                  Signature pours, house ferments, the morning table, small plates and something sweet. Filter the
                  digital menu by category, read every ingredient, and ask the bar team what they are excited about
                  today.
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <Link href="/menu" className="btn btn-dark mt-8">
                  Open the digital menu
                </Link>
              </Reveal>
            </div>

            <ul className="border-t border-[var(--line-dark)]">
              {categories.map((category, index) => (
                <Reveal key={category.id} delay={index * 0.05}>
                  <li>
                    <Link
                      href={`/menu?category=${category.slug}`}
                      className="group flex items-start gap-5 border-b border-[var(--line-dark)] py-6 transition-colors duration-300 hover:border-[var(--scarlet)] sm:gap-8"
                    >
                      <span className="mt-1 font-mono text-[0.66rem] tracking-[0.2em] text-scarlet-deep/70">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1">
                        <span className="flex flex-wrap items-baseline justify-between gap-2">
                          <span className="font-display text-2xl font-extrabold text-ink transition-colors group-hover:text-scarlet-deep sm:text-3xl">
                            {category.name}
                          </span>
                          <span className="text-[0.62rem] uppercase tracking-[0.18em] text-[#877f72]">
                            {category.products.length} {category.products.length === 1 ? "item" : "items"}
                          </span>
                        </span>
                        <span className="mt-2 block max-w-xl text-[0.88rem] leading-relaxed text-[#6b655b]">
                          {category.description}
                        </span>
                      </span>
                      <span
                        aria-hidden="true"
                        className="mt-1 text-scarlet-deep transition-transform duration-300 group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </Link>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------- craft */}
      <section className="section relative overflow-hidden bg-[#0b0b0a]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-none bg-[radial-gradient(circle,rgba(196,62,41,0.18),transparent_65%)]"
        />
        <div className="container-x relative z-10">
          <SectionHeading
            eyebrow="How it is made"
            title={
              <>
                Ferment. Infuse. Clarify. <span className="serif-italic">Pour.</span>
              </>
            }
            copy="A cocktail without alcohol has nowhere to hide. The body, the bite, the length on the palate — all of it has to be built, not borrowed from a spirit."
          />

          <div className="mt-16 grid gap-px overflow-hidden border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((step, index) => (
              <Reveal key={step.step} delay={index * 0.07}>
                <div className="group h-full bg-[#0b0b0a] p-7 transition-colors duration-500 hover:bg-[#1c1c1a]">
                  <span className="font-display text-5xl font-extrabold text-ivory/15 transition-colors duration-500 group-hover:text-brass/40">
                    {step.step}
                  </span>
                  <h3 className="display display-sm mt-5 text-ivory">{step.title}</h3>
                  <p className="mt-3 text-[0.88rem] leading-relaxed text-ivory/55">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.12}>
            <div className="mt-12 grid gap-6 border-t border-[var(--line)] pt-8 md:grid-cols-3">
              {PRESS.map((item) => (
                <div key={item.outlet} className="flex items-start gap-3">
                  <span aria-hidden="true" className="mt-1 text-scarlet">
                    ✦
                  </span>
                  <div>
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ivory/80">
                      {item.outlet}
                    </p>
                    <p className="mt-1 text-[0.78rem] text-muted">{item.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------------------------- venue */}
      <section className="relative h-[80vh] min-h-[520px] overflow-hidden">
        <Parallax distance={70} className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1920&q=80"
            alt="Dimly lit bar interior with warm lighting — the atmosphere of KOPRA's third-floor room"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </Parallax>
        <div className="absolute inset-0 bg-gradient-to-t from-[#090908] via-black/40 to-black/25" />
        <div className="container-x relative z-10 flex h-full flex-col justify-end pb-14">
          <Reveal>
            <span className="eyebrow">The room</span>
          </Reveal>
          <Reveal variant="mask" delay={0.08}>
            <h2 className="display display-lg mt-5 max-w-3xl text-ivory">
              Scarlet walls, pop culture on the walls, <span className="serif-italic">a soundtrack worth staying for.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="lede mt-6">
              Third floor, above the noise of Nanthancodu. Sit at the bar and watch the drinks get built, or take a
              table with people who think &ldquo;non-alcoholic&rdquo; means &ldquo;boring&rdquo; — and let the first round
              change their mind.
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/gallery" className="btn btn-ivory">
                See the space
              </Link>
              <a
                href={BUSINESS.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                Get directions
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------------- gallery */}
      <section className="section-tight relative overflow-hidden bg-[#0b0b0a] py-20">
        <div className="container-x">
          <SectionHeading
            eyebrow="Gallery"
            title={
              <>
                Glassware, garnishes, <span className="serif-italic">good light.</span>
              </>
            }
            link={{ href: "/gallery", label: "Full gallery" }}
          />
        </div>
        <div className="mt-10 flex snap-x gap-4 overflow-x-auto px-[clamp(20px,5vw,68px)] pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {gallery.map((photo, index) => (
            <Reveal key={photo.id} delay={index * 0.04} className="shrink-0 snap-start">
              <Link href="/gallery" className="group block">
                <div
                  className={`relative overflow-hidden bg-[var(--clay)] ${
                    index % 3 === 0 ? "h-[300px] w-[220px] sm:h-[380px] sm:w-[280px]" : "h-[300px] w-[250px] sm:h-[380px] sm:w-[330px]"
                  }`}
                >
                  <Image
                    src={photo.url}
                    alt={photo.caption}
                    fill
                    sizes="(max-width: 640px) 250px, 330px"
                    className="object-cover opacity-90 transition-all duration-[900ms] group-hover:scale-105 group-hover:opacity-100"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-10">
                    <p className="text-[0.66rem] uppercase tracking-[0.16em] text-ivory/75">{photo.caption}</p>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------------------- events */}
      <section className="section relative bg-[var(--ink)]">
        <div className="container-x">
          <SectionHeading
            eyebrow="Experiences"
            title={
              <>
                Come for a drink. <span className="serif-italic">Stay for the workshop.</span>
              </>
            }
            copy="Learn to build a non-alcoholic cocktail, book a guided tasting for your table, or take the room for the evening."
            link={{ href: "/events", label: "All experiences" }}
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

      {/* ------------------------------------------------------------- reviews */}
      <section className="on-ivory bg-sun section">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
            <div>
              <Reveal>
                <span className="eyebrow">Word of mouth</span>
              </Reveal>
              <Reveal variant="mask" delay={0.06}>
                <h2 className="display display-lg mt-5 text-ink">
                  {BUSINESS.rating.value} <span className="text-scarlet">★</span>
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-3 text-[0.9rem] text-[#6b655b]">
                  From {BUSINESS.rating.count} Google reviews as of {BUSINESS.rating.asOf}. Guests arrive curious about a
                  bar without alcohol and leave talking about the drinks.
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <a
                  href={BUSINESS.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline mt-8 inline-flex"
                >
                  Read the reviews on Google
                </a>
              </Reveal>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {REVIEWS.map((review, index) => (
                <Reveal key={review.quote} delay={index * 0.06}>
                  <figure className="flex h-full flex-col justify-between border border-[var(--line-dark)] bg-[#fffaf2] p-6">
                    <div>
                      <div className="flex gap-1 text-scarlet" aria-label="5 out of 5 stars">
                        {Array.from({ length: 5 }).map((_, star) => (
                          <span key={star} aria-hidden="true">
                            ★
                          </span>
                        ))}
                      </div>
                      <blockquote className="mt-4 font-display text-[1.05rem] leading-snug text-ink">
                        &ldquo;{review.quote}&rdquo;
                      </blockquote>
                    </div>
                    <figcaption className="mt-5 text-[0.66rem] uppercase tracking-[0.18em] text-[#877f72]">
                      {review.author} · {review.date}
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- reservation */}
      <section className="relative overflow-hidden bg-[#0b0b0a] py-20 sm:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-none bg-[radial-gradient(circle,rgba(196,62,41,0.22),transparent_65%)]"
        />
        <div className="container-x relative z-10">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <Reveal>
                <span className="eyebrow">Reserve</span>
              </Reveal>
              <Reveal variant="mask" delay={0.06}>
                <h2 className="display display-lg mt-5 text-ivory">
                  Save a seat. <span className="serif-italic">We&apos;ll build the drinks.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="lede mt-6">
                  Send a table request and the team will confirm it by phone or WhatsApp. Prefer to talk? Call the bar
                  — someone will pick up between 7 AM and 11 PM.
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/reservations" className="btn btn-primary">
                    Request a table
                  </Link>
                  <a href={`tel:${BUSINESS.phoneRaw}`} className="btn btn-ghost">
                    {BUSINESS.phone}
                  </a>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                    WhatsApp
                  </a>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.16}>
              <div className="border border-[var(--line)] bg-[#121211] p-7 sm:p-8">
                <p className="text-[0.6rem] uppercase tracking-[0.22em] text-brass">What happens next</p>
                <ol className="mt-5 space-y-5">
                  {[
                    { title: "You send the request", body: "Name, phone, date, time and how many of you." },
                    { title: "We confirm by call or WhatsApp", body: "A request is not confirmed until the team replies." },
                    { title: "You turn up, we pour", body: "Third floor, Capitol Building, Nanthancodu." },
                  ].map((step, index) => (
                    <li key={step.title} className="flex gap-4">
                      <span className="mt-0.5 font-mono text-[0.66rem] tracking-[0.2em] text-scarlet">
                        0{index + 1}
                      </span>
                      <div>
                        <p className="text-[0.92rem] font-semibold text-ivory">{step.title}</p>
                        <p className="mt-1 text-[0.82rem] leading-relaxed text-muted">{step.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                <div className="mt-7 border-t border-[var(--line)] pt-5">
                  <p className="text-[0.6rem] uppercase tracking-[0.2em] text-muted">Opening hours</p>
                  <p className="mt-1.5 font-display text-xl text-ivory">{BUSINESS.hours.display}</p>
                  <p className="mt-3 text-[0.72rem] leading-relaxed text-ivory/45">
                    {SEATING_NOTES[0]} {SEATING_NOTES[1]}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- location */}
      <section className="on-ivory bg-sun section-tight">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
            <div>
              <Reveal>
                <span className="eyebrow">Find us</span>
              </Reveal>
              <Reveal variant="mask" delay={0.06}>
                <h2 className="display display-md mt-5 text-ink">Third floor, Capitol Building.</h2>
              </Reveal>
              <div className="mt-7 space-y-5 text-[0.92rem] text-[#56514a]">
                <div>
                  <p className="text-[0.6rem] uppercase tracking-[0.2em] text-[#877f72]">Address</p>
                  <p className="mt-1.5 leading-relaxed">
                    {BUSINESS.address.line1}
                    <br />
                    {BUSINESS.address.line2}
                    <br />
                    {BUSINESS.address.city}, {BUSINESS.address.state} {BUSINESS.address.postalCode}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <p className="text-[0.6rem] uppercase tracking-[0.2em] text-[#877f72]">Phone</p>
                    <a href={`tel:${BUSINESS.phoneRaw}`} className="mt-1.5 block hover:text-scarlet-deep">
                      {BUSINESS.phone}
                    </a>
                  </div>
                  <div>
                    <p className="text-[0.6rem] uppercase tracking-[0.2em] text-[#877f72]">Hours</p>
                    <p className="mt-1.5">
                      {formatTime("07:00")} – {formatTime("23:00")}
                      <br />
                      Every day
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-[0.6rem] uppercase tracking-[0.2em] text-[#877f72]">Instagram</p>
                  <a
                    href={BUSINESS.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1.5 block hover:text-scarlet-deep"
                  >
                    {BUSINESS.instagramHandle}
                  </a>
                </div>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={BUSINESS.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-dark"
                >
                  Get directions
                </a>
                <Link href="/contact" className="btn btn-ghost !border-[var(--line-dark)] !text-ink hover:!bg-[var(--ink)]/5">
                  Contact &amp; location
                </Link>
              </div>
            </div>

            <Reveal delay={0.1}>
              <div className="relative h-[360px] overflow-hidden border border-[var(--line-dark)] sm:h-[440px]">
                <iframe
                  title="Map showing KOPRA in Nanthancodu, Thiruvananthapuram"
                  src={BUSINESS.mapsEmbedUrl}
                  className="h-full w-full grayscale-[35%]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
