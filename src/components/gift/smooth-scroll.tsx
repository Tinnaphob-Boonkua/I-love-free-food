"use client";

import { useEffect } from "react";
import type Lenis from "lenis";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Lenis, gift pages only. A visitor who asked for less motion gets the
 * browser's own scroll and never loads the library at all.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    let instance: Lenis | null = null;
    let frame = 0;
    let cancelled = false;

    void import("lenis").then(({ default: LenisCtor }) => {
      if (cancelled) return;
      instance = new LenisCtor({
        duration: 1.1,
        // ease-out cubic. Entrances never ease in, and neither does the page.
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
      });
      const tick = (time: number) => {
        instance?.raf(time);
        frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      instance?.destroy();
    };
  }, []);

  return null;
}
