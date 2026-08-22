"use client";

import Link from "next/link";
import { FilmButton } from "@/components/ui/film-button";
import { giftHref, giftKinds, type GiftKind, type GiftPayload } from "@/lib/gift";
import { DUR, EASE_OUT_CSS } from "@/lib/motion";

const READING: Record<GiftKind, string> = {
  birthday: "a birthday",
  anniversary: "an anniversary",
  wedding: "a wedding",
  thankyou: "a thank-you",
};

/** Said once per page, quietly. The interface recedes; it does not disappear. */
export function CustomizeHint({ className = "" }: { className?: string }) {
  return (
    <p className={`text-sm font-light text-silver/75 ${className}`}>
      Tap any photo to use your own. Tap any line to change the words.
    </p>
  );
}

export function GiftFooter({ gift }: { gift: GiftPayload }) {
  const others = giftKinds.filter((kind) => kind !== gift.kind);

  return (
    <footer className="px-6 pt-24 pb-16 md:px-16">
      <div className="h-px w-full bg-silver/20" />

      <p className="mt-8 text-sm font-light text-silver">
        Read from {gift.spaceTitle} · {gift.names.join(", ")} · {gift.daysTogether} days
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
        <FilmButton href="/space/demo" tone="ghost">
          Back to the Space
        </FilmButton>

        {others.map((kind) => (
          <Link
            key={kind}
            href={giftHref(kind)}
            className="text-sm font-light text-silver underline-offset-4 transition-colors hover:text-filament hover:underline"
            style={{ transitionDuration: `${DUR.control}s`, transitionTimingFunction: EASE_OUT_CSS }}
          >
            Read the same year as {READING[kind]}
          </Link>
        ))}
      </div>

      <p className="mt-10 max-w-[65ch] text-xs font-light text-silver/70">
        Four readings, one Space. Nothing here was written twice.
      </p>
    </footer>
  );
}
