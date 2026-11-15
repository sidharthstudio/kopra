import Link from "next/link";
import type { ReactNode } from "react";
import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  copy,
  link,
  align = "left",
  className = "",
}: {
  eyebrow: string;
  title: ReactNode;
  copy?: ReactNode;
  link?: { href: string; label: string };
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col gap-8 ${
        align === "center" ? "items-center text-center" : "md:flex-row md:items-end md:justify-between"
      } ${className}`}
    >
      <div className={align === "center" ? "max-w-3xl" : "max-w-2xl"}>
        <Reveal>
          <span className="eyebrow">{eyebrow}</span>
        </Reveal>
        <Reveal variant="mask" delay={0.06}>
          <h2 className="display display-lg mt-5">{title}</h2>
        </Reveal>
        {copy ? (
          <Reveal delay={0.12}>
            <p className={`lede mt-6 ${align === "center" ? "mx-auto" : ""}`}>{copy}</p>
          </Reveal>
        ) : null}
      </div>
      {link ? (
        <Reveal delay={0.16}>
          <Link href={link.href} className="link-underline shrink-0">
            {link.label}
            <span aria-hidden="true">→</span>
          </Link>
        </Reveal>
      ) : null}
    </div>
  );
}
