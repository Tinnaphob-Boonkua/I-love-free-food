import { Wordmark } from "@/components/chrome/wordmark";
import { FilmButton } from "@/components/ui/film-button";
import { FilmFrame } from "@/components/ui/film-frame";
import { demoSpace } from "@/lib/mock-space";
import { HeroAtmosphere } from "@/components/arrival/hero-atmosphere";
import { HeroPhoto } from "@/components/arrival/hero-photo";
import { ContactSheet } from "@/components/arrival/contact-sheet";
import { SmoothScroll } from "@/components/arrival/smooth-scroll";
import { InviteMock } from "@/components/arrival/invite-mock";

export default function HomePage() {
  return (
    <main className="relative overflow-hidden px-6 py-10 md:px-16 md:py-16">
      <SmoothScroll />
      <HeroAtmosphere />

      <header className="relative flex items-end justify-between gap-6">
        <Wordmark />
        <p className="hidden max-w-xs text-right text-sm font-light text-silver md:block">
          For anyone you love. Not only couples.
        </p>
      </header>

      <section className="relative mt-24 grid items-end gap-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div>
          <h1 className="display max-w-[11ch] text-[clamp(3.5rem,12vw,8rem)] leading-[0.88] text-halide">
            The feeling does not live in the camera roll.
          </h1>
          <p className="mt-8 max-w-[62ch] text-base font-light leading-relaxed text-silver">
            Photos scatter. Videos sit unopened. MomentUS keeps the trip, the table, the year — in
            order — so it can be read as a gift when the day comes.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <FilmButton href="/space/demo">Open the Chiang Mai Space</FilmButton>
            <FilmButton href="/start" tone="ghost">
              Start a Space
            </FilmButton>
          </div>
        </div>

        <FilmFrame
          rotate="2.4deg"
          caption={`${demoSpace.title} · ${demoSpace.people.length} people · seeded demo`}
        >
          <div className="relative flex min-h-52 flex-col justify-between overflow-hidden p-5">
            <HeroPhoto alt={`${demoSpace.title} — the trip this Space started with`} />
            <p className="display text-4xl text-filament">{demoSpace.moments.length} frames</p>
            <p className="text-sm font-light text-silver">and counting.</p>
          </div>
        </FilmFrame>
      </section>

      <section className="relative mt-32 max-w-[70ch]">
        <p className="text-lg font-light leading-relaxed text-silver">
          Someone forgets to save the video. Someone else has the photos, three phones and a laptop
          away. By the time the year is over, nobody has the whole trip — just their own half of it.
        </p>
        <p className="mt-4 text-lg font-light leading-relaxed text-halide">
          A Space holds it in order instead, from anyone who was there. When a birthday, an
          anniversary, or a wedding comes around, that same timeline is read back as a gift.
        </p>
      </section>

      <section className="relative mt-24">
        <h2 className="display max-w-[16ch] text-3xl text-halide md:text-4xl">
          A contact sheet from one Space.
        </h2>
        <div className="mt-10">
          <ContactSheet moments={demoSpace.moments} />
        </div>
      </section>

      <section className="relative mt-32 max-w-xl">
        <h2 className="display text-3xl text-halide md:text-4xl">Bring the others in.</h2>
        <p className="mt-4 font-light text-silver">
          Send a join code, or keep it secret until the gift is ready. Either way starts at{" "}
          <span className="text-halide">Start a Space</span>.
        </p>
        <div className="mt-6">
          <InviteMock />
        </div>
      </section>
    </main>
  );
}
