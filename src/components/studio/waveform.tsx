/**
 * A static waveform for voice moments. No real audio this round.
 * Bar heights are derived deterministically from the moment id so the
 * server and client render the same thing (no hydration drift, no Math.random).
 */
function bars(seed: string, count: number): number[] {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const out: number[] = [];
  for (let i = 0; i < count; i++) {
    h = (h * 1103515245 + 12345) & 0x7fffffff;
    // 0.28..1 — never flat, never full, reads like a real clip
    out.push(0.28 + (h % 1000) / 1000 * 0.72);
  }
  return out;
}

export function Waveform({ seed, count = 44 }: { seed: string; count?: number }) {
  const heights = bars(seed, count);
  return (
    <div className="flex h-full w-full items-center gap-[3px]" aria-hidden="true">
      {heights.map((v, i) => (
        <span
          key={i}
          className="flex-1 rounded-full bg-filament/70"
          style={{ height: `${Math.round(v * 100)}%` }}
        />
      ))}
    </div>
  );
}
