/**
 * SHARED CONTRACT — Lane A owns this file.
 * All four lanes format dates through here. If the timeline says
 * "29 Dec 2024" and the gift says "12/29/2024", the demo looks broken.
 */

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function parse(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
}

/** "29 Dec 2024" */
export function formatDay(iso: string): string {
  const date = parse(iso);
  return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

/** "December 2024" — timeline section headings. */
export function formatMonth(iso: string): string {
  const date = parse(iso);
  return date.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
}

/** "Dec" — calendar and compact labels. */
export function formatMonthShort(iso: string): string {
  return MONTHS[parse(iso).getMonth()];
}

/** Whole days between two ISO dates. Powers "days together". */
export function daysBetween(fromIso: string, toIso: string): number {
  const ms = parse(toIso).getTime() - parse(fromIso).getTime();
  return Math.max(0, Math.round(ms / 86_400_000));
}

/** Today as YYYY-MM-DD, so demo data and new moments agree. */
export function todayIso(): string {
  const now = new Date();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${m}-${d}`;
}

/** "0:14" for a voice moment. */
export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = String(Math.floor(seconds % 60)).padStart(2, "0");
  return `${m}:${s}`;
}

/** Group moments by month key, preserving chronological order. */
export function groupByMonth<T extends { occurredAt: string }>(items: T[]): [string, T[]][] {
  const buckets = new Map<string, T[]>();
  for (const item of items) {
    const key = item.occurredAt.slice(0, 7);
    const bucket = buckets.get(key);
    if (bucket) bucket.push(item);
    else buckets.set(key, [item]);
  }
  return [...buckets.entries()].sort((a, b) => a[0].localeCompare(b[0]));
}
