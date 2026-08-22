"use client";

import { useEffect, useRef, useState, type ElementType } from "react";
import { DUR, EASE_OUT_CSS } from "@/lib/motion";

/**
 * Click a line, change the words. Local state only.
 * Escape reverts, Enter commits on a single line, blur commits everywhere.
 */
export function EditableLine({
  value: initial,
  as: Tag = "p",
  className = "",
  multiline = false,
  tone = "warm",
}: {
  value: string;
  as?: ElementType;
  className?: string;
  multiline?: boolean;
  /** "dark" for lines sitting on a filament field. */
  tone?: "warm" | "dark";
}) {
  const [value, setValue] = useState(initial);
  const [draft, setDraft] = useState(initial);
  const [editing, setEditing] = useState(false);
  const field = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!editing) return;
    field.current?.focus();
    field.current?.select();
  }, [editing]);

  function commit() {
    setValue(draft.trim() || value);
    setEditing(false);
  }

  if (editing) {
    return (
      <Tag className={className}>
        <textarea
          ref={field}
          value={draft}
          rows={multiline ? Math.min(9, Math.max(2, Math.ceil(draft.length / 40))) : 1}
          onChange={(event) => setDraft(event.target.value)}
          onBlur={commit}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setDraft(value);
              setEditing(false);
            }
            if (event.key === "Enter" && !multiline) {
              event.preventDefault();
              commit();
            }
          }}
          className="w-full resize-none bg-transparent leading-[inherit] outline-none [text-align:inherit]"
          style={{
            boxShadow: `inset 0 -1px 0 ${tone === "dark" ? "var(--umbra)" : "var(--filament)"}`,
          }}
        />
      </Tag>
    );
  }

  return (
    <Tag className={className}>
      <button
        type="button"
        onClick={() => {
          setDraft(value);
          setEditing(true);
        }}
        aria-label={`Change these words: ${value}`}
        className={`cursor-text border-b border-dashed border-transparent leading-[inherit] transition-colors [text-align:inherit] ${
          tone === "dark" ? "hover:border-umbra/45" : "hover:border-filament/45"
        }`}
        style={{ transitionDuration: `${DUR.control}s`, transitionTimingFunction: EASE_OUT_CSS }}
      >
        {value}
      </button>
    </Tag>
  );
}
