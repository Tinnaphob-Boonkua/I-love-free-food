"use client";

import type { GiftBeat } from "@/lib/gift";
import { EditableLine } from "./editable-line";

const TITLE = {
  sm: "text-2xl md:text-3xl",
  md: "text-3xl md:text-4xl",
  lg: "text-4xl md:text-6xl",
} as const;

/** The words of one chapter. Dates arrive preformatted from buildGift. */
export function BeatText({
  beat,
  size = "md",
  className = "",
}: {
  beat: GiftBeat;
  size?: keyof typeof TITLE;
  className?: string;
}) {
  const meta = [beat.feeling, beat.place].filter(Boolean).join(" · ");

  return (
    <div className={className}>
      <p className="text-sm font-light text-filament">{beat.dateLabel}</p>
      <EditableLine
        as="h2"
        multiline
        value={beat.title}
        className={`display mt-3 max-w-[20ch] text-halide ${TITLE[size]}`}
      />
      <EditableLine
        as="p"
        multiline
        value={beat.body}
        className="mt-5 max-w-[65ch] leading-relaxed font-light text-halide/85"
      />
      {meta ? <p className="mt-4 text-sm font-light text-silver">{meta}</p> : null}
    </div>
  );
}
