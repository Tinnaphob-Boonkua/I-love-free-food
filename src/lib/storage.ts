/**
 * SHARED CONTRACT — Lane A owns this file.
 * Demo persistence. localStorage only: no database this round.
 * Lane C uses addMoment. Lane B uses saveSpace after /start.
 */

"use client";

import { demoSpace, sortMoments, type Moment, type Space } from "./mock-space";

const KEY = "momentus-demo-v1";

function clone(space: Space): Space {
  return JSON.parse(JSON.stringify(space)) as Space;
}

/** Never throws. Falls back to the seeded demo Space. */
export function loadSpace(id: string = demoSpace.id): Space {
  if (typeof window === "undefined") return clone(demoSpace);
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return clone(demoSpace);
    const parsed = JSON.parse(raw) as Space;
    if (!parsed?.id || parsed.id !== id || !Array.isArray(parsed.moments)) {
      return clone(demoSpace);
    }
    return { ...clone(demoSpace), ...parsed };
  } catch {
    return clone(demoSpace);
  }
}

export function saveSpace(space: Space): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(space));
  } catch {
    // Quota or private mode. The demo continues from memory.
  }
}

/** Returns the updated Space so callers can setState with it. */
export function addMoment(space: Space, moment: Omit<Moment, "id">): Space {
  const next: Space = {
    ...space,
    moments: sortMoments([...space.moments, { ...moment, id: `m-${Date.now()}` }]),
  };
  saveSpace(next);
  return next;
}

/** Judges will click this more than once. Put it behind a quiet control. */
export function resetSpace(): Space {
  if (typeof window !== "undefined") window.localStorage.removeItem(KEY);
  return clone(demoSpace);
}
