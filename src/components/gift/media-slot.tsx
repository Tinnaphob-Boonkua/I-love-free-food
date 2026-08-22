"use client";

import { useEffect, useRef, useState } from "react";
import type { GiftBeat } from "@/lib/gift";
import { prepareImage } from "@/lib/media";
import { DUR, EASE_OUT_CSS } from "@/lib/motion";

/**
 * A slot in the gift. Click it and the moment wears your photo instead.
 * Local state only — this exists to prove "you can make it yours", not to persist.
 *
 * Until Lane A lands the contributed photos in `public/`, every beat arrives with
 * `mediaUrl` undefined, so the empty state is the state that has to look authored:
 * an unexposed plate, not a broken image.
 */

const SHAPES = {
  tall: "aspect-[4/5]",
  wide: "aspect-[3/2]",
  square: "aspect-square",
} as const;

const PLATE_LABEL: Record<GiftBeat["kind"], string> = {
  photo: "No photo on this one yet",
  video: "Video",
  voice: "Voice",
  text: "Written down, not photographed",
};

export function MediaSlot({
  beat,
  shape = "tall",
}: {
  beat: GiftBeat;
  shape?: keyof typeof SHAPES;
}) {
  const [src, setSrc] = useState<string | undefined>(beat.mediaUrl);
  const picker = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setSrc(beat.mediaUrl);
  }, [beat.mediaUrl]);

  async function replace(file: File | undefined) {
    if (!file) return;
    try {
      const prepared = await prepareImage(file);
      setError(null);
      setSrc(prepared.dataUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "That photo would not open.");
    }
  }

  const soft = { transitionDuration: `${DUR.control}s`, transitionTimingFunction: EASE_OUT_CSS };

  return (
    <div>
      <div className={`relative w-full ${SHAPES[shape]}`}>
        <button
          type="button"
          onClick={() => picker.current?.click()}
          aria-label={src ? `Use a different photo for ${beat.title}` : `Use your own photo for ${beat.title}`}
          className="group absolute inset-0 block w-full cursor-pointer overflow-hidden focus-visible:outline-none"
        >
          {src ? (
            // eslint-disable-next-line @next/next/no-img-element -- data URLs from prepareImage cannot go through next/image
            <img src={src} alt={beat.title} className="h-full w-full object-cover" />
          ) : (
            <Plate beat={beat} />
          )}

          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 border border-transparent transition-colors group-hover:border-filament/45 group-focus-visible:border-filament/45"
            style={soft}
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 bg-umbra/75 px-3 py-2 text-left text-xs font-light text-filament opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
            style={soft}
          >
            {src ? "Use a different photo" : "Use your own photo"}
          </span>
        </button>

        <input
          ref={picker}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(event) => replace(event.target.files?.[0])}
        />
      </div>

      {error ? (
        <p role="status" className="mt-2 text-xs font-light text-filament">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function Plate({ beat }: { beat: GiftBeat }) {
  return (
    <span className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-filament/5">
      {beat.kind === "voice" ? (
        <Waveform seed={beat.id} />
      ) : beat.kind === "video" ? (
        <PlayMark />
      ) : (
        <CrossHair />
      )}
      <span className="max-w-[22ch] px-4 text-center text-xs font-light text-silver">
        {PLATE_LABEL[beat.kind]}
      </span>
    </span>
  );
}

/** Deterministic so the server and the client draw the same bars. */
function bars(seed: string, count: number): number[] {
  let state = 7;
  for (let i = 0; i < seed.length; i += 1) state = (state * 31 + seed.charCodeAt(i)) % 2147483647;
  return Array.from({ length: count }, () => {
    state = (state * 1103515245 + 12345) % 2147483647;
    return 20 + ((state >> 7) % 78);
  });
}

function Waveform({ seed }: { seed: string }) {
  return (
    <span className="flex h-16 w-2/3 items-center justify-center gap-[3px]">
      {bars(seed, 28).map((height, i) => (
        <span
          key={i}
          className="w-[3px] shrink-0 bg-filament/45"
          style={{ height: `${height}%` }}
        />
      ))}
    </span>
  );
}

function CrossHair() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden className="text-filament/50">
      <path d="M13 2.5v21M2.5 13h21" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function PlayMark() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden className="text-filament/55">
      <path
        d="M11.5 8.5 22 15l-10.5 6.5z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
