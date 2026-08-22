# Voice — how MomentUS writes

Shared by all four lanes. The product is about feeling; generic SaaS copy kills it faster than a bad layout.

---

## The voice in one line

**Intimate, specific, unhurried.** Like someone describing a real evening to a close friend — not a brand describing a feature.

## Rules

1. **Specific beats sentimental.** "The van that smelled like oranges" works. "Cherish your precious memories" does not.
2. **Name the concrete thing.** A noodle stall, ruined shoes, coffee too sweet. Details are what make a fake demo feel real.
3. **No feature language on emotional surfaces.** Never "unlock", "seamless", "powered by AI", "supercharge".
4. **Short sentences carry weight.** Especially the finale line of a gift.
5. **Any love, not only romance.** Copy must work for a friend, a mother, a group. Avoid defaulting to "your partner".
6. **Controls say their action.** "Add a moment", not "Submit". "Read as a gift", not "Generate".
7. **Errors name the problem and the way out.** "That file is bigger than 10MB. Try a smaller photo."
8. **No emoji in product copy.**

## Yes / No

| Yes | No |
|-----|-----|
| The feeling does not live in the camera roll | Capture your memories effortlessly |
| Add a moment | + New Entry |
| Read as a gift | Generate Digital Asset |
| We were paying attention the whole time | Happy birthday to an amazing person! |
| Nobody wanted to pack | An unforgettable trip |
| Three cities now | Long-distance friendship |

---

## Fixed strings — do not paraphrase

| Where | String |
|-------|--------|
| Wordmark | `MomentUS` |
| Line under wordmark | `Moment of Us` |
| Primary landing action | `Open the Chiang Mai Space` |
| Secondary landing action | `Start a Space` |
| Studio primary action | `Add a moment` |
| Studio → gift action | `Read as a gift` |

Everything else is yours to write, in this voice.

---

## The demo people are synthetic — but the photos are real

The seeded Space is **After Chiang Mai**: Nok, Pim, June. Those names are invented. Use them freely.

The photographs in `assests/pictures/` are **real photos a teammate contributed** — birthdays, a proposal, a wedding, a hospital visit. Two consequences:

1. Never call them stock or placeholder in copy or in a commit message.
2. If the written captions and the photographs disagree in tone, **ask the human** which story the demo should tell. The invented Chiang Mai trip may need to give way to the real occasions the photos show.

**Never** invent: real customers, testimonials, user counts, press quotes, prices, or awards. There are none, and a judge asking "is that real?" ends the demo badly.

If a surface needs a claim, it can describe **what the product does**, never **who already uses it**.

---

## Occasion copy

Gift headlines and finale lines live in `src/lib/gift.ts` (Lane A owns). If your lane wants different words for a gift kind, **propose them to the human** — that is emotional copy, which is an ask-first decision per `AGENTS.md`.
