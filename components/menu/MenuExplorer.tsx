"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ProductCard from "./ProductCard";
import type { CategoryWithProducts } from "@/lib/types";

export default function MenuExplorer({ categories }: { categories: CategoryWithProducts[] }) {
  const params = useSearchParams();
  const initial = params.get("category");
  const validInitial = categories.some((category) => category.slug === initial) ? initial : "all";
  const [active, setActive] = useState<string>(validInitial ?? "all");

  const filtered = useMemo(
    () => (active === "all" ? categories : categories.filter((category) => category.slug === active)),
    [active, categories],
  );

  const total = categories.reduce((count, category) => count + category.products.length, 0);

  return (
    <div>
      <div className="sticky top-[68px] z-30 -mx-[clamp(20px,5vw,68px)] mb-12 border-b border-[var(--line-dark)] bg-[var(--ivory)]/92 px-[clamp(20px,5vw,68px)] py-4 backdrop-blur-md">
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter the menu by category">
          <button
            type="button"
            onClick={() => setActive("all")}
            aria-pressed={active === "all"}
            className={`rounded-none border px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] transition-colors ${
              active === "all"
                ? "border-[var(--ink)] bg-[var(--ink)] text-ivory"
                : "border-[var(--line-dark)] text-[#6b655b] hover:border-[var(--ink)] hover:text-ink"
            }`}
          >
            Everything <span className="ml-1 opacity-60">{total}</span>
          </button>
          {categories.map((category) => (
            <button
              key={category.slug}
              type="button"
              onClick={() => setActive(category.slug)}
              aria-pressed={active === category.slug}
              className={`rounded-none border px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] transition-colors ${
                active === category.slug
                  ? "border-[var(--scarlet)] bg-[var(--scarlet)] text-ivory"
                  : "border-[var(--line-dark)] text-[#6b655b] hover:border-[var(--ink)] hover:text-ink"
              }`}
            >
              {category.name} <span className="ml-1 opacity-60">{category.products.length}</span>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-16"
        >
          {filtered.map((category, categoryIndex) => (
            <section key={category.id} aria-labelledby={`category-${category.slug}`}>
              <div className="flex flex-col gap-3 border-b border-[var(--line-dark)] pb-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="font-mono text-[0.62rem] tracking-[0.24em] text-scarlet-deep/70">
                    {String(categories.findIndex((item) => item.id === category.id) + 1).padStart(2, "0")}
                  </p>
                  <h2 id={`category-${category.slug}`} className="display display-md mt-2 text-ink">
                    {category.name}
                  </h2>
                </div>
                <p className="max-w-md text-[0.85rem] leading-relaxed text-[#6b655b]">{category.description}</p>
              </div>

              {category.products.length === 0 ? (
                <p className="py-10 text-[0.9rem] text-[#6b655b]">
                  Nothing listed in this category yet. Ask the bar team what is on today.
                </p>
              ) : (
                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {category.products.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <ProductCard product={product} tone="ivory" priority={categoryIndex === 0 && index < 2} />
                    </motion.div>
                  ))}
                </div>
              )}
            </section>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
