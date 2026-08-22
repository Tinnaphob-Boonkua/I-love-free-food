/**
 * SHARED CONTRACT — Lane A owns this file.
 * Every animated element in every lane uses these values.
 * Hand-written durations or easings are a review failure: the four lanes
 * must feel like one product, and that only happens if the timing agrees.
 *
 * Rules encoded here (emil-design-eng):
 *  - ease-out for entrances and exits, never ease-in
 *  - UI motion stays under 300ms
 *  - never animate from scale(0); 0.96 is the floor
 *  - transform and opacity only for UI; story surfaces may add clip-path/blur
 */

/** cubic-bezier(0.23, 1, 0.32, 1) — the only UI easing. */
export const EASE_OUT = [0.23, 1, 0.32, 1] as const;
/** For elements moving across the screen rather than entering/leaving. */
export const EASE_IN_OUT = [0.77, 0, 0.175, 1] as const;

export const EASE_OUT_CSS = "cubic-bezier(0.23, 1, 0.32, 1)";

/** Seconds, for `motion`. Multiply by 1000 for CSS. */
export const DUR = {
  /** Button press, checkbox, icon swap. */
  press: 0.12,
  /** Tooltip, chip, inline control. */
  control: 0.18,
  /** Dropdown, popover, tab change. */
  panel: 0.22,
  /** Sheet, drawer, modal. Ceiling for anything in the studio. */
  sheet: 0.3,
  /** Story beats on landing and gift only. Never in the studio. */
  story: 0.9,
} as const;

/** Delay between siblings in a stagger. Keep small; long cascades read as slow. */
export const STAGGER = 0.06;

/** Standard entrance for content blocks. Starts visible-ish, never from nothing. */
export const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.sheet, ease: EASE_OUT },
  },
} as const;

/** Film frames arriving on a contact sheet. Story surfaces. */
export const frameIn = {
  hidden: { opacity: 0, y: 34, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: DUR.story, ease: EASE_OUT },
  },
} as const;

/** Parent wrapper for either variant above. */
export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: STAGGER } },
} as const;

/** Scroll-reveal config. Same threshold everywhere so the page has one rhythm. */
export const inView = { once: true, amount: 0.35 } as const;

/** True when the visitor asked for less motion. Guard Lenis and R3F with this. */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
