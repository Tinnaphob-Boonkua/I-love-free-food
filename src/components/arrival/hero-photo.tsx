"use client";

import { useState } from "react";

/**
 * Slot for a real hero photo. Drop a file at `public/demo/hero.jpg` (or
 * change `src` below) and it appears automatically. Until that file
 * exists this quietly renders nothing, so the frame's fallback content
 * shows through underneath — no code change needed either way.
 */
export function HeroPhoto({ src = "/demo/hero.jpg", alt }: { src?: string; alt: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element -- existence isn't known at build time
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
}
