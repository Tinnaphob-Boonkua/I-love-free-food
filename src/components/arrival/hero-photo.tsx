"use client";

import { useState } from "react";

import { demoPhotos } from "@/lib/mock-space";

/**
 * Hero still for the landing frame. Defaults to the Chiang Mai van —
 * the old `/demo/hero.jpg` path never existed.
 */
export function HeroPhoto({
  src = demoPhotos.story.orangeVan,
  alt,
}: {
  src?: string;
  alt: string;
}) {
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
