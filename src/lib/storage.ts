/**
 * SHARED CONTRACT — Lane A owns this file.
 *
 * Demo persistence plus the subscribable store behind useSpace().
 * localStorage only: there is no database this round.
 *
 * Components should prefer useSpace() from ./use-space. The functions here are
 * the store's plumbing, and are safe to call directly from event handlers.
 */

import { demoSpace, sortMoments, type Moment, type Space } from "./mock-space";

const KEY = "momentus-demo-v1";

function clone(space: Space): Space {
  return JSON.parse(JSON.stringify(space)) as Space;
}

/**
 * Cached snapshot. useSyncExternalStore compares by reference, so this must
 * return the identical object until something actually changes — recomputing
 * a fresh parse per call would loop React forever.
 */
let snapshot: Space | null = null;
const listeners = new Set<() => void>();

/** The seeded Space, shared by the server render and the first client paint. */
const serverSnapshot: Space = demoSpace;

/**
 * Stale localStorage from before mediaUrl existed would otherwise wipe the
 * seeded photographs. Keep visitor-added moments; fill missing stills from seed.
 */
function hydrate(parsed: Space): Space {
  const seedById = new Map(demoSpace.moments.map((m) => [m.id, m]));
  const moments = parsed.moments.map((moment) => {
    const seed = seedById.get(moment.id);
    if (seed?.mediaUrl && !moment.mediaUrl) {
      return { ...moment, mediaUrl: seed.mediaUrl };
    }
    return moment;
  });

  return {
    ...clone(demoSpace),
    ...parsed,
    moments,
    occasions: parsed.occasions?.length ? parsed.occasions : demoSpace.occasions,
  };
}

function read(id: string): Space {
  if (typeof window === "undefined") return serverSnapshot;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return clone(demoSpace);
    const parsed = JSON.parse(raw) as Space;
    if (!parsed?.id || parsed.id !== id || !Array.isArray(parsed.moments)) {
      return clone(demoSpace);
    }
    return hydrate(parsed);
  } catch {
    return clone(demoSpace);
  }
}

function emit(): void {
  for (const listener of listeners) listener();
}

/** Subscribe to Space changes. Returns the unsubscribe function. */
export function subscribe(listener: () => void): () => void {
  listeners.add(listener);

  // A gift page open in a second tab should follow along.
  if (listeners.size === 1 && typeof window !== "undefined") {
    window.addEventListener("storage", onExternalWrite);
  }

  return () => {
    listeners.delete(listener);
    if (listeners.size === 0 && typeof window !== "undefined") {
      window.removeEventListener("storage", onExternalWrite);
    }
  };
}

function onExternalWrite(event: StorageEvent): void {
  if (event.key !== null && event.key !== KEY) return;
  snapshot = null;
  emit();
}

/** Stable snapshot for useSyncExternalStore. */
export function getSpaceSnapshot(id: string = demoSpace.id): Space {
  if (snapshot === null || snapshot.id !== id) snapshot = read(id);
  return snapshot;
}

/** Server and first-paint snapshot. Always the seeded Space, so markup matches. */
export function getServerSpaceSnapshot(): Space {
  return serverSnapshot;
}

/** Never throws. Falls back to the seeded Space. */
export function loadSpace(id: string = demoSpace.id): Space {
  return getSpaceSnapshot(id);
}

export function saveSpace(space: Space): void {
  snapshot = space;
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(space));
    } catch {
      // Quota or private mode. The demo continues from memory.
    }
  }
  emit();
}

/** Returns the updated Space so callers can use it immediately. */
export function addMoment(space: Space, moment: Omit<Moment, "id">): Space {
  const next: Space = {
    ...space,
    moments: sortMoments([...space.moments, { ...moment, id: `m-${Date.now()}` }]),
  };
  saveSpace(next);
  return next;
}

/** Back to the seeded Space. Judges will click this more than once. */
export function resetSpace(): Space {
  if (typeof window !== "undefined") window.localStorage.removeItem(KEY);
  const fresh = clone(demoSpace);
  snapshot = fresh;
  emit();
  return fresh;
}
