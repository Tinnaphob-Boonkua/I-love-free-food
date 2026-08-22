"use client";

import { useEffect, useState } from "react";
import { ReactLenis } from "lenis/react";
import { prefersReducedMotion } from "@/lib/motion";

/** Lenis smooth scroll for the landing page only. Off under prefers-reduced-motion. */
export function SmoothScroll() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(!prefersReducedMotion());
  }, []);

  if (!enabled) return null;
  return <ReactLenis root options={{ lerp: 0.1, duration: 1.1 }} />;
}
