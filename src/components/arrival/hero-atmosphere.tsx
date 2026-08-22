"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Decorative warm-light/dust field behind the hero. CSS/transform only —
 * the R3F budget (DESIGN.md) went to the gift finale instead, so this is
 * the "must degrade to a CSS gradient" fallback, used as the primary look.
 * Ambient loop durations are intentionally not DUR tokens: DUR covers UI
 * feedback timing, not a continuous background drift.
 */
export function HeroAtmosphere() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(!prefersReducedMotion());
  }, []);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute -left-1/4 top-[-12%] h-[36rem] w-[36rem] rounded-full bg-filament/20 blur-3xl"
        animate={animate ? { x: [0, 40, 0], y: [0, 26, 0] } : undefined}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-12%] top-1/3 h-[30rem] w-[30rem] rounded-full bg-filament-hot/10 blur-3xl"
        animate={animate ? { x: [0, -32, 0], y: [0, -20, 0] } : undefined}
        transition={{ duration: 27, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-umbra" />
    </div>
  );
}
