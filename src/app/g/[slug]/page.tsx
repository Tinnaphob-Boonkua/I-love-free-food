import { notFound } from "next/navigation";
import { Wordmark } from "@/components/chrome/wordmark";
import { FilmButton } from "@/components/ui/film-button";
import { FilmFrame } from "@/components/ui/film-frame";
import { buildGift, slugToKind } from "@/lib/gift";
import { demoSpace } from "@/lib/mock-space";

/**
 * STUB — Lane D replaces with Lenis scrollytelling.
 * Content still comes from buildGift(); photos are the seeded stills.
 */
export default async function GiftPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const kind = slugToKind[slug];
  if (!kind) notFound();

  const gift = buildGift(demoSpace, kind);

  return (
    <main className="px-6 py-16 md:px-24">
      <Wordmark />

      <p className="mt-24 font-light text-filament">{gift.dedication}</p>
      <h1 className="display mt-6 max-w-[12ch] text-[clamp(3rem,10vw,7.5rem)] leading-[0.9]">
        {gift.headline}
      </h1>
      <p className="mt-8 font-light text-silver">
        {gift.names.join(" · ")} — {gift.daysTogether} days
      </p>

      <div className="mt-24 flex flex-col gap-28">
        {gift.beats.map((beat, i) => (
          <article key={beat.id} className="max-w-xl">
            {beat.mediaUrl ? (
              <FilmFrame
                photo={beat.mediaUrl}
                alt={beat.title}
                rotate={i % 2 === 0 ? "-1.2deg" : "1.5deg"}
                caption={`${beat.dateLabel} · ${beat.title}`}
              />
            ) : (
              <>
                <p className="text-sm text-silver">{beat.dateLabel}</p>
                <h2 className="display mt-2 text-4xl">{beat.title}</h2>
              </>
            )}
            <p className="mt-4 max-w-[70ch] font-light leading-relaxed text-halide">{beat.body}</p>
          </article>
        ))}
      </div>

      <p className="display mt-32 max-w-[16ch] text-4xl text-filament">{gift.finale}</p>

      <div className="mt-16">
        <FilmButton href="/space/demo" tone="ghost">
          Back to the Space
        </FilmButton>
      </div>
    </main>
  );
}
