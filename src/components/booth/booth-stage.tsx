"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Wordmark } from "@/components/chrome/wordmark";
import { FilmButton } from "@/components/ui/film-button";
import { formatDay, todayIso } from "@/lib/format";
import { DUR, EASE_OUT } from "@/lib/motion";
import { useSpace } from "@/lib/use-space";

/**
 * Staged photobooth. No getUserMedia, no vendor SDK, no permission prompt —
 * see docs/FEASIBILITY.md for the providers that would make it real.
 *
 * The one authored motion moment on this surface is the shutter sequence:
 * count, flash, settle. Everything else holds still.
 */

const ease = [...EASE_OUT] as [number, number, number, number];

type Phase = "idle" | "counting" | "captured";

export function BoothStage() {
  const { add } = useSpace();
  const [phase, setPhase] = useState<Phase>("idle");
  const [count, setCount] = useState(0);
  const [flash, setFlash] = useState(false);
  const [stamp, setStamp] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  function after(ms: number, run: () => void) {
    timers.current.push(window.setTimeout(run, ms));
  }

  function shoot() {
    if (phase === "counting") return;

    timers.current.forEach(clearTimeout);
    timers.current = [];

    setSaved(false);
    setPhase("counting");
    setCount(3);
    after(680, () => setCount(2));
    after(1360, () => setCount(1));
    after(2040, () => {
      const day = todayIso();
      setFlash(true);
      setStamp(formatDay(day));
      setPhase("captured");
      // The toast says it was saved, so it is saved. Shared contract, not studio state.
      add({
        occurredAt: day,
        kind: "photo",
        title: "From the booth",
        body: "Two frames, one moment. Taken while we were not in the same room.",
        feeling: "together",
        place: "Photobooth",
      });
      setSaved(true);
    });
    after(2040 + DUR.sheet * 1000, () => setFlash(false));
    after(7000, () => setSaved(false));
  }

  return (
    <main className="px-6 py-10 md:px-16 md:py-16">
      <Wordmark />

      <div className="mt-20 max-w-3xl">
        <h1 className="display text-[clamp(2.5rem,8vw,5rem)] leading-[0.95] text-halide">
          Two frames. One moment.
        </h1>
        <p className="mt-7 max-w-[62ch] leading-relaxed font-light text-silver">
          Together on one phone, or far apart on two. Tonight the second phone is staged, so what
          you get is the part that matters: the count, the flash, and where the still lands.
        </p>
      </div>

      <div className="relative mt-16">
        <div className="grid gap-6 md:grid-cols-2">
          <BoothFrame label="This phone" phase={phase} stamp={stamp} />
          <BoothFrame label="The other phone" phase={phase} stamp={stamp} dashed waiting />
        </div>

        <AnimatePresence>
          {phase === "counting" && count > 0 ? (
            <motion.p
              key={count}
              aria-live="polite"
              className="display pointer-events-none absolute inset-0 flex items-center justify-center text-[clamp(6rem,22vw,14rem)] leading-none text-filament"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: DUR.panel, ease }}
            >
              {count}
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <FilmButton type="button" onClick={shoot} disabled={phase === "counting"}>
          {phase === "captured" ? "Take another" : "Take the shot"}
        </FilmButton>
        <FilmButton href="/space/demo" tone="ghost">
          Back to the Space
        </FilmButton>
      </div>

      <p className="mt-16 max-w-[65ch] text-sm leading-relaxed font-light text-silver/75">
        The honest version: two cameras on one page is real today — Daily, Whereby, and LiveKit all
        do it. We chose not to put a camera permission prompt between you and the demo. This is the
        next chapter, not tonight&rsquo;s build.
      </p>

      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-40 bg-halide"
        initial={false}
        animate={{ opacity: flash ? 0.85 : 0 }}
        transition={{ duration: flash ? DUR.press : DUR.sheet, ease }}
      />

      <AnimatePresence>
        {saved ? (
          <motion.div
            role="status"
            className="fixed inset-x-6 bottom-6 z-40 mx-auto max-w-sm border border-silver/30 bg-umbra-2 px-5 py-4"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: DUR.sheet, ease }}
          >
            <p className="text-sm text-halide">Saved to MomentUS</p>
            <p className="mt-1 text-xs font-light text-silver">
              It is on the timeline now, dated {stamp}.
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </main>
  );
}

function BoothFrame({
  label,
  phase,
  stamp,
  dashed = false,
  waiting = false,
}: {
  label: string;
  phase: Phase;
  stamp: string | null;
  dashed?: boolean;
  waiting?: boolean;
}) {
  const captured = phase === "captured";

  return (
    <figure
      className={`relative aspect-[3/4] bg-umbra-2 ${
        dashed ? "border border-dashed border-filament/40" : "border border-silver/30"
      }`}
    >
      <CornerMarks />

      <AnimatePresence mode="wait">
        {captured ? (
          <motion.div
            key="still"
            className="absolute inset-3 flex flex-col items-center justify-center gap-6 bg-filament/12"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: DUR.sheet, ease }}
          >
            <span className="h-px w-16 bg-filament/70" />
            <figcaption className="px-4 text-center text-xs font-light text-halide">
              {label} · {stamp}
            </figcaption>
          </motion.div>
        ) : (
          <motion.div
            key="viewfinder"
            className="absolute inset-0 flex flex-col items-center justify-center gap-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DUR.control, ease }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden className="text-silver/45">
              <path d="M12 2v20M2 12h20" stroke="currentColor" strokeWidth="1" />
            </svg>
            <figcaption className="px-4 text-center text-xs font-light text-silver">
              {waiting ? "Waiting for the other phone" : label}
            </figcaption>
          </motion.div>
        )}
      </AnimatePresence>
    </figure>
  );
}

function CornerMarks() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-4 h-[calc(100%-2rem)] w-[calc(100%-2rem)] text-silver/30"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <path
        d="M0 8V0h8M92 0h8v8M100 92v8h-8M8 100H0v-8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
