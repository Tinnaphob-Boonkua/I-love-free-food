import { Wordmark } from "@/components/chrome/wordmark";
import { StartFlow } from "@/components/arrival/start-flow";

export default function StartPage() {
  return (
    <main className="px-6 py-10 md:px-16">
      <Wordmark />
      <h1 className="display mt-20 max-w-[14ch] text-5xl leading-[0.95] md:text-7xl">
        Who is this Space for?
      </h1>
      <p className="mt-6 max-w-[60ch] font-light text-silver">
        Choose who it&apos;s for, and whether it stays secret or is shared from the start. Two
        questions, then you&apos;re in.
      </p>
      <StartFlow />
    </main>
  );
}
