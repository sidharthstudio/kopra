"use client";

import { useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * CSS 3D tilt with a mouse-following highlight. Used for menu and event cards
 * so the 3D language carries beyond the WebGL hero without a second canvas.
 */
export default function TiltCard({
  children,
  className = "",
  intensity = 8,
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [glow, setGlow] = useState({ x: 50, y: 50, active: false });
  const reduced = useReducedMotion();

  function handleMove(event: React.MouseEvent<HTMLDivElement>) {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    setStyle({
      transform: `perspective(1100px) rotateX(${(0.5 - py) * intensity}deg) rotateY(${
        (px - 0.5) * intensity
      }deg) translateZ(0)`,
    });
    setGlow({ x: px * 100, y: py * 100, active: true });
  }

  function handleLeave() {
    setStyle({ transform: "perspective(1100px) rotateX(0deg) rotateY(0deg)" });
    setGlow((current) => ({ ...current, active: false }));
  }

  return (
    <div ref={ref} className="tilt-scene" onMouseMove={handleMove} onMouseLeave={handleLeave}>
      <div className={`tilt-card relative ${className}`} style={style}>
        {children}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-500"
          style={{
            opacity: glow.active ? 1 : 0,
            background: `radial-gradient(420px circle at ${glow.x}% ${glow.y}%, rgba(201,154,91,0.18), transparent 65%)`,
          }}
        />
      </div>
    </div>
  );
}
