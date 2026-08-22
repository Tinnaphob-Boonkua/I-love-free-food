/**
 * SHARED CONTRACT — Lane A owns this file. It is the seam between
 * Lane C (studio, produces the link) and Lane D (gift, renders the page).
 *
 * Lane C never builds slots. Lane C links to `giftHref(kind)`.
 * Lane D never reads the studio. Lane D calls `buildGift(space, kind)`.
 * If either lane needs a new slot, ask Lane A — do not fork the mapper.
 */

import { daysBetween, formatDay } from "./format";
import { sortMoments, type Moment, type OccasionKind, type Space } from "./mock-space";

export type GiftKind = OccasionKind;

export const giftKinds: GiftKind[] = ["birthday", "anniversary", "wedding", "thankyou"];

/** URL slug per kind. Routes are /g/<slug>. */
export const giftSlugs: Record<GiftKind, string> = {
  birthday: "birthday-demo",
  anniversary: "anniversary-demo",
  wedding: "wedding-demo",
  thankyou: "thankyou-demo",
};

export const slugToKind: Record<string, GiftKind> = Object.fromEntries(
  Object.entries(giftSlugs).map(([kind, slug]) => [slug, kind as GiftKind]),
) as Record<string, GiftKind>;

/** One chapter of the gift. Lane D decides how a beat looks, not what it contains. */
export type GiftBeat = {
  id: string;
  /** Preformatted via @/lib/format so every surface agrees. */
  dateLabel: string;
  title: string;
  body: string;
  feeling?: string;
  place?: string;
  mediaUrl?: string;
  kind: Moment["kind"];
};

export type GiftPayload = {
  kind: GiftKind;
  slug: string;
  /** Display name of the Space this was read from. */
  spaceTitle: string;
  /** Big line in the first viewport. */
  headline: string;
  /** Quiet line under the headline. */
  dedication: string;
  /** Who it is for and from. */
  names: string[];
  /** Live count since Space.startedAt. Render as a number, not a progress ring. */
  daysTogether: number;
  beats: GiftBeat[];
  /** Last screen. Short. This is the moment the recipient remembers. */
  finale: string;
};

const headlines: Record<GiftKind, (space: Space) => { headline: string; dedication: string; finale: string }> = {
  birthday: (space) => ({
    headline: "The year we kept for you",
    dedication: `Read from ${space.title}`,
    finale: "Happy birthday. We were paying attention the whole time.",
  }),
  anniversary: (space) => ({
    headline: "A year measured in tables, not dates",
    dedication: `Read from ${space.title}`,
    finale: "Still the same table. Still us.",
  }),
  wedding: (space) => ({
    headline: "How we sat together before any aisle",
    dedication: `Read from ${space.title}`,
    finale: "Everything after this is the same story, longer.",
  }),
  thankyou: (space) => ({
    headline: "Things you did that we never said out loud",
    dedication: `Read from ${space.title}`,
    finale: "Thank you. This is the proof.",
  }),
};

export function momentToBeat(moment: Moment): GiftBeat {
  return {
    id: moment.id,
    dateLabel: formatDay(moment.occurredAt),
    title: moment.title,
    body: moment.body,
    feeling: moment.feeling,
    place: moment.place,
    mediaUrl: moment.mediaUrl,
    kind: moment.kind,
  };
}

/**
 * The only way to turn a Space into a gift.
 * Deterministic: same Space and kind always produce the same page.
 */
export function buildGift(space: Space, kind: GiftKind): GiftPayload {
  const copy = headlines[kind](space);
  const moments = sortMoments(space.moments);
  const today = space.occasions.find((o) => o.kind === kind)?.date;

  return {
    kind,
    slug: giftSlugs[kind],
    spaceTitle: space.title,
    headline: copy.headline,
    dedication: copy.dedication,
    names: space.people.map((p) => p.name),
    daysTogether: daysBetween(space.startedAt, today ?? moments.at(-1)?.occurredAt ?? space.startedAt),
    beats: moments.map(momentToBeat),
    finale: copy.finale,
  };
}

/** Lane C uses this for every "read as a gift" link. */
export function giftHref(kind: GiftKind, spaceId = "demo"): string {
  return `/g/${giftSlugs[kind]}?from=${spaceId}`;
}
