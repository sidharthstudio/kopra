import Link from "next/link";
import type { Metadata } from "next";
import PageHero from "@/components/site/PageHero";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import Reveal from "@/components/site/Reveal";
import { getGallery } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Gallery — The Room, The Drinks, The Craft",
  description:
    "A look inside KOPRA: signature non-alcoholic cocktails, the scarlet-lit third-floor room, drinks being built at the bar, and plates from the kitchen.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  const photos = getGallery();

  return (
    <>
      <PageHero
        index="06 / 09"
        eyebrow="Gallery"
        title={
          <>
            The room, the glass, <span className="serif-italic">the light.</span>
          </>
        }
        copy="Scarlet walls, low light and drinks worth photographing. A look at what the third floor in Nanthancodu feels like."
        meta={[
          { label: "Drinks", value: "6 signature pours" },
          { label: "Room", value: "3rd floor" },
          { label: "Hours", value: "7 AM – 11 PM" },
          { label: "Best light", value: "After 6 PM" },
        ]}
      />

      <section className="section bg-[var(--ink)]">
        <div className="container-x">
          <Reveal>
            <GalleryGrid photos={photos} />
          </Reveal>

          <Reveal>
            <div className="mt-14 flex flex-col gap-5 border-t border-[var(--line)] pt-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-2xl text-[0.78rem] leading-relaxed text-ivory/45">
                Photography on this site is representative while KOPRA&apos;s own shoot is being catalogued. Tag{" "}
                <a
                  href="https://www.instagram.com/kopraindia/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brass-soft underline decoration-dotted"
                >
                  @kopraindia
                </a>{" "}
                in your photos and you might see yours here.
              </p>
              <div className="flex gap-3">
                <Link href="/menu" className="btn btn-ghost btn-sm">
                  See the menu
                </Link>
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
