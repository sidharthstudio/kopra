"use client";

import { useEffect, useRef } from "react";

/** A warm light that follows the pointer. Desktop / fine-pointer only. */
export default function CursorLight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (reduced || !fine) return;

    let frame = 0;
    let x = window.innerWidth * 0.7;
    let y = window.innerHeight * 0.2;

    function paint() {
      if (ref.current) {
        ref.current.style.transform = `translate3d(${x - 320}px, ${y - 320}px, 0)`;
      }
      frame = 0;
    }

    function onMove(event: PointerEvent) {
      x = event.clientX;
      y = event.clientY;
      if (!frame) frame = requestAnimationFrame(paint);
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[1] hidden h-[640px] w-[640px] rounded-none opacity-60 mix-blend-screen md:block"
      style={{
        background:
          "radial-gradient(circle, rgba(196,62,41,0.16) 0%, rgba(201,154,91,0.08) 35%, transparent 68%)",
        transition: "transform 0.18s ease-out",
      }}
    />
  );
}
