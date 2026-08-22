import type { ReactNode } from "react";

export function FilmFrame({
  children,
  rotate = "-1.2deg",
  caption,
}: {
  children: ReactNode;
  rotate?: string;
  caption?: string;
}) {
  return (
    <figure className="max-w-xl" style={{ transform: `rotate(${rotate})` }}>
      <div className="border border-silver/35 bg-umbra-2 p-3 shadow-[0_18px_40px_rgba(0,0,0,0.35)]">
        <div className="min-h-40 bg-umbra text-halide">{children}</div>
      </div>
      {caption ? (
        <figcaption className="mt-3 max-w-[65ch] text-sm font-light text-silver">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
