"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  variant?: "up" | "mask" | "fade";
  as?: "div" | "span" | "li" | "section";
};

/**
 * Reveals content on scroll, but never hides it indefinitely: if the
 * IntersectionObserver never fires (headless capture, embedded viewers,
 * unusual scroll containers) a timer reveals everything after a moment.
 */
export default function Reveal({ children, delay = 0, className, variant = "up", as = "div" }: RevealProps) {
  const reduced = useReducedMotion();
  const [forced, setForced] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setForced(true), 1400);
    return () => window.clearTimeout(timer);
  }, []);

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const MotionTag = motion[as];
  const transition = { duration: variant === "mask" ? 1.05 : 0.85, delay, ease: [0.22, 1, 0.36, 1] as const };

  if (variant === "mask") {
    return (
      <MotionTag
        className={className}
        initial={{ clipPath: "inset(0 0 100% 0)", y: 18 }}
        animate={forced ? { clipPath: "inset(0 0 0% 0)", y: 0 } : undefined}
        whileInView={{ clipPath: "inset(0 0 0% 0)", y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={transition}
      >
        {children}
      </MotionTag>
    );
  }

  const hidden = variant === "fade" ? { opacity: 0 } : { opacity: 0, y: 26 };
  const shown = variant === "fade" ? { opacity: 1 } : { opacity: 1, y: 0 };

  return (
    <MotionTag
      className={className}
      initial={hidden}
      animate={forced ? shown : undefined}
      whileInView={shown}
      viewport={{ once: true, margin: "-70px" }}
      transition={transition}
    >
      {children}
    </MotionTag>
  );
}
