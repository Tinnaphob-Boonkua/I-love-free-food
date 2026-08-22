"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";

/**
 * SHARED CONTRACT — Lane A owns this file.
 * The container for anything that interrupts: add a moment, replace a photo,
 * confirm a reset.
 *
 * Built on native <dialog>, so focus trapping, Escape, the top layer and an
 * inert background are the browser's job rather than ours — the demo cannot
 * afford a home-made focus trap that loses the keyboard on stage.
 *
 * Motion is one authored move at DUR.sheet: up from the bottom on a phone,
 * a small settle on a laptop. Both are switched off under reduced motion, in
 * globals.css.
 */
export function Sheet({
  open,
  onClose,
  title,
  description,
  children,
  footer,
}: {
  open: boolean;
  onClose: () => void;
  /** Required: a modal with no accessible name is a dead end for a screen reader. */
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  // <dialog> blocks interaction but the page behind still scrolls on iOS.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      onClose={onClose}
      onCancel={onClose}
      onClick={(event) => {
        // Clicks land on the dialog itself only when they hit the backdrop.
        if (event.target === ref.current) onClose();
      }}
      className="film-sheet"
    >
      <div className="flex max-h-[85dvh] flex-col">
        <header className="px-6 pt-6 md:px-8 md:pt-8">
          <h2 id={titleId} className="text-2xl md:text-3xl">
            {title}
          </h2>
          {description ? (
            <p id={descriptionId} className="measure mt-2 text-sm text-silver">
              {description}
            </p>
          ) : null}
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6 md:px-8">{children}</div>

        {footer ? (
          <footer className="flex flex-wrap items-center justify-end gap-3 border-t border-silver/15 px-6 py-4 md:px-8">
            {footer}
          </footer>
        ) : null}
      </div>
    </dialog>
  );
}
