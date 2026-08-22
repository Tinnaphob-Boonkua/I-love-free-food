import { notFound } from "next/navigation";
import { Wordmark } from "@/components/chrome/wordmark";
import { FilmButton } from "@/components/ui/film-button";
import { FilmFrame } from "@/components/ui/film-frame";
import { formatDay } from "@/lib/format";
import { giftHref } from "@/lib/gift";
import { circleLabels, demoSpace, modeLabels, sortMoments } from "@/lib/mock-space";

/**
 * STUB — Lane C replaces this file with timeline, calendar,
 * add-moment sheet, and reminder chrome.
 */
export default async function SpacePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (id !== demoSpace.id) notFound();

  const moments = sortMoments(demoSpace.moments);

  return (
    <main className="px-6 py-10 md:px-16">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <Wordmark />
        <div className="flex gap-3">
          <FilmButton href={giftHref("anniversary")} tone="ghost">
            Read as a gift
          </FilmButton>
          <FilmButton href="/booth" tone="ghost">
            Photobooth
          </FilmButton>
        </div>
      </div>

      <p className="mt-16 text-sm font-light text-filament">
        {circleLabels[demoSpace.circle]} · {modeLabels[demoSpace.mode]}
      </p>
      <h1 className="display mt-4 text-5xl md:text-7xl">{demoSpace.title}</h1>
      <p className="mt-4 font-light text-silver">
        {demoSpace.people.map((p) => p.name).join(" · ")}
      </p>

      <ol className="mt-16 flex flex-col gap-12">
        {moments.map((moment, i) => (
          <li key={moment.id}>
            <FilmFrame
              photo={moment.mediaUrl}
              alt={moment.title}
              rotate={i % 2 === 0 ? "-1.1deg" : "1.6deg"}
              caption={`${formatDay(moment.occurredAt)} · ${moment.title}`}
            >
              <div className="p-5">
                <p className="text-xs text-filament">{formatDay(moment.occurredAt)}</p>
                <h2 className="display mt-3 text-3xl">{moment.title}</h2>
                {moment.feeling ? <p className="mt-2 text-sm text-silver">{moment.feeling}</p> : null}
              </div>
            </FilmFrame>
          </li>
        ))}
      </ol>
    </main>
  );
}
