"use client";

import { Wordmark } from "@/components/chrome/wordmark";
import { FilmFrame } from "@/components/ui/film-frame";
import type { GiftPayload } from "@/lib/gift";
import { BeatText } from "../beat-text";
import { EditableLine } from "../editable-line";
import { CustomizeHint } from "../gift-chrome";
import { MediaSlot } from "../media-slot";
import { FocusIn, FrameIn, WordReveal } from "../reveal";

/**
 * Birthday — a card. A filament band opens it, a filament band closes it,
 * and everything between is a single narrow column you read top to bottom.
 * Reveal language: a focus pull, blur to sharp, like an enlarger finding the print.
 */
export function BirthdayGift({ gift }: { gift: GiftPayload }) {
  return (
    <>
      <section className="bg-filament px-6 py-5 text-umbra md:px-16">
        <p className="text-sm font-light">{gift.dedication}</p>
      </section>

      <section className="flex min-h-[88svh] flex-col justify-between gap-20 px-6 py-10 md:px-16 md:py-16">
        <div className="opacity-60">
          <Wordmark />
        </div>

        <div>
          <FocusIn mount>
            <EditableLine
              as="h1"
              multiline
              value={gift.headline}
              className="display max-w-[12ch] text-[clamp(3rem,9vw,6.5rem)] leading-[0.9] text-halide"
            />
          </FocusIn>
          <p className="mt-8 max-w-[40ch] font-light text-silver">
            {gift.daysTogether} days of it, and almost none of it was posted anywhere.
          </p>
        </div>
      </section>

      <section className="px-6 md:px-16">
        <CustomizeHint className="mx-auto max-w-2xl" />

        <div className="mx-auto mt-16 flex max-w-2xl flex-col gap-24">
          {gift.beats.map((beat, i) =>
            beat.kind === "text" ? (
              <FocusIn key={beat.id}>
                <EditableLine
                  as="p"
                  multiline
                  value={beat.body}
                  className="display text-center text-3xl leading-[1.15] text-halide md:text-4xl"
                />
                <p className="mt-7 text-center text-sm font-light text-filament">{beat.dateLabel}</p>
              </FocusIn>
            ) : (
              <FocusIn key={beat.id}>
                <FrameIn>
                  <FilmFrame rotate={i % 2 === 0 ? "-1.1deg" : "1.3deg"}>
                    <MediaSlot beat={beat} shape={i % 3 === 0 ? "wide" : "tall"} />
                  </FilmFrame>
                </FrameIn>
                <BeatText beat={beat} size="sm" className="mt-8" />
              </FocusIn>
            ),
          )}
        </div>
      </section>

      <section className="px-6 py-28 md:px-16 md:py-40">
        <WordReveal
          text={gift.finale}
          className="display mx-auto max-w-[16ch] text-center text-[clamp(2.25rem,7vw,4.5rem)] leading-[1.02] text-halide"
        />
      </section>

      <section className="bg-filament px-6 py-10 text-umbra md:px-16">
        <p className="flex flex-wrap items-baseline justify-between gap-4">
          <span className="display text-4xl md:text-5xl">{gift.daysTogether} days</span>
          <span className="text-sm font-light">{gift.names.join(" · ")}</span>
        </p>
      </section>
    </>
  );
}
