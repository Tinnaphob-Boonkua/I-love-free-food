import { Wordmark } from "@/components/chrome/wordmark";
import { FilmButton } from "@/components/ui/film-button";
import { FilmFrame } from "@/components/ui/film-frame";
import { demoSpace } from "@/lib/mock-space";

/** Stub — Lane B replaces this file. Keep tokens; do not invent a second look. */
export default function HomePage() {
  return (
    <main className="relative overflow-hidden px-6 py-10 md:px-16 md:py-16">
      <div className="pointer-events-none absolute -right-24 top-0 h-[28rem] w-[28rem] rounded-full bg-filament/25 blur-3xl" />
      <header className="flex items-end justify-between gap-6">
        <Wordmark />
        <p className="hidden max-w-xs text-right text-sm font-light text-silver md:block">
          For anyone you love. Not only couples.
        </p>
      </header>

      <section className="mt-24 grid items-end gap-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div>
          <h1 className="display max-w-[11ch] text-[clamp(3.5rem,12vw,8rem)] leading-[0.88] text-halide">
            The feeling does not live in the camera roll.
          </h1>
          <p className="mt-8 max-w-[62ch] text-base font-light leading-relaxed text-silver">
            Photos scatter. Videos stay unopened. MomentUS keeps the trip, the table, the year — in
            order — then reads it as a gift when the day comes.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <FilmButton href="/space/demo">Open the Chiang Mai Space</FilmButton>
            <FilmButton href="/start" tone="ghost">
              Start a Space
            </FilmButton>
          </div>
        </div>

        <FilmFrame
          photo={demoSpace.moments[0]?.mediaUrl}
          alt={demoSpace.title}
          rotate="2.4deg"
          caption={`${demoSpace.title} · ${demoSpace.people.length} people · ${demoSpace.moments.length} frames`}
        />
      </section>
    </main>
  );
}
