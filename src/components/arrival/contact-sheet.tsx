"use client";

import { motion } from "motion/react";
import { FilmFrame } from "@/components/ui/film-frame";
import { frameIn, stagger, inView } from "@/lib/motion";
import { sortMoments } from "@/lib/mock-space";
import type { Moment } from "@/lib/mock-space";
import { formatDay } from "@/lib/format";

const rotations = ["-2.4deg", "1.6deg", "-1deg", "2.2deg", "-1.8deg"];

/**
 * The one authored motion moment for `/`: a contact sheet of real moments
 * assembling as the visitor scrolls to it. Uses frameIn + stagger from
 * @/lib/motion so the timing agrees with every other lane.
 */
export function ContactSheet({ moments }: { moments: Moment[] }) {
  const frames = sortMoments(moments).slice(0, 5);

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={inView}
      variants={stagger}
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {frames.map((moment, i) => (
        <motion.div key={moment.id} variants={frameIn}>
          <FilmFrame
            photo={moment.mediaUrl}
            alt={moment.title}
            rotate={rotations[i % rotations.length]}
            caption={[formatDay(moment.occurredAt), moment.place].filter(Boolean).join(" · ")}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
