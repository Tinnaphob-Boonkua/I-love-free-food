"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { DUR, EASE_OUT } from "@/lib/motion";
import { formatDay } from "@/lib/format";
import type { Moment, Occasion, Space } from "@/lib/mock-space";
import { MomentFrame } from "./moment-frame";
import { ChevronLeft, ChevronRight } from "./icons";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function iso(y: number, m: number, d: number): string {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

function initialMonth(moments: Moment[]): { y: number; m: number } {
  const last = moments.at(-1)?.occurredAt;
  if (last) {
    const [y, m] = last.split("-").map(Number);
    return { y, m: m - 1 };
  }
  const now = new Date();
  return { y: now.getFullYear(), m: now.getMonth() };
}

export function Calendar({ space }: { space: Space }) {
  const reduce = useReducedMotion();
  const [view, setView] = useState(() => initialMonth(space.moments));
  const [selected, setSelected] = useState<string | null>(null);

  const momentsByDay = useMemo(() => {
    const map = new Map<string, Moment[]>();
    for (const m of space.moments) {
      const bucket = map.get(m.occurredAt);
      if (bucket) bucket.push(m);
      else map.set(m.occurredAt, [m]);
    }
    return map;
  }, [space.moments]);

  const occasionsByDay = useMemo(() => {
    const map = new Map<string, Occasion[]>();
    for (const o of space.occasions) {
      const bucket = map.get(o.date);
      if (bucket) bucket.push(o);
      else map.set(o.date, [o]);
    }
    return map;
  }, [space.occasions]);

  const daysInMonth = new Date(view.y, view.m + 1, 0).getDate();
  const firstOffset = (new Date(view.y, view.m, 1).getDay() + 6) % 7; // Monday-first
  const cells: (number | null)[] = [
    ...Array(firstOffset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  function step(delta: number) {
    setSelected(null);
    setView((v) => {
      const d = new Date(v.y, v.m + delta, 1);
      return { y: d.getFullYear(), m: d.getMonth() };
    });
  }

  const selectedMoments = selected ? momentsByDay.get(selected) ?? [] : [];
  const selectedOccasions = selected ? occasionsByDay.get(selected) ?? [] : [];

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between">
        <h2 className="display text-2xl text-halide">
          {MONTHS[view.m]} <span className="text-silver/70">{view.y}</span>
        </h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous month"
            className="inline-flex h-10 w-10 items-center justify-center rounded-[12px] border border-silver/30 text-silver transition-colors duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-halide hover:text-halide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-filament focus-visible:ring-offset-2 focus-visible:ring-offset-umbra"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next month"
            className="inline-flex h-10 w-10 items-center justify-center rounded-[12px] border border-silver/30 text-silver transition-colors duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-halide hover:text-halide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-filament focus-visible:ring-offset-2 focus-visible:ring-offset-umbra"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-7 gap-1.5 text-center">
        {WEEKDAYS.map((d) => (
          <div key={d} className="pb-2 text-[0.7rem] tracking-[0.1em] text-silver/50 uppercase">
            {d.slice(0, 1)}
          </div>
        ))}

        <AnimatePresence mode="wait">
          <motion.div
            key={`${view.y}-${view.m}`}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: DUR.panel, ease: EASE_OUT }}
            className="col-span-7 grid grid-cols-7 gap-1.5"
          >
            {cells.map((day, i) => {
              if (day === null) return <div key={`e${i}`} />;
              const key = iso(view.y, view.m, day);
              const hasMoments = momentsByDay.has(key);
              const hasOccasion = occasionsByDay.has(key);
              const isSelected = selected === key;
              const interactive = hasMoments || hasOccasion;

              return (
                <button
                  key={key}
                  type="button"
                  disabled={!interactive}
                  onClick={() => setSelected(key)}
                  aria-label={`${formatDay(key)}${hasMoments ? ", has moments" : ""}${
                    hasOccasion ? ", occasion" : ""
                  }`}
                  className={[
                    "relative flex aspect-square flex-col items-center justify-center rounded-[10px] text-sm transition-colors duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)]",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-filament focus-visible:ring-offset-2 focus-visible:ring-offset-umbra",
                    interactive ? "cursor-pointer text-halide" : "text-silver/35",
                    isSelected
                      ? "bg-filament text-umbra"
                      : hasOccasion
                        ? "border border-filament/60"
                        : hasMoments
                          ? "bg-umbra-2"
                          : "",
                  ].join(" ")}
                >
                  <span className={isSelected ? "font-medium" : "font-light"}>{day}</span>
                  {hasMoments && !isSelected ? (
                    <span className="absolute bottom-1.5 h-1 w-1 rounded-full bg-filament" />
                  ) : null}
                </button>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.72rem] text-silver/60">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-filament" /> a moment
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-[4px] border border-filament/60" /> an occasion
        </span>
      </div>

      <div className="mt-8 min-h-24">
        {selected ? (
          <motion.div
            key={selected}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DUR.panel, ease: EASE_OUT }}
          >
            <p className="text-xs tracking-[0.14em] text-silver/60 uppercase">{formatDay(selected)}</p>

            {selectedOccasions.map((o) => (
              <p key={o.id} className="mt-3 display text-xl text-filament">
                {o.label}
              </p>
            ))}

            {selectedMoments.length > 0 ? (
              <div className="mt-6 flex flex-col gap-10">
                {selectedMoments.map((m) => (
                  <MomentFrame key={m.id} moment={m} rotate="0deg" />
                ))}
              </div>
            ) : selectedOccasions.length === 0 ? (
              <p className="mt-3 text-sm font-light text-silver">Nothing marked on this day.</p>
            ) : null}
          </motion.div>
        ) : (
          <p className="text-sm font-light text-silver/70">
            Select a marked day to read what happened.
          </p>
        )}
      </div>
    </div>
  );
}
