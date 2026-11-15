import Link from "next/link";
import { Suspense } from "react";
import type { Metadata } from "next";
import PageHero from "@/components/site/PageHero";
import MenuExplorer from "@/components/menu/MenuExplorer";
import Reveal from "@/components/site/Reveal";
import { BUSINESS, WHATSAPP_URL } from "@/lib/business";
import { getCategoriesWithProducts } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Digital Menu — Non-Alcoholic Cocktails, Ferments & Bar Food",
  description:
    "Browse KOPRA's full drinks and food menu: First Night, Paadam, Panakam, Green Chutney (Ka), After Meal and The Breakfast, house kombucha, tepache, Palayagodan coffee, benne dosa and more. Nanthancodu, Trivandrum.",
  alternates: { canonical: "/menu" },
};

export default function MenuPage() {
  const categories = getCategoriesWithProducts();
  const total = categories.reduce((count, category) => count + category.products.length, 0);

  return (
    <>
      <PageHero
        index="03 / 09"
        eyebrow="Digital menu"
        title={
          <>
            Every drink, <span className="serif-italic">what is in it.</span>
          </>
        }
        copy="KOPRA's current list — six signature pours, house ferments, the morning table, small plates and something sweet. Filter by category, read the ingredients, then come and argue about which one is best."
        meta={[
          { label: "Categories", value: String(categories.length) },
          { label: "Items listed", value: String(total) },
          { label: "Alcohol", value: "None" },
          { label: "Kitchen", value: "All day" },
        ]}
      >
        <Link href="/reservations" className="btn btn-primary">
          Reserve a table
        </Link>
        <a href={`tel:${BUSINESS.phoneRaw}`} className="btn btn-ghost">
          Ask about today&apos;s list
        </a>
      </PageHero>

      <section className="on-ivory bg-sun pb-20">
        <div className="container-x">
          <Reveal>
            <div className="grid gap-4 border-y border-[var(--line-dark)] py-6 text-[0.82rem] leading-relaxed text-[#6b655b] sm:grid-cols-3">
              <p>
                <strong className="block text-[0.62rem] uppercase tracking-[0.2em] text-scarlet-deep">
                  Pricing
                </strong>
                KOPRA has not published drink prices online. Nothing has been invented here — current prices are
                confirmed at the bar or on {BUSINESS.phone}.
              </p>
              <p>
                <strong className="block text-[0.62rem] uppercase tracking-[0.2em] text-scarlet-deep">
                  Allergies
                </strong>
                Ingredients are listed for every drink. Tell the team about allergies or dietary needs when you book,
                and again when you sit down.
              </p>
              <p>
                <strong className="block text-[0.62rem] uppercase tracking-[0.2em] text-scarlet-deep">
                  Orders
                </strong>
                No online ordering or delivery is offered. To ask about anything off-menu, call or WhatsApp the bar.
              </p>
            </div>
          </Reveal>

          <div className="mt-12">
            <Suspense fallback={<p className="py-10 text-sm text-[#6b655b]">Loading the menu…</p>}>
              <MenuExplorer categories={categories} />
            </Suspense>
          </div>

          <Reveal>
            <div className="mt-16 flex flex-col items-start justify-between gap-5 border-t border-[var(--line-dark)] pt-8 sm:flex-row sm:items-center">
              <p className="max-w-xl text-[0.88rem] leading-relaxed text-[#6b655b]">
                The menu changes with the ferments and the season. If something you read about is not on today, ask —
                the bar team will tell you what to try instead.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-dark btn-sm">
                  WhatsApp the bar
                </a>
                <Link href="/reservations" className="btn btn-primary btn-sm">
                  Reserve
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
