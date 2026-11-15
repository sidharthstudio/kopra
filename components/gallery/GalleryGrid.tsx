"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { GalleryPhoto } from "@/lib/types";

export default function GalleryGrid({ photos }: { photos: GalleryPhoto[] }) {
  const categories = useMemo(() => ["All", ...Array.from(new Set(photos.map((photo) => photo.category)))], [photos]);
  const [active, setActive] = useState("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const visible = useMemo(
    () => (active === "All" ? photos : photos.filter((photo) => photo.category === active)),
    [active, photos],
  );

  const close = useCallback(() => setOpenIndex(null), []);
  const step = useCallback(
    (direction: number) => {
      setOpenIndex((current) => {
        if (current === null) return current;
        const next = (current + direction + visible.length) % visible.length;
        return next;
      });
    },
    [visible.length],
  );

  useEffect(() => {
    if (openIndex === null) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    }
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [openIndex, close, step]);

  const current = openIndex !== null ? visible[openIndex] : null;

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter gallery">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActive(category)}
            aria-pressed={active === category}
            className={`rounded-none border px-4 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.18em] transition-colors ${
              active === category
                ? "border-[var(--brass)] bg-[var(--brass)] text-ink"
                : "border-[var(--line)] text-ivory/65 hover:border-[var(--brass)] hover:text-brass"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        {visible.map((photo, index) => (
          <motion.button
            key={photo.id}
            type="button"
            onClick={() => setOpenIndex(index)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: (index % 3) * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="group relative block w-full overflow-hidden bg-[var(--clay)] text-left"
            aria-label={`Open image: ${photo.caption}`}
          >
            <div className={`relative w-full ${photo.orientation === "portrait" ? "aspect-[3/4]" : "aspect-[4/3]"}`}>
              <Image
                src={photo.url}
                alt={photo.caption}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover opacity-90 transition-all duration-[900ms] group-hover:scale-[1.04] group-hover:opacity-100"
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 pt-12">
              <p className="text-[0.62rem] uppercase tracking-[0.18em] text-brass-soft">{photo.category}</p>
              <p className="mt-1 text-[0.86rem] text-ivory">{photo.caption}</p>
            </div>
            <span className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-none border border-white/30 bg-black/30 text-[0.7rem] text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
              ↗
            </span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {current ? (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/92 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={current.caption}
            onClick={close}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.97, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-h-[86vh] w-full max-w-5xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="relative aspect-[4/3] w-full sm:aspect-[16/10]">
                <Image src={current.url} alt={current.caption} fill sizes="90vw" className="object-contain" />
              </div>
              <div className="mt-4 flex items-center justify-between gap-4">
                <p className="text-[0.78rem] uppercase tracking-[0.16em] text-ivory/70">{current.caption}</p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    className="flex h-10 w-10 items-center justify-center rounded-none border border-[var(--line)] text-ivory hover:border-[var(--brass)]"
                    aria-label="Previous image"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    className="flex h-10 w-10 items-center justify-center rounded-none border border-[var(--line)] text-ivory hover:border-[var(--brass)]"
                    aria-label="Next image"
                  >
                    →
                  </button>
                </div>
              </div>
              <button
                type="button"
                onClick={close}
                className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-none border border-[var(--line)] text-ivory hover:border-[var(--brass)]"
                aria-label="Close gallery"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
