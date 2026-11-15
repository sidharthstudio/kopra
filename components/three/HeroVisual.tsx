"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

function GlassFallback() {
  return (
    <svg
      viewBox="0 0 420 480"
      className="h-full w-full"
      role="img"
      aria-label="Illustration of a non-alcoholic cocktail in a coupe glass"
    >
      <defs>
        <radialGradient id="glow" cx="50%" cy="42%" r="55%">
          <stop offset="0%" stopColor="#c43e29" stopOpacity="0.55" />
          <stop offset="70%" stopColor="#c43e29" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#c43e29" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="liquid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e4783f" />
          <stop offset="55%" stopColor="#c04227" />
          <stop offset="100%" stopColor="#8d2b1d" />
        </linearGradient>
        <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff6e6" stopOpacity="0.85" />
          <stop offset="45%" stopColor="#f7f1e7" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#e0bd8b" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="leaf" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a3b78a" />
          <stop offset="100%" stopColor="#66794f" />
        </linearGradient>
      </defs>

      <ellipse cx="210" cy="300" rx="180" ry="120" fill="url(#glow)" />
      <circle cx="210" cy="210" r="132" fill="none" stroke="#c99a5b" strokeOpacity="0.35" strokeWidth="1" />

      {/* glass shell */}
      <path
        d="M120 132 L300 132 Q298 226 210 268 Q122 226 120 132 Z"
        fill="url(#glass)"
        stroke="rgba(255,246,230,0.65)"
        strokeWidth="2"
      />
      {/* liquid */}
      <path d="M139 178 Q210 200 281 178 Q276 236 210 264 Q144 236 139 178 Z" fill="url(#liquid)" />
      <ellipse cx="210" cy="178" rx="71" ry="12" fill="#e4783f" opacity="0.9" />
      {/* stem + foot */}
      <rect x="204" y="264" width="12" height="86" fill="url(#glass)" stroke="rgba(255,246,230,0.4)" strokeWidth="1" />
      <ellipse cx="210" cy="368" rx="72" ry="14" fill="url(#glass)" stroke="rgba(255,246,230,0.5)" strokeWidth="1.5" />
      <ellipse cx="210" cy="366" rx="56" ry="9" fill="none" stroke="rgba(224,189,139,0.5)" strokeWidth="1" />

      {/* citrus wheel */}
      <g transform="translate(292 150) rotate(18)">
        <circle r="34" fill="#e0812c" />
        <circle r="28" fill="#f6b54a" />
        <circle r="28" fill="none" stroke="#fbe9d0" strokeWidth="1.4" />
        {Array.from({ length: 9 }).map((_, index) => (
          <line
            key={index}
            x1="0"
            y1="0"
            x2={Math.cos((index / 9) * Math.PI * 2) * 27}
            y2={Math.sin((index / 9) * Math.PI * 2) * 27}
            stroke="#fbe2bd"
            strokeWidth="2"
          />
        ))}
      </g>

      {/* mint */}
      <g transform="translate(150 138) rotate(-24)">
        <path d="M0 0 C22 -6 44 -24 40 -46 C18 -44 -2 -24 0 0 Z" fill="url(#leaf)" />
        <path d="M0 0 C18 -8 30 -22 38 -42" stroke="#e9f0dc" strokeOpacity="0.4" strokeWidth="1" fill="none" />
      </g>
      <g transform="translate(170 128) rotate(12) scale(0.7)">
        <path d="M0 0 C22 -6 44 -24 40 -46 C18 -44 -2 -24 0 0 Z" fill="url(#leaf)" />
      </g>

      {/* ice */}
      <rect x="168" y="196" width="34" height="30" rx="6" transform="rotate(-16 185 211)" fill="#f2f8f6" opacity="0.35" stroke="#ffffff" strokeOpacity="0.5" />
      <rect x="212" y="212" width="28" height="26" rx="5" transform="rotate(22 226 225)" fill="#f2f8f6" opacity="0.3" stroke="#ffffff" strokeOpacity="0.45" />
    </svg>
  );
}

export default function HeroVisual({ still = false }: { still?: boolean }) {
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(false);
  const [webgl, setWebgl] = useState(false);
  const [software, setSoftware] = useState(false);
  const [forced, setForced] = useState(false);

  useEffect(() => {
    let supported = false;
    let softwareRenderer = false;
    try {
      const canvas = document.createElement("canvas");
      const gl = (canvas.getContext("webgl2") ??
        canvas.getContext("webgl")) as WebGLRenderingContext | null;
      supported = Boolean(gl);
      if (gl) {
        const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
        const renderer = debugInfo
          ? String(gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) ?? "")
          : "";
        // Software rasterisers (SwiftShader, llvmpipe, VMs without a GPU) cannot
        // sustain this scene; show the CSS/SVG glass instead of dropping frames.
        softwareRenderer = /swiftshader|llvmpipe|software|basic render|mesa offscreen/i.test(renderer);
      }
    } catch {
      supported = false;
    }

    const forceScene = new URLSearchParams(window.location.search).has("still");
    setWebgl(supported);
    setSoftware(softwareRenderer);
    setForced(forceScene);
    const timer = window.setTimeout(() => setReady(true), 240);
    return () => window.clearTimeout(timer);
  }, []);

  const showScene = webgl && ready && (!software || forced);

  return (
    <div className="relative h-full w-full">
      {!showScene ? (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <GlassFallback />
        </div>
      ) : null}
      {showScene ? (
        <div className="absolute inset-0" aria-hidden="true">
          <HeroScene still={still || Boolean(reduced) || forced} />
        </div>
      ) : null}
    </div>
  );
}
