"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { FilmButton } from "@/components/ui/film-button";
import { InviteMock } from "@/components/arrival/invite-mock";
import { fadeUp } from "@/lib/motion";
import { circleLabels, modeLabels, demoSpace } from "@/lib/mock-space";
import type { Circle, SpaceMode } from "@/lib/mock-space";
import { useSpace } from "@/lib/use-space";

const circleCopy: Record<Circle, string> = {
  couple: "For the two of you.",
  friends: "For a friendship spread across cities.",
  family: "For the people who raised you, or the ones you chose.",
  other: "For anyone this doesn't quite name.",
};

const modeCopy: Record<SpaceMode, string> = {
  secret: "Only you can see it, until the day you send it as a gift.",
  shared: "Everyone in the Space adds to the same timeline, as it happens.",
};

const circleOrder: Circle[] = ["couple", "friends", "family", "other"];
const modeOrder: SpaceMode[] = ["secret", "shared"];

/**
 * The whole `/start` interaction as one continuous flow, not a wizard —
 * each choice reveals the next below it. Circle + mode are required;
 * naming the Space and the person are optional per the lane brief.
 */
export function StartFlow() {
  const router = useRouter();
  const { set } = useSpace();
  const [circle, setCircle] = useState<Circle | null>(null);
  const [mode, setMode] = useState<SpaceMode | null>(null);
  const [spaceName, setSpaceName] = useState("");
  const [personName, setPersonName] = useState("");

  function handleFinish() {
    if (!circle || !mode) return;
    const next = {
      ...demoSpace,
      circle,
      mode,
      title: spaceName.trim() || demoSpace.title,
      people: personName.trim()
        ? [{ id: "p0", name: personName.trim() }, ...demoSpace.people]
        : demoSpace.people,
    };
    set(next);
    router.push("/space/demo");
  }

  return (
    <div className="mt-12 max-w-2xl">
      <fieldset>
        <legend className="text-sm font-medium text-halide">Who is this Space for?</legend>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {circleOrder.map((id) => (
            <OptionCard
              key={id}
              selected={circle === id}
              label={circleLabels[id]}
              description={circleCopy[id]}
              onSelect={() => setCircle(id)}
            />
          ))}
        </div>
      </fieldset>

      <AnimatePresence>
        {circle ? (
          <motion.fieldset initial="hidden" animate="show" variants={fadeUp} className="mt-10">
            <legend className="text-sm font-medium text-halide">Secret gift, or shared place?</legend>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {modeOrder.map((id) => (
                <OptionCard
                  key={id}
                  selected={mode === id}
                  label={modeLabels[id]}
                  description={modeCopy[id]}
                  onSelect={() => setMode(id)}
                />
              ))}
            </div>
          </motion.fieldset>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {circle && mode ? (
          <motion.div initial="hidden" animate="show" variants={fadeUp} className="mt-10 space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-xs font-light uppercase tracking-[0.18em] text-silver/70">
                  Name the Space (optional)
                </span>
                <input
                  value={spaceName}
                  onChange={(e) => setSpaceName(e.target.value)}
                  placeholder={demoSpace.title}
                  className="mt-2 w-full rounded-[14px] border border-silver/35 bg-umbra-2 px-4 py-3 text-halide placeholder:text-silver/50 focus:border-filament focus:outline-none"
                />
              </label>
              <label className="block">
                <span className="text-xs font-light uppercase tracking-[0.18em] text-silver/70">
                  Who it&apos;s for (optional)
                </span>
                <input
                  value={personName}
                  onChange={(e) => setPersonName(e.target.value)}
                  placeholder="A name, or leave it be"
                  className="mt-2 w-full rounded-[14px] border border-silver/35 bg-umbra-2 px-4 py-3 text-halide placeholder:text-silver/50 focus:border-filament focus:outline-none"
                />
              </label>
            </div>

            <div>
              <p className="text-xs font-light uppercase tracking-[0.18em] text-silver/70">
                Invite the others
              </p>
              <div className="mt-3">
                <InviteMock />
              </div>
            </div>

            <FilmButton type="button" onClick={handleFinish}>
              Enter the Space
            </FilmButton>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function OptionCard({
  label,
  description,
  selected,
  onSelect,
}: {
  label: string;
  description: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      // duration-[180ms] === DUR.control; hardcoded to match FilmButton's own convention.
      className={`rounded-[14px] border px-5 py-4 text-left transition-colors duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${
        selected ? "border-filament bg-filament/10" : "border-silver/30 bg-umbra-2 hover:border-silver/60"
      }`}
    >
      <span className="block text-base font-medium text-halide">{label}</span>
      <span className="mt-1 block text-sm font-light text-silver">{description}</span>
    </button>
  );
}
