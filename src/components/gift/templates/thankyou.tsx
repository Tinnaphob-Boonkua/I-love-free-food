"use client";

import { Wordmark } from "@/components/chrome/wordmark";
import { FilmFrame } from "@/components/ui/film-frame";
import type { GiftPayload } from "@/lib/gift";
import { EditableLine } from "../editable-line";
import { CustomizeHint } from "../gift-chrome";
import { MediaSlot } from "../media-slot";
import { FrameIn, LetterIn } from "../reveal";

/**
 * Thank-you — a letter, not a film. One measure, one column, no frames until
 * the last chapter. Reveal language: a line settling into place, nothing more.
 */
export function ThankYouGift({ gift }: { gift: GiftPayload }) {
  const last = gift.beats.at(-1);

  return (
    <>
      <section className="px-6 py-10 md:px-16 md:py-16">
        <div className="opacity-60">
          <Wordmark />
        </div>

        <div className="mx-auto mt-32 max-w-[62ch]">
          <LetterIn mount>
            <EditableLine
              as="h1"
              multiline
              value={gift.headline}
              className="display text-[clamp(2.25rem,6vw,4rem)] leading-[1.05] text-halide"
            />
          </LetterIn>
          <p className="mt-7 font-light text-silver">{gift.dedication}</p>
        </div>
      </section>

      <section className="px-6 md:px-16">
        <CustomizeHint className="mx-auto max-w-[62ch]" />

        <div className="mx-auto mt-14 flex max-w-[62ch] flex-col gap-16">
          {gift.beats.map((beat) => (
            <LetterIn key={beat.id}>
              <p className="text-sm font-light text-filament">{beat.dateLabel}</p>
              <EditableLine
                as="h2"
                multiline
                value={beat.title}
                className="display mt-3 text-2xl text-halide md:text-3xl"
              />
              <EditableLine
                as="p"
                multiline
                value={beat.body}
                className="mt-4 leading-relaxed font-light text-halide/85"
              />
            </LetterIn>
          ))}

          {last && last.kind !== "text" ? (
            <FrameIn>
              <FilmFrame rotate="1.1deg">
                <MediaSlot beat={last} shape="wide" />
              </FilmFrame>
            </FrameIn>
          ) : null}
        </div>
      </section>

      <section className="px-6 py-28 md:px-16 md:py-40">
        <div className="mx-auto max-w-[62ch]">
          <LetterIn>
            <EditableLine
              as="p"
              multiline
              value={gift.finale}
              className="display text-[clamp(1.75rem,5vw,3rem)] leading-[1.1] text-filament"
            />
          </LetterIn>
          <p className="mt-10 text-sm font-light text-silver">
            {gift.names.join(" · ")} · {gift.daysTogether} days
          </p>
        </div>
      </section>
    </>
  );
}
