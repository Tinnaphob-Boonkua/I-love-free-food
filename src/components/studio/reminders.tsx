"use client";

import { useEffect, useState } from "react";
import { daysBetween, formatDay, todayIso } from "@/lib/format";
import { sortMoments, type Space } from "@/lib/mock-space";
import { CameraIcon, GiftIcon, MicIcon } from "./icons";

type Reminder = { id: string; Icon: typeof GiftIcon; text: string };

/** Next time this month-day comes around, from today forward. */
function nextOccurrence(dateIso: string, today: string): { iso: string; days: number } {
  const md = dateIso.slice(5);
  const year = Number(today.slice(0, 4));
  let cand = `${year}-${md}`;
  if (cand < today) cand = `${year + 1}-${md}`;
  return { iso: cand, days: daysBetween(today, cand) };
}

function build(space: Space): Reminder[] {
  const today = todayIso();
  const todayMD = today.slice(5);
  const out: Reminder[] = [];

  // On this day — a past moment sharing today's month-day.
  const onThisDay = space.moments.find(
    (m) => m.occurredAt.slice(5) === todayMD && m.occurredAt.slice(0, 4) !== today.slice(0, 4),
  );
  if (onThisDay) {
    out.push({
      id: "on-this-day",
      Icon: CameraIcon,
      text: `On this day, ${onThisDay.occurredAt.slice(0, 4)} — ${onThisDay.title}`,
    });
  }

  // Nearest upcoming occasion.
  const upcoming = space.occasions
    .map((o) => ({ o, ...nextOccurrence(o.date, today) }))
    .sort((a, b) => a.days - b.days)[0];
  if (upcoming) {
    const when =
      upcoming.days === 0
        ? "today"
        : upcoming.days === 1
          ? "tomorrow"
          : `in ${upcoming.days} days (${formatDay(upcoming.iso)})`;
    out.push({ id: "upcoming", Icon: GiftIcon, text: `${upcoming.o.label} — ${when}` });
  }

  // Quiet-week nudge — plain-warm wording, chosen with the human.
  const latest = sortMoments(space.moments).at(-1)?.occurredAt;
  if (latest && daysBetween(latest, today) >= 21) {
    out.push({
      id: "quiet",
      Icon: MicIcon,
      text: "It's been three weeks since the last moment. Add one before it slips into the camera roll.",
    });
  }

  return out;
}

export function Reminders({ space }: { space: Space }) {
  // Date-derived; compute after mount so SSR and client never disagree.
  const [reminders, setReminders] = useState<Reminder[]>([]);
  useEffect(() => setReminders(build(space)), [space]);

  if (reminders.length === 0) return null;

  return (
    <ul className="mt-8 flex flex-wrap gap-2.5">
      {reminders.map(({ id, Icon, text }) => (
        <li
          key={id}
          className="inline-flex max-w-full items-center gap-2 rounded-full border border-silver/20 bg-umbra-2 px-3.5 py-2 text-xs font-light text-silver"
        >
          <Icon className="h-4 w-4 shrink-0 text-filament" />
          <span>{text}</span>
        </li>
      ))}
    </ul>
  );
}
