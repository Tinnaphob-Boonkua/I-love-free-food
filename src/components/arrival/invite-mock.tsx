"use client";

import { useState } from "react";
import { FilmButton } from "@/components/ui/film-button";

/**
 * A "share a join code" affordance. Obviously staged — no backend call,
 * no real invite is sent. Copy is a client-only clipboard write.
 */
export function InviteMock({ code = "CHIANGMAI24" }: { code?: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(code).catch(() => {});
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="flex flex-wrap items-center gap-4 rounded-[14px] border border-silver/30 bg-umbra-2 px-5 py-4">
      <div>
        <p className="text-xs font-light uppercase tracking-[0.18em] text-silver/70">Join code</p>
        <p className="display text-2xl text-halide">{code}</p>
      </div>
      <FilmButton type="button" tone="ghost" onClick={handleCopy}>
        {copied ? "Copied" : "Copy"}
      </FilmButton>
    </div>
  );
}
