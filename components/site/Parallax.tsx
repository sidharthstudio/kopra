"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

export default function Parallax({
  children,
  distance = 60,
  className,
}: {
  children: React.ReactNode;
  distance?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.04, 1, 1.04]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={reduced ? undefined : { y, scale }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}
