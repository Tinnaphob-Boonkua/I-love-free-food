import { Wordmark } from "@/components/chrome/wordmark";
import { FilmButton } from "@/components/ui/film-button";

/** Mock photobooth — Lane D. No WebRTC vendor. See docs/FEASIBILITY.md */
export default function BoothPage() {
  return (
    <main className="px-6 py-10 md:px-16">
      <Wordmark />
      <h1 className="display mt-20 text-5xl md:text-7xl">Two frames. One moment.</h1>
      <p className="mt-6 max-w-[62ch] font-light text-silver">
        Together, one phone. Far away, two phones on one page — Daily or Whereby can do that later.
        Tonight this is theater: shutter, flash, saved to the timeline.
      </p>
      <div className="mt-16 grid gap-6 md:grid-cols-2">
        <div className="aspect-[3/4] border border-silver/30 bg-umbra-2" />
        <div className="aspect-[3/4] border border-dashed border-filament/50 bg-umbra-2" />
      </div>
      <div className="mt-10 flex gap-3">
        <FilmButton type="button">Shutter</FilmButton>
        <FilmButton href="/space/demo" tone="ghost">
          Back to Space
        </FilmButton>
      </div>
    </main>
  );
}
