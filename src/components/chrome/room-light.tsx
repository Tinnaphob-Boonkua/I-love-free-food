/**
 * SHARED CONTRACT — Lane A owns this file. Already mounted in layout.tsx;
 * never mount a second one.
 *
 * The page should read as a lit surface rather than a flat screen: one warm
 * source above, and the room falling off at the edges. Deliberately not an SVG
 * noise overlay — feTurbulence grain is banned in DESIGN.md — and deliberately
 * static, so there is nothing here for reduced motion to switch off.
 */
export function RoomLight() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-50">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 70% at 50% -10%, color-mix(in oklab, var(--filament) 12%, transparent), transparent 60%)",
        }}
      />
      <div className="absolute inset-0 shadow-[inset_0_0_160px_rgba(0,0,0,0.55)]" />
    </div>
  );
}
