"use client";

import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

/**
 * The only button language in MomentUS.
 * Timing comes from the tokens: duration-press, ease-out (our curve).
 */
const base = [
  "inline-flex items-center justify-center rounded-control px-5 py-3",
  "text-sm font-medium",
  "transition-[transform,background-color,border-color,color,opacity]",
  "duration-press ease-out",
  "active:scale-[0.97]",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-filament",
  "focus-visible:ring-offset-2 focus-visible:ring-offset-umbra",
].join(" ");

const tones = {
  filament: "bg-filament text-umbra hover:bg-filament-hot",
  ghost: "border border-silver/40 bg-transparent text-halide hover:border-halide",
} as const;

/** A link cannot be :disabled, so the state is expressed for real. */
const disabledLink = "pointer-events-none opacity-45";
const disabledButton = "disabled:pointer-events-none disabled:opacity-45";

type Props = {
  children: ReactNode;
  href?: string;
  tone?: keyof typeof tones;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function FilmButton({
  children,
  href,
  tone = "filament",
  className = "",
  disabled = false,
  ...rest
}: Props) {
  if (href) {
    return (
      <Link
        href={href}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
        className={`${base} ${tones[tone]} ${disabled ? disabledLink : ""} ${className}`}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      disabled={disabled}
      className={`${base} ${tones[tone]} ${disabledButton} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
