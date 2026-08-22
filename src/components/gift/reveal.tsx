"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { DUR, EASE_OUT, STAGGER, frameIn, inView } from "@/lib/motion";

/**
 * One reveal language per gift template. The failure mode this file exists to
 * prevent is every chapter doing the same fade-up:
 *
 *   anniversary -> WipeIn     horizontal clip, alternating with the layout
 *   birthday    -> FocusIn    blur pulled to sharp, like an enlarger finding focus
 *   wedding     -> CurtainIn  vertical clip rising off the baseline
 *   thank-you   -> LetterIn   a line settling into place, nothing more
 *
 * Film frames always use FrameIn: a clip-path would cut their drop shadow, so
 * the frame arrives whole and the print inside it is what gets revealed.
 */

/** The shared curve, retyped as a tuple for `motion`. Never hand-write a bezier. */
const ease = [...EASE_OUT] as [number, number, number, number];

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Seconds. Use sparingly — long cascades read as slow. */
  delay?: number;
  /**
   * Play on load instead of on scroll. Anything in the first viewport must set
   * this: a headline that waits for an intersection is a headline that can
   * arrive blank.
   */
  mount?: boolean;
};

function useMotionOff(): boolean {
  return useReducedMotion() === true;
}

/**
 * Reduced motion lands on the finished state instantly.
 *
 * It has to stay a motion element to do it. Swapping in a plain <div> changes
 * the markup between the server and the client, and React keeps the server's
 * hidden inline style — which is how a gift page ends up blank for exactly the
 * visitors who asked for less motion.
 */
const INSTANT = { duration: 0 } as const;

function Reveal({
  children,
  className,
  delay = 0,
  mount = false,
  variants,
}: RevealProps & { variants: Variants }) {
  const off = useMotionOff();

  if (off || mount) {
    return (
      <motion.div
        className={className}
        variants={variants}
        custom={delay}
        initial="hidden"
        animate="show"
        transition={off ? INSTANT : undefined}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      variants={variants}
      custom={delay}
      initial="hidden"
      whileInView="show"
      viewport={inView}
    >
      {children}
    </motion.div>
  );
}

const wipeVariants: Record<"left" | "right", Variants> = {
  left: {
    hidden: { opacity: 0, clipPath: "inset(0 100% 0 0)" },
    show: (delay: number = 0) => ({
      opacity: 1,
      clipPath: "inset(0 0 0 0)",
      transition: { duration: DUR.story, ease, delay },
    }),
  },
  right: {
    hidden: { opacity: 0, clipPath: "inset(0 0 0 100%)" },
    show: (delay: number = 0) => ({
      opacity: 1,
      clipPath: "inset(0 0 0 0)",
      transition: { duration: DUR.story, ease, delay },
    }),
  },
};

export function WipeIn({ from = "left", ...props }: RevealProps & { from?: "left" | "right" }) {
  return <Reveal {...props} variants={wipeVariants[from]} />;
}

const focusVariants: Variants = {
  hidden: { opacity: 0, filter: "blur(14px)", scale: 0.985 },
  show: (delay: number = 0) => ({
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
    transition: { duration: DUR.story, ease, delay },
  }),
};

export function FocusIn(props: RevealProps) {
  return <Reveal {...props} variants={focusVariants} />;
}

const curtainVariants: Variants = {
  hidden: { opacity: 0, clipPath: "inset(100% 0 0 0)", y: 20 },
  show: (delay: number = 0) => ({
    opacity: 1,
    clipPath: "inset(0 0 0 0)",
    y: 0,
    transition: { duration: DUR.story, ease, delay },
  }),
};

export function CurtainIn(props: RevealProps) {
  return <Reveal {...props} variants={curtainVariants} />;
}

const letterVariants: Variants = {
  hidden: { opacity: 0, x: -14 },
  show: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: DUR.sheet, ease, delay },
  }),
};

export function LetterIn(props: RevealProps) {
  return <Reveal {...props} variants={letterVariants} />;
}

/** Contact-sheet arrival for anything wearing a shadow. Geometry from @/lib/motion. */
export function FrameIn({ children, className, delay = 0, mount = false }: RevealProps) {
  const off = useMotionOff();

  const variants: Variants = {
    hidden: frameIn.hidden,
    show: { ...frameIn.show, transition: { duration: DUR.story, ease, delay } },
  };

  if (off || mount) {
    return (
      <motion.div
        className={className}
        initial="hidden"
        animate="show"
        variants={variants}
        transition={off ? INSTANT : undefined}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

/** The finale arriving a word at a time. One template only — birthday. */
export function WordReveal({ text, className }: { text: string; className?: string }) {
  const off = useMotionOff();

  return (
    <motion.p
      className={className}
      initial="hidden"
      {...(off ? { animate: "show" as const } : { whileInView: "show" as const, viewport: inView })}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: off ? 0 : STAGGER } },
      }}
    >
      {text.split(" ").map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="mr-[0.26em] inline-block"
          variants={{
            hidden: { opacity: 0, y: 18 },
            show: {
              opacity: 1,
              y: 0,
              transition: off ? INSTANT : { duration: DUR.story, ease },
            },
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
}
