"use client";

import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

/**
 * The only button language in MomentUS.
 * Timing comes from DESIGN.md: DUR.press (120ms), EASE_OUT, active scale 0.97.
 */
const base = [
  "inline-flex items-center justify-center rounded-[14px] px-5 py-3",
  "text-sm font-medium",
  "transition-[transform,background-color,border-color,color]",
  "duration-[120ms] ease-[cubic-bezier(0.23,1,0.32,1)]",
  "active:scale-[0.97]",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-filament focus-visible:ring-offset-2 focus-visible:ring-offset-umbra",
  "disabled:pointer-events-none disabled:opacity-45",
].join(" ");

const tones = {
  filament: "bg-filament text-umbra hover:bg-filament-hot",
  ghost: "border border-silver/40 bg-transparent text-halide hover:border-halide",
} as const;

type Props = {
  children: ReactNode;
  href?: string;
  tone?: keyof typeof tones;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function FilmButton({ children, href, tone = "filament", className = "", ...rest }: Props) {
  const classes = `${base} ${tones[tone]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
