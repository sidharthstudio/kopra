"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { BUSINESS, NAV_LINKS, WHATSAPP_URL } from "@/lib/business";
import Wordmark from "./Wordmark";

export default function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header className="nav-shell" data-scrolled={scrolled || open}>
        <motion.div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[2px] origin-left bg-[var(--scarlet)]"
          style={{ scaleX: progress }}
        />
        <div className="container-x flex items-center justify-between gap-6 py-4">
          <Link href="/" aria-label="KOPRA — home" className="relative z-10 shrink-0">
            <Wordmark />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative font-mono text-[0.66rem] font-medium uppercase tracking-[0.14em] transition-colors duration-300 hover:text-brass ${
                    active ? "text-brass" : "text-ivory/70"
                  }`}
                >
                  {link.label}
                  {active ? (
                    <span className="absolute -bottom-2 left-0 h-[2px] w-full bg-[var(--scarlet)]" aria-hidden="true" />
                  ) : null}
                </Link>
              );
            })}
          </nav>

          <div className="relative z-10 flex items-center gap-2 sm:gap-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-ivory/70 transition-colors hover:text-brass xl:inline"
            >
              WhatsApp
            </a>
            <Link href="/reservations" className="btn btn-primary btn-sm hidden sm:inline-flex">
              Reserve
            </Link>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] border border-[var(--line)] lg:hidden"
            >
              <span
                className={`h-[1.5px] w-5 bg-[var(--ivory)] transition-transform duration-300 ${
                  open ? "translate-y-[6.5px] rotate-45" : ""
                }`}
              />
              <span className={`h-[1.5px] w-5 bg-[var(--ivory)] transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
              <span
                className={`h-[1.5px] w-5 bg-[var(--ivory)] transition-transform duration-300 ${
                  open ? "-translate-y-[6.5px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-[#0b0b0a] px-6 pb-10 pt-28 lg:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-col">
              {[{ href: "/", label: "Home" }, ...NAV_LINKS, { href: "/faq", label: "FAQ" }].map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + index * 0.045, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="border-b border-[var(--line)]"
                >
                  <Link
                    href={link.href}
                    className="flex items-center justify-between py-4 font-display text-3xl font-extrabold tracking-[-0.03em] text-ivory"
                  >
                    {link.label}
                    <span className="text-sm text-brass">↗</span>
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="mt-8 grid gap-3">
              <Link href="/reservations" className="btn btn-primary w-full">
                Reserve a table
              </Link>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ghost w-full">
                WhatsApp the bar
              </a>
            </div>
            <div className="mt-auto pt-10 text-[0.78rem] leading-relaxed text-muted">
              <p>{BUSINESS.address.line1}</p>
              <p>{BUSINESS.address.line2}</p>
              <p>{BUSINESS.address.city} {BUSINESS.address.postalCode}</p>
              <a href={`tel:${BUSINESS.phoneRaw}`} className="mt-3 inline-block text-brass-soft">
                {BUSINESS.phone}
              </a>
              <p className="mt-1">{BUSINESS.hours.display}</p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
