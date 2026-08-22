import Image from "next/image";
import type { ReactNode } from "react";

type Props = {
  /** Image path under /public, or a data:/blob: URL from prepareImage. */
  photo?: string;
  /** Required whenever `photo` is set. */
  alt?: string;
  children?: ReactNode;
  rotate?: string;
  caption?: string;
  aspect?: "square" | "portrait" | "landscape";
  priority?: boolean;
  className?: string;
};

const aspects = {
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
} as const;

function isRuntimeSrc(src: string): boolean {
  return src.startsWith("data:") || src.startsWith("blob:");
}

/**
 * A photograph on a contact sheet.
 * Shadow sits on the figure; border sits on the plate — never both on one element.
 * `photo` is always a still. Runtime data URLs use <img>; public paths use next/image.
 */
export function FilmFrame({
  photo,
  alt,
  children,
  rotate = "-1.2deg",
  caption,
  aspect = "landscape",
  priority = false,
  className = "",
}: Props) {
  return (
    <figure className={`max-w-xl shadow-frame ${className}`} style={{ transform: `rotate(${rotate})` }}>
      <div className="border border-silver/35 bg-umbra-2 p-3">
        <div
          className={`relative overflow-hidden bg-umbra text-halide ${photo ? aspects[aspect] : "min-h-40"}`}
        >
          {photo ? (
            isRuntimeSrc(photo) ? (
              // eslint-disable-next-line @next/next/no-img-element -- data/blob URLs cannot go through next/image
              <img src={photo} alt={alt ?? ""} className="absolute inset-0 h-full w-full object-cover" />
            ) : (
              <Image
                src={photo}
                alt={alt ?? ""}
                fill
                sizes="(max-width: 768px) 100vw, 36rem"
                className="object-cover"
                priority={priority}
              />
            )
          ) : (
            children
          )}
        </div>
      </div>
      {caption ? (
        <figcaption className="mt-3 max-w-[65ch] text-sm font-light text-silver">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
