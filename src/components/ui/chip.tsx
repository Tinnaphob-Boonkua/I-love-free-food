import type { ReactNode } from "react";

/**
 * SHARED CONTRACT — Lane A owns this file.
 * The small label: a feeling, a place, a reminder, a filter.
 *
 * Pills are the one place DESIGN.md allows a full radius. A chip is never the
 * primary action on a surface — if it needs to be pressed hard, use FilmButton.
 */
const tones = {
  /** Default. A quiet fact about a moment. */
  quiet: "border-silver/30 text-silver",
  /** An occasion or a reminder. Sparing — filament should own regions, not dots. */
  filament: "border-filament/50 text-filament",
  /** Currently applied filter or selected option. */
  active: "border-transparent bg-filament text-umbra",
} as const;

type Props = {
  children: ReactNode;
  tone?: keyof typeof tones;
  /** Renders a real button with press feedback. Omit for a plain label. */
  onClick?: () => void;
  pressed?: boolean;
  className?: string;
};

export function Chip({ children, tone = "quiet", onClick, pressed, className = "" }: Props) {
  const classes = [
    "inline-flex items-center gap-1.5 rounded-full border px-3 py-1",
    "text-xs font-light tracking-[0.04em] whitespace-nowrap",
    tones[tone],
    className,
  ].join(" ");

  if (!onClick) {
    return <span className={classes}>{children}</span>;
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={pressed}
      className={`${classes} transition-[transform,border-color,background-color,color] duration-control ease-out hover:border-halide hover:text-halide active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-filament`}
    >
      {children}
    </button>
  );
}
