"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { DUR, EASE_OUT } from "@/lib/motion";
import { addMoment, loadSpace, resetSpace } from "@/lib/storage";
import {
  circleLabels,
  demoSpace,
  modeLabels,
  sortMoments,
  type Moment,
  type Space,
} from "@/lib/mock-space";
import { Wordmark } from "@/components/chrome/wordmark";
import { FilmButton } from "@/components/ui/film-button";
import { Timeline } from "./timeline";
import { Calendar } from "./calendar";
import { AddMomentSheet } from "./add-moment-sheet";
import { Reminders } from "./reminders";
import { GiftMenu } from "./gift-menu";
import { ViewToggle, type StudioView } from "./view-toggle";
import { PlusIcon } from "./icons";

export function Studio({ spaceId }: { spaceId: string }) {
  const reduce = useReducedMotion();
  // First render must match the server: start from the seeded Space,
  // then adopt any localStorage state after mount.
  const [space, setSpace] = useState<Space>(demoSpace);
  const [view, setView] = useState<StudioView>("timeline");
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    setSpace(loadSpace(spaceId));
  }, [spaceId]);

  function handleAdd(moment: Omit<Moment, "id">) {
    setSpace((prev) => addMoment(prev, moment));
    setView("timeline");
  }

  function handleReset() {
    setSpace(resetSpace());
  }

  const moments = sortMoments(space.moments);

  return (
    <main className="px-6 py-10 md:px-16 md:py-16">
      <header>
        <div className="flex flex-wrap items-start justify-between gap-6">
          <Wordmark />
          <div className="flex flex-wrap items-center gap-3">
            <GiftMenu />
            <FilmButton href="/booth" tone="ghost">
              Photobooth
            </FilmButton>
          </div>
        </div>

        <p className="mt-14 text-sm font-light text-filament">
          {circleLabels[space.circle]} · {modeLabels[space.mode]}
        </p>
        <h1 className="display mt-3 text-5xl leading-[0.95] md:text-7xl">{space.title}</h1>
        <p className="mt-4 max-w-[60ch] font-light text-silver">
          {space.people.map((p) => p.name).join(" · ")}
        </p>

        <Reminders space={space} />
      </header>

      <div className="mt-12 flex flex-wrap items-center justify-between gap-4">
        <ViewToggle view={view} onChange={setView} />
        <FilmButton onClick={() => setSheetOpen(true)}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Add a moment
        </FilmButton>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: DUR.panel, ease: EASE_OUT }}
        >
          {view === "timeline" ? (
            <Timeline moments={moments} />
          ) : (
            <Calendar space={space} />
          )}
        </motion.div>
      </AnimatePresence>

      <footer className="mt-24 flex items-center justify-between border-t border-silver/15 pt-6 text-xs text-silver/50">
        <span>Synthetic demo Space · saved in this browser only</span>
        <button
          type="button"
          onClick={handleReset}
          className="text-silver/60 underline-offset-4 transition-colors duration-[120ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:text-silver hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-filament focus-visible:ring-offset-2 focus-visible:ring-offset-umbra"
        >
          Reset for rehearsal
        </button>
      </footer>

      <AddMomentSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        onSubmit={handleAdd}
      />
    </main>
  );
}
