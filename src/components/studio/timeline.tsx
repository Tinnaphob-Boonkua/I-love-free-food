"use client";

import { motion, useReducedMotion } from "motion/react";
import { DUR, EASE_OUT, inView } from "@/lib/motion";
import { formatMonth, groupByMonth } from "@/lib/format";
import type { Moment } from "@/lib/mock-space";
import { MomentFrame } from "./moment-frame";

/** Uneven, on purpose. A contact sheet is never a straight grid. */
const ROTATIONS = ["-1.4deg", "1.6deg", "-0.8deg", "1.1deg", "-1.9deg", "0.9deg"];

export function Timeline({ moments }: { moments: Moment[] }) {
  const reduce = useReducedMotion();
  const groups = groupByMonth(moments);

  if (moments.length === 0) {
    return (
      <p className="mt-16 max-w-[60ch] text-sm font-light leading-relaxed text-silver">
        Nothing here yet. Add the first moment and the months will start to fill in.
      </p>
    );
  }

  let seen = 0;

  return (
    <div className="mt-12 overflow-hidden">
      {groups.map(([key, items]) => (
        <section key={key} className="mt-16 first:mt-0">
          <h2 className="display text-sm font-normal tracking-[0.18em] text-silver/70 uppercase">
            {formatMonth(items[0].occurredAt)}
          </h2>

          <div className="mt-8 flex flex-col gap-14">
            {items.map((moment) => {
              const i = seen++;
              const alignRight = i % 2 === 1;
              return (
                <motion.div
                  key={moment.id}
                  initial={reduce ? false : { opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={inView}
                  transition={{ duration: DUR.sheet, ease: EASE_OUT }}
                  className={
                    alignRight
                      ? "flex justify-center md:justify-end"
                      : "flex justify-center md:justify-start"
                  }
                >
                  <MomentFrame moment={moment} rotate={ROTATIONS[i % ROTATIONS.length]} />
                </motion.div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
