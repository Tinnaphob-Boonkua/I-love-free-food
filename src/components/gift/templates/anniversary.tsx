"use client";

import { Wordmark } from "@/components/chrome/wordmark";
import { FilmFrame } from "@/components/ui/film-frame";
import type { GiftPayload } from "@/lib/gift";
import { BeatText } from "../beat-text";
import { EditableLine } from "../editable-line";
import { CustomizeHint } from "../gift-chrome";
import { MediaSlot } from "../media-slot";
import { FrameIn, WipeIn } from "../reveal";

/**
 * Anniversary — a contact sheet read left to right.
 * First viewport: the day count is the largest thing on the page.
 * Reveal language: a horizontal wipe that follows the side each chapter sits on.
 * Finale: filament owns the whole viewport. The heaviest ending of the four.
 */
export function AnniversaryGift({ gift }: { gift: GiftPayload }) {
  return (
    <>
      <section className="flex min-h-[100svh] flex-col justify-between gap-20 px-6 py-10 md:px-16 md:py-16">
        <div className="opacity-60">
          <Wordmark />
        </div>

        <div>
          <WipeIn mount>
            <EditableLine
              as="h1"
              multiline
              value={gift.headline}
              className="display max-w-[13ch] text-[clamp(3rem,10vw,7rem)] leading-[0.88] text-halide"
            />
          </WipeIn>
          <p className="mt-8 font-light text-silver">{gift.dedication}</p>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-8">
          <p className="flex items-baseline gap-4">
            <span className="display text-[clamp(3.5rem,12vw,7rem)] leading-none text-filament">
              {gift.daysTogether}
            </span>
            <span className="max-w-[11ch] text-sm font-light text-silver">days, kept in order</span>
          </p>
          <p className="text-sm font-light text-silver">{gift.names.join(" · ")}</p>
        </div>
      </section>

      <section className="px-6 md:px-16">
        <CustomizeHint />

        <div className="mt-20 flex flex-col gap-28 md:gap-44">
          {gift.beats.map((beat, i) => {
            const right = i % 2 === 1;
            const from = right ? "right" : "left";

            if (beat.kind === "text") {
              return (
                <WipeIn key={beat.id} from={from} className="mx-auto w-full max-w-3xl">
                  <BeatText beat={beat} size="lg" />
                </WipeIn>
              );
            }

            return (
              <div key={beat.id} className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
                <FrameIn className={right ? "md:order-2" : undefined}>
                  <FilmFrame rotate={right ? "1.4deg" : "-1.6deg"}>
                    <WipeIn from={from}>
                      <MediaSlot beat={beat} shape="tall" />
                    </WipeIn>
                  </FilmFrame>
                </FrameIn>

                <WipeIn from={from} className={right ? "md:order-1" : undefined}>
                  <BeatText beat={beat} />
                </WipeIn>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-32 bg-filament px-6 py-28 text-umbra md:px-16 md:py-40">
        <WipeIn>
          <EditableLine
            as="p"
            multiline
            tone="dark"
            value={gift.finale}
            className="display max-w-[15ch] text-[clamp(2.5rem,8vw,5.5rem)] leading-[0.95]"
          />
        </WipeIn>
        <p className="mt-14 text-sm font-light">
          {gift.names.join(" · ")} · {gift.daysTogether} days
        </p>
      </section>
    </>
  );
}
