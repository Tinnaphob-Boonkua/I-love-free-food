"use client";

import { Wordmark } from "@/components/chrome/wordmark";
import { FilmFrame } from "@/components/ui/film-frame";
import type { GiftPayload } from "@/lib/gift";
import { BeatText } from "../beat-text";
import { EditableLine } from "../editable-line";
import { CustomizeHint } from "../gift-chrome";
import { MediaSlot } from "../media-slot";
import { CurtainIn, FrameIn } from "../reveal";

/**
 * Wedding — symmetry, then convergence. Two columns walk down the page
 * and the last chapters come back to one centre line before the finale.
 * Reveal language: a curtain rising off the baseline. Nothing slides sideways.
 * Finale: the lightest of the four. Dark, sparse, two hairlines.
 */
export function WeddingGift({ gift }: { gift: GiftPayload }) {
  const split = Math.max(0, gift.beats.length - 2);
  const lead = gift.beats.slice(0, split);
  const close = gift.beats.slice(split);

  return (
    <>
      <section className="flex min-h-[100svh] flex-col items-center justify-between gap-16 px-6 py-10 text-center md:px-16 md:py-16">
        <div className="opacity-60">
          <Wordmark />
        </div>

        <div className="w-full max-w-3xl">
          <div className="mx-auto h-px w-20 bg-silver/30" />
          <CurtainIn mount className="mt-12">
            <EditableLine
              as="h1"
              multiline
              value={gift.headline}
              className="display mx-auto max-w-[16ch] text-[clamp(2.5rem,7vw,5rem)] leading-[1.02] text-halide"
            />
          </CurtainIn>
          <p className="mt-8 font-light text-silver">{gift.dedication}</p>
          <div className="mx-auto mt-12 h-px w-20 bg-silver/30" />
        </div>

        <p className="text-sm font-light text-silver">
          {gift.names.join(" · ")} · {gift.daysTogether} days before the aisle
        </p>
      </section>

      <section className="px-6 md:px-16">
        <CustomizeHint className="text-center" />

        <div className="mt-20 grid gap-20 md:grid-cols-2 md:gap-x-16 md:gap-y-40">
          {lead.map((beat, i) => (
            <CurtainIn key={beat.id} className={i % 2 === 1 ? "md:mt-32" : undefined}>
              {beat.kind === "text" ? (
                <BeatText beat={beat} />
              ) : (
                <>
                  <FrameIn>
                    <FilmFrame rotate={i % 2 === 0 ? "-1.3deg" : "1.1deg"}>
                      <MediaSlot beat={beat} shape="tall" />
                    </FilmFrame>
                  </FrameIn>
                  <BeatText beat={beat} size="sm" className="mt-8" />
                </>
              )}
            </CurtainIn>
          ))}
        </div>

        <div className="mx-auto mt-40 flex max-w-2xl flex-col gap-24">
          {close.map((beat) => (
            <CurtainIn key={beat.id}>
              {beat.kind === "text" ? null : (
                <FrameIn>
                  <FilmFrame rotate="-0.8deg">
                    <MediaSlot beat={beat} shape="wide" />
                  </FilmFrame>
                </FrameIn>
              )}
              <BeatText beat={beat} className={beat.kind === "text" ? undefined : "mt-8"} />
            </CurtainIn>
          ))}
        </div>
      </section>

      <section className="px-6 py-36 text-center md:px-16 md:py-52">
        <div className="mx-auto h-px w-14 bg-filament/60" />
        <CurtainIn className="mt-14">
          <EditableLine
            as="p"
            multiline
            value={gift.finale}
            className="display mx-auto max-w-[18ch] text-[clamp(2rem,6vw,4rem)] leading-[1.05] text-halide"
          />
        </CurtainIn>
        <div className="mx-auto mt-14 h-px w-14 bg-filament/60" />
        <p className="mt-10 text-sm font-light text-silver">{gift.names.join(" · ")}</p>
      </section>
    </>
  );
}
