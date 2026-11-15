import Image from "next/image";
import Link from "next/link";
import TiltCard from "@/components/site/TiltCard";
import { formatDate, inr } from "@/lib/format";
import type { EventRecord } from "@/lib/types";

export default function EventCard({ event, index = 0 }: { event: EventRecord; index?: number }) {
  return (
    <TiltCard className="h-full" intensity={5}>
      <article className="group flex h-full flex-col overflow-hidden border border-[var(--line)] bg-[#15100d]">
        <div className="relative aspect-[16/10] overflow-hidden">
          {event.imageUrl ? (
            <Image
              src={event.imageUrl}
              alt={event.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover opacity-85 transition-all duration-[1100ms] group-hover:scale-105 group-hover:opacity-100"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-[var(--clay)] to-[var(--ink)]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0a] via-transparent to-transparent" />
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            <span className="rounded-none border border-white/25 bg-black/40 px-3 py-1 text-[0.56rem] font-bold uppercase tracking-[0.22em] text-ivory backdrop-blur">
              {event.kind}
            </span>
            {event.priceInr !== null ? (
              <span className="rounded-none bg-[var(--scarlet)] px-3 py-1 text-[0.56rem] font-bold uppercase tracking-[0.18em] text-ivory">
                {inr(event.priceInr)} / person
              </span>
            ) : null}
          </div>
          <span className="absolute bottom-4 right-5 font-display text-4xl font-extrabold text-ivory/25">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6 sm:p-7">
          <p className="text-[0.66rem] uppercase tracking-[0.2em] text-brass">
            {event.startsAt ? formatDate(event.startsAt) : "Next date on request"}
          </p>
          <h3 className="display display-sm mt-3 text-ivory">{event.title}</h3>
          <p className="mt-3 text-[0.92rem] leading-relaxed text-ivory/65">{event.description}</p>
          {event.detail ? (
            <p className="mt-3 text-[0.8rem] leading-relaxed text-ivory/45">{event.detail}</p>
          ) : null}
          <Link href={event.ctaHref} className="link-underline mt-auto pt-6">
            Enquire
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </article>
    </TiltCard>
  );
}
