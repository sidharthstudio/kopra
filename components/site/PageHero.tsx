import type { ReactNode } from "react";
import Reveal from "./Reveal";

export default function PageHero({
  index,
  eyebrow,
  title,
  copy,
  children,
  meta,
}: {
  index: string;
  eyebrow: string;
  title: ReactNode;
  copy?: string;
  children?: ReactNode;
  meta?: { label: string; value: string }[];
}) {
  return (
    <header className="relative overflow-hidden bg-aurora grain pt-32 pb-16 sm:pt-40 sm:pb-20">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[var(--line)]" />
      <div className="container-x relative z-10">
        <div className="flex items-start justify-between gap-6 border-b border-[var(--line)] pb-5">
          <Reveal>
            <span className="eyebrow">{eyebrow}</span>
          </Reveal>
          <span className="font-display text-4xl font-extrabold leading-none text-ivory/15 sm:text-6xl">
            {index}
          </span>
        </div>
        <Reveal variant="mask" delay={0.06}>
          <h1 className="display display-xl mt-8 max-w-4xl">{title}</h1>
        </Reveal>
        {copy ? (
          <Reveal delay={0.14}>
            <p className="lede mt-7">{copy}</p>
          </Reveal>
        ) : null}
        {children ? (
          <Reveal delay={0.2}>
            <div className="mt-9 flex flex-wrap items-center gap-4">{children}</div>
          </Reveal>
        ) : null}
        {meta?.length ? (
          <Reveal delay={0.24}>
            <dl className="mt-14 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-[var(--line)] pt-8 sm:grid-cols-4">
              {meta.map((item) => (
                <div key={item.label}>
                  <dt className="text-[0.6rem] uppercase tracking-[0.24em] text-muted">{item.label}</dt>
                  <dd className="mt-2 font-display text-xl text-ivory">{item.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        ) : null}
      </div>
    </header>
  );
}
