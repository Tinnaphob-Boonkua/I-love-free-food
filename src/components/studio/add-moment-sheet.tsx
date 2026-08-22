"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { DUR, EASE_OUT } from "@/lib/motion";
import { todayIso } from "@/lib/format";
import { prepareImage } from "@/lib/media";
import type { Moment, MomentKind } from "@/lib/mock-space";
import { FilmButton } from "@/components/ui/film-button";
import { CameraIcon, CloseIcon, FilmIcon, MicIcon, TextIcon } from "./icons";

const KINDS: { kind: MomentKind; label: string; Icon: typeof CameraIcon }[] = [
  { kind: "photo", label: "Photo", Icon: CameraIcon },
  { kind: "video", label: "Video", Icon: FilmIcon },
  { kind: "text", label: "Note", Icon: TextIcon },
  { kind: "voice", label: "Voice", Icon: MicIcon },
];

const fieldClass =
  "w-full rounded-[14px] border border-silver/25 bg-umbra px-4 py-3 text-halide placeholder:text-silver/40 transition-colors duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] focus-visible:border-filament focus-visible:outline-none";
const labelClass = "block text-xs tracking-[0.12em] text-silver/70 uppercase";

type Draft = Omit<Moment, "id">;

export function AddMomentSheet({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (moment: Draft) => void;
}) {
  const reduce = useReducedMotion();
  const [kind, setKind] = useState<MomentKind>("photo");
  const [occurredAt, setOccurredAt] = useState(todayIso());
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [feeling, setFeeling] = useState("");
  const [place, setPlace] = useState("");
  const [mediaUrl, setMediaUrl] = useState<string | undefined>(undefined);
  const [durationSec, setDurationSec] = useState(8);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    // Fresh, honest empty state every time the sheet opens.
    setKind("photo");
    setOccurredAt(todayIso());
    setTitle("");
    setBody("");
    setFeeling("");
    setPlace("");
    setMediaUrl(undefined);
    setDurationSec(8);
    setError(null);
    setDone(false);
    const t = setTimeout(() => titleRef.current?.focus(), 60);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  async function pickFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (kind === "video") {
      setError("Video stays staged for this demo. Add a still photo instead.");
      e.target.value = "";
      return;
    }
    try {
      const prepared = await prepareImage(file);
      setError(null);
      setMediaUrl(prepared.dataUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "That photo would not open. Try another one.");
    }
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      setError("Give the moment a title so it has something to be called.");
      titleRef.current?.focus();
      return;
    }
    const moment: Draft = {
      occurredAt,
      kind,
      title: title.trim(),
      body: body.trim(),
      feeling: feeling.trim() || undefined,
      place: place.trim() || undefined,
      mediaUrl: kind === "photo" || kind === "video" ? mediaUrl : undefined,
      durationSec: kind === "voice" ? durationSec : undefined,
    };
    setDone(true);
    onSubmit(moment);
    // Let the success line breathe, then hand control back.
    setTimeout(onClose, reduce ? 0 : 750);
  }

  const showFile = kind === "photo" || kind === "video";

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduce ? undefined : { opacity: 0 }}
          transition={{ duration: DUR.panel, ease: EASE_OUT }}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute inset-0 bg-umbra/80"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Add a moment"
            initial={reduce ? false : { y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduce ? undefined : { y: 24, opacity: 0 }}
            transition={{ duration: DUR.sheet, ease: EASE_OUT }}
            className="relative z-10 max-h-[92dvh] w-full max-w-lg overflow-y-auto rounded-t-[16px] border border-silver/20 bg-umbra-2 p-6 shadow-[0_18px_40px_rgba(0,0,0,0.35)] sm:rounded-[16px] md:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="display text-2xl text-halide">Add a moment</h2>
                <p className="mt-1 text-sm font-light text-silver/80">
                  The feeling does not live in the camera roll. Put it here.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] border border-silver/25 text-silver transition-colors duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-halide hover:text-halide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-filament focus-visible:ring-offset-2 focus-visible:ring-offset-umbra"
              >
                <CloseIcon className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={submit} className="mt-6 flex flex-col gap-5">
              <fieldset>
                <legend className={labelClass}>Kind</legend>
                <div className="mt-2 grid grid-cols-4 gap-2">
                  {KINDS.map(({ kind: k, label, Icon }) => (
                    <button
                      key={k}
                      type="button"
                      onClick={() => setKind(k)}
                      aria-pressed={kind === k}
                      className={[
                        "flex flex-col items-center gap-1.5 rounded-[12px] border px-2 py-3 text-[0.72rem] transition-colors duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)]",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-filament focus-visible:ring-offset-2 focus-visible:ring-offset-umbra",
                        kind === k
                          ? "border-filament bg-filament/10 text-halide"
                          : "border-silver/25 text-silver hover:border-halide/60",
                      ].join(" ")}
                    >
                      <Icon className="h-5 w-5" />
                      {label}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div>
                <label className={labelClass} htmlFor="m-title">
                  Title
                </label>
                <input
                  id="m-title"
                  ref={titleRef}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="The van that smelled like oranges"
                  className={`${fieldClass} mt-2`}
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="m-body">
                  What happened
                </label>
                <textarea
                  id="m-body"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  rows={3}
                  placeholder="Say the specific thing. The ruined shoes, the coffee too sweet."
                  className={`${fieldClass} mt-2 resize-none`}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass} htmlFor="m-date">
                    When
                  </label>
                  <input
                    id="m-date"
                    type="date"
                    value={occurredAt}
                    onChange={(e) => setOccurredAt(e.target.value)}
                    className={`${fieldClass} mt-2 [color-scheme:dark]`}
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="m-feeling">
                    Feeling
                  </label>
                  <input
                    id="m-feeling"
                    value={feeling}
                    onChange={(e) => setFeeling(e.target.value)}
                    placeholder="unhurried"
                    className={`${fieldClass} mt-2`}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass} htmlFor="m-place">
                  Where
                </label>
                <input
                  id="m-place"
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                  placeholder="Sunday walking street"
                  className={`${fieldClass} mt-2`}
                />
              </div>

              {showFile ? (
                <div>
                  <label className={labelClass} htmlFor="m-file">
                    {kind === "video" ? "Clip" : "Photo"}
                  </label>
                  <input
                    id="m-file"
                    type="file"
                    accept={kind === "video" ? "video/*" : "image/*"}
                    onChange={pickFile}
                    className="mt-2 block w-full text-sm text-silver file:mr-4 file:cursor-pointer file:rounded-[10px] file:border-0 file:bg-umbra file:px-4 file:py-2 file:text-sm file:text-halide hover:file:text-filament-hot"
                  />
                  {mediaUrl && kind === "photo" ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={mediaUrl}
                      alt="Selected preview"
                      className="mt-3 h-28 w-full rounded-[12px] object-cover"
                    />
                  ) : null}
                </div>
              ) : null}

              {kind === "voice" ? (
                <p className="rounded-[12px] border border-silver/20 bg-umbra px-4 py-3 text-xs font-light leading-relaxed text-silver/80">
                  Voice capture is staged for this demo — we&apos;ll save a {durationSec}s clip with a
                  drawn waveform, no recording.
                </p>
              ) : null}

              {error ? (
                <p role="alert" className="text-sm text-danger">
                  {error}
                </p>
              ) : null}

              <div className="mt-1 flex items-center justify-between gap-4">
                <span
                  className={`text-sm text-filament transition-opacity duration-[180ms] ${
                    done ? "opacity-100" : "opacity-0"
                  }`}
                >
                  Added to the timeline.
                </span>
                <div className="flex gap-3">
                  <FilmButton type="button" tone="ghost" onClick={onClose}>
                    Cancel
                  </FilmButton>
                  <FilmButton type="submit" disabled={done}>
                    Add a moment
                  </FilmButton>
                </div>
              </div>
            </form>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
