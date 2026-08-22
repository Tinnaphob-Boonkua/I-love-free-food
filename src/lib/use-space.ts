/**
 * SHARED CONTRACT — Lane A owns this file.
 *
 * The live Space, for any component in any lane. Every surface that reads or
 * writes moments should use this rather than loadSpace/saveSpace directly:
 * a moment added in Lane C's sheet then appears in Lane C's calendar and in a
 * gift page open in another tab, with no reload and no prop drilling.
 *
 *   const { space, add, reset, isReady } = useSpace();
 *   add({ occurredAt: todayIso(), kind: "photo", title, body });
 *
 * `isReady` is false for the first paint only. Server HTML and first client
 * paint both render the seeded Space, so the markup matches and React does not
 * complain; anything the visitor saved arrives on the next tick.
 */

"use client";

import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { demoSpace, type Moment, type Space } from "./mock-space";
import {
  addMoment,
  getServerSpaceSnapshot,
  getSpaceSnapshot,
  resetSpace,
  saveSpace,
  subscribe,
} from "./storage";

export type UseSpace = {
  space: Space;
  /** Append a moment. Returns the new Space if a caller wants it. */
  add: (moment: Omit<Moment, "id">) => Space;
  /** Replace the whole Space — Lane B's /start uses this. */
  set: (space: Space) => void;
  /** Back to the seeded Space. Judges will click this more than once. */
  reset: () => void;
  /** False during the first paint, while we are still showing seeded data. */
  isReady: boolean;
};

export function useSpace(id: string = demoSpace.id): UseSpace {
  const getSnapshot = useCallback(() => getSpaceSnapshot(id), [id]);
  const space = useSyncExternalStore(subscribe, getSnapshot, getServerSpaceSnapshot);

  const [isReady, setIsReady] = useState(false);
  useEffect(() => setIsReady(true), []);

  const add = useCallback(
    (moment: Omit<Moment, "id">) => addMoment(getSpaceSnapshot(id), moment),
    [id],
  );

  return useMemo(
    () => ({ space, add, set: saveSpace, reset: () => void resetSpace(), isReady }),
    [space, add, isReady],
  );
}
