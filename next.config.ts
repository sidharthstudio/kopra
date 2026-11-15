import type { NextConfig } from "next";

/**
 * Preview/dev hostnames are read from the environment so the Cloud preview
 * origin can change between sessions without editing tracked files.
 */
const devOrigins = (process.env.NEXT_ALLOWED_DEV_ORIGINS ?? "")
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
    ],
    formats: ["image/avif", "image/webp"],
  },
  allowedDevOrigins: [
    "localhost",
    "127.0.0.1",
    "pv-234ff34787f3-c31bb942-f191-488c-8474-de2641fa5073.style.dev",
    ...devOrigins,
  ],
  experimental: {
    optimizePackageImports: ["framer-motion", "@react-three/drei"],
  },
};

export default nextConfig;
