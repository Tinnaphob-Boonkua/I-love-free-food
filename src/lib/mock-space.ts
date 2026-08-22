/**
 * SHARED CONTRACT — Lane A owns this file.
 * Lanes B, C, D import from it and must not change the shapes below.
 * Need a new field? Ask Lane A in chat; do not edit here.
 */

export type Circle = "couple" | "friends" | "family" | "other";
export type SpaceMode = "secret" | "shared";
export type MomentKind = "photo" | "video" | "text" | "voice";
export type OccasionKind = "birthday" | "anniversary" | "wedding" | "thankyou";

export type Person = {
  id: string;
  name: string;
  role?: string;
};

export type Moment = {
  id: string;
  /** ISO date, YYYY-MM-DD. Always format via @/lib/format — never toLocaleDateString inline. */
  occurredAt: string;
  kind: MomentKind;
  title: string;
  body: string;
  /** One or two words. Rendered as the quiet line under a title. */
  feeling?: string;
  place?: string;
  /** Absolute path under /public, or a blob: URL created at runtime. */
  mediaUrl?: string;
  /** Seconds. Only meaningful when kind === "voice". */
  durationSec?: number;
};

/** A date the Space cares about. Drives calendar marks, reminders, and gift kinds. */
export type Occasion = {
  id: string;
  kind: OccasionKind;
  label: string;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  personId?: string;
};

export type Space = {
  id: string;
  title: string;
  circle: Circle;
  mode: SpaceMode;
  people: Person[];
  /** ISO date the Space counts from. Powers "days together". */
  startedAt: string;
  moments: Moment[];
  occasions: Occasion[];
};

export const circleLabels: Record<Circle, string> = {
  couple: "Two people in love",
  friends: "A friendship",
  family: "Family",
  other: "Someone I love",
};

export const modeLabels: Record<SpaceMode, string> = {
  secret: "Secret gift",
  shared: "Shared memory place",
};

/**
 * Seeded demo Space. Synthetic — invented people, invented trip.
 * Never present as a real customer. Every lane demos against this id.
 */
export const demoSpace: Space = {
  id: "demo",
  title: "After Chiang Mai",
  circle: "friends",
  mode: "shared",
  startedAt: "2024-12-28",
  people: [
    { id: "p1", name: "Nok", role: "keeps the maps" },
    { id: "p2", name: "Pim", role: "orders every dessert" },
    { id: "p3", name: "June", role: "always late, always worth it" },
  ],
  occasions: [
    { id: "o1", kind: "birthday", label: "Nok's birthday", date: "2025-08-22", personId: "p1" },
    { id: "o2", kind: "anniversary", label: "One year since the van", date: "2025-12-28" },
    { id: "o3", kind: "wedding", label: "Pim and Ton", date: "2026-02-14", personId: "p2" },
  ],
  moments: [
    {
      id: "m1",
      occurredAt: "2024-12-28",
      kind: "text",
      title: "The van that smelled like oranges",
      body: "We thought the trip started at the hostel. It started when Pim passed the bag of som-o down the row and nobody checked their phone for an hour.",
      feeling: "unhurried",
      place: "Highway north",
    },
    {
      id: "m2",
      occurredAt: "2024-12-29",
      kind: "photo",
      title: "Rain on the temple steps",
      body: "June's shoes were ruined. She laughed like it was the point.",
      feeling: "bright",
      place: "Wat Umong",
    },
    {
      id: "m3",
      occurredAt: "2024-12-30",
      kind: "voice",
      title: "Night market, too loud to text",
      body: "Fourteen seconds of Nok trying to remember the name of a noodle stall. She never did. We still found it.",
      feeling: "full",
      place: "Sunday walking street",
      durationSec: 14,
    },
    {
      id: "m4",
      occurredAt: "2024-12-31",
      kind: "video",
      title: "Countdown from a rooftop we weren't invited to",
      body: "Someone's cousin knew a code. The city went gold for four seconds. Pim cried without explaining.",
      feeling: "tender",
      place: "Nimman",
    },
    {
      id: "m5",
      occurredAt: "2025-01-01",
      kind: "photo",
      title: "First morning of the year",
      body: "Coffee too sweet. Nobody wanted to pack. The feeling we keep losing in the camera roll lives here.",
      feeling: "quiet",
      place: "Guest house kitchen",
    },
    {
      id: "m6",
      occurredAt: "2025-03-15",
      kind: "text",
      title: "Group chat, 2am, no reason",
      body: "Three cities now. The thread still opens with a photo of that noodle stall.",
      feeling: "loyal",
      place: "Everywhere",
    },
    {
      id: "m7",
      occurredAt: "2025-08-22",
      kind: "photo",
      title: "Nok's birthday, months later",
      body: "We are not in the same room. The timeline is how we still sit at that table.",
      feeling: "held",
      place: "Everywhere",
    },
  ],
};

/** Newest last. Every lane sorts through this so order never disagrees. */
export function sortMoments(moments: Moment[]): Moment[] {
  return [...moments].sort((a, b) => a.occurredAt.localeCompare(b.occurredAt));
}
