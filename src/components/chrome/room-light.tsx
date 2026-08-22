/**
 * Room light. A vignette that makes the page feel like a lit surface
 * rather than a flat screen. Deliberately not an SVG noise overlay —
 * feTurbulence grain is banned in DESIGN.md.
 */
export function RoomLight() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-50 shadow-[inset_0_0_160px_rgba(0,0,0,0.55)]"
    />
  );
}
