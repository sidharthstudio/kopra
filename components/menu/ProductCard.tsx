import Image from "next/image";
import TiltCard from "@/components/site/TiltCard";
import { inr } from "@/lib/format";
import type { Product } from "@/lib/types";

export default function ProductCard({
  product,
  tone = "dark",
  priority = false,
}: {
  product: Product;
  tone?: "dark" | "ivory";
  priority?: boolean;
}) {
  const ivory = tone === "ivory";

  return (
    <TiltCard className="h-full" intensity={6}>
      <article
        className={`group flex h-full flex-col overflow-hidden border ${
          ivory ? "border-[var(--line-dark)] bg-[#fffaf2]" : "border-[var(--line)] bg-[#171716]"
        }`}
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={`${product.name} — ${product.tagline ?? "KOPRA non-alcoholic cocktail"}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={priority}
              className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.06]"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-[var(--clay)] to-[var(--ink)]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />
          {product.isSignature ? (
            <span className="absolute left-4 top-4 rounded-none border border-white/25 bg-black/35 px-3 py-1 text-[0.58rem] font-bold uppercase tracking-[0.22em] text-brass-soft backdrop-blur">
              Signature
            </span>
          ) : null}
          <span
            className={`absolute bottom-4 right-4 rounded-none px-3 py-1 text-[0.66rem] font-semibold tracking-wide backdrop-blur ${
              product.priceInr === null
                ? "border border-white/25 bg-black/30 text-white/80"
                : "bg-[var(--ivory)] text-ink"
            }`}
          >
            {inr(product.priceInr)}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6 sm:p-7">
          <h3 className={`display display-sm ${ivory ? "text-ink" : "text-ivory"}`}>
            {product.name}
          </h3>
          {product.tagline ? (
            <p className={`mt-2 text-[0.72rem] uppercase tracking-[0.16em] ${ivory ? "text-scarlet-deep" : "text-brass"}`}>
              {product.tagline}
            </p>
          ) : null}
          {product.description ? (
            <p className={`mt-4 text-[0.92rem] leading-relaxed ${ivory ? "text-[#56514a]" : "text-ivory/65"}`}>
              {product.description}
            </p>
          ) : null}

          <div className={`mt-auto pt-5 ${product.notes ? "" : "hidden"}`}>
            <div className={`h-px w-full ${ivory ? "bg-[var(--line-dark)]" : "bg-[var(--line)]"}`} />
            <p className={`mt-4 text-[0.7rem] uppercase tracking-[0.16em] ${ivory ? "text-[#7d7365]" : "text-muted"}`}>
              {product.ingredients}
            </p>
            {product.notes ? (
              <p className={`mt-2 text-[0.68rem] ${ivory ? "text-[#9b9184]" : "text-ivory/40"}`}>{product.notes}</p>
            ) : null}
          </div>
          {!product.notes && product.ingredients ? (
            <p className={`mt-auto pt-5 text-[0.7rem] uppercase tracking-[0.16em] ${ivory ? "text-[#7d7365]" : "text-muted"}`}>
              {product.ingredients}
            </p>
          ) : null}
        </div>
      </article>
    </TiltCard>
  );
}
