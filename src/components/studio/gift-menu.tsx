"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { DUR, EASE_OUT } from "@/lib/motion";
import { giftHref, type GiftKind } from "@/lib/gift";
import { GiftIcon } from "./icons";

const OPTIONS: { kind: GiftKind; label: string; note: string }[] = [
  { kind: "anniversary", label: "Anniversary", note: "A year measured in tables" },
  { kind: "birthday", label: "Birthday", note: "The year we kept for you" },
  { kind: "wedding", label: "Wedding", note: "How we sat together" },
  { kind: "thankyou", label: "Thank-you", note: "Things we never said out loud" },
];

/** Lane C only hands off a URL. Lane D renders the gift. */
export function GiftMenu() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("mousedown", onClick);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onClick);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="inline-flex items-center gap-2 rounded-[14px] border border-silver/40 bg-transparent px-5 py-3 text-sm font-medium text-halide transition-colors duration-[120ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-halide active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-filament focus-visible:ring-offset-2 focus-visible:ring-offset-umbra"
      >
        <GiftIcon className="h-4 w-4 text-filament" />
        Read as a gift
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            role="menu"
            initial={reduce ? false : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: DUR.panel, ease: EASE_OUT }}
            className="absolute right-0 z-40 mt-2 w-64 overflow-hidden rounded-[14px] border border-silver/20 bg-umbra-2 p-1.5 shadow-[0_18px_40px_rgba(0,0,0,0.35)]"
          >
            {OPTIONS.map(({ kind, label, note }) => (
              <a
                key={kind}
                role="menuitem"
                href={giftHref(kind)}
                className="block rounded-[10px] px-3 py-2.5 transition-colors duration-[120ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-filament/10 focus-visible:bg-filament/10 focus-visible:outline-none"
              >
                <span className="block text-sm text-halide">{label}</span>
                <span className="mt-0.5 block text-xs font-light text-silver/70">{note}</span>
              </a>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
