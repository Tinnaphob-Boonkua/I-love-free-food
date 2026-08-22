import { Wordmark } from "@/components/chrome/wordmark";
import { FilmButton } from "@/components/ui/film-button";

const circles = [
  { id: "couple", label: "Two people in love" },
  { id: "friends", label: "A friendship" },
  { id: "family", label: "Family" },
  { id: "other", label: "Someone else I love" },
] as const;

/** Stub — Lane B. */
export default function StartPage() {
  return (
    <main className="px-6 py-10 md:px-16">
      <Wordmark />
      <h1 className="display mt-20 max-w-[14ch] text-5xl leading-[0.95] md:text-7xl">Who is this Space for?</h1>
      <p className="mt-6 max-w-[60ch] font-light text-silver">
        Secret gift, or a shared place. Both are MomentUS. This screen is staged — Lane B finishes the
        interaction.
      </p>
      <ul className="mt-12 grid gap-3 md:max-w-lg">
        {circles.map((c) => (
          <li key={c.id}>
            <FilmButton href="/space/demo" tone="ghost" className="w-full justify-start">
              {c.label}
            </FilmButton>
          </li>
        ))}
      </ul>
    </main>
  );
}
