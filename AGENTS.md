# MomentUS — start here

You are a coding agent working on **MomentUS (Moment of Us)** with three other agents in parallel, on separate branches, against a live demo deadline.

Read this file completely, then work. You do not need any additional prompt from your human.

---

## 1. Orient yourself first

**Find out which lane you are.** In order:

1. Your human named a lane (A, B, C, or D) — use it.
2. Your git branch is `lane-a` / `lane-b` / `lane-c` / `lane-d` — use it.
3. Neither — **ask your human which lane you own before writing any code.** Do not guess; two agents in one lane will collide.

Then read, in this order:

| Order | File | Why |
|-------|------|-----|
| 1 | `PRODUCT.md` | What MomentUS is, who it is for, what is in scope |
| 2 | `DESIGN.md` | The one visual world. Colors, type, spacing, motion, bans |
| 3 | `docs/CONTENT.md` | Voice. How MomentUS writes a sentence |
| 4 | `docs/lanes/<your-lane>.md` | Your files, your tasks, your acceptance |
| 5 | `docs/INTEGRATION.md` | The shared APIs you import, and merge rules |
| 6 | `docs/STACK.md` | Dependencies. Do not install anything else |

Skim `docs/DEMO.md` so you know which of your screens is on stage.

---

## 2. What we are building

A **memory place** for anyone you love — partner, friends, family, a group. You add moments (photo, video, text, voice); they land on a **timeline** and a **calendar**. When an occasion arrives, the same timeline can be **read as a gift website** you send.

Not a couple-only journal. Not a website builder. Not a guest photo dump.

**This round is a frontend mockup for a live demo.** No database, no auth, no real WebRTC. `localStorage` only. Features we are not building are still *visible* as honest mock UI — see `docs/FEASIBILITY.md`.

---

## 3. Craft standard — this is the whole point

The demo is judged on how it **feels**. Generic wins nothing.

Follow these skills, in this order, on every UI file you touch:

1. **impeccable** — `PRODUCT.md` and `DESIGN.md` outrank your taste. Respect the craft floor: real states, real contrast, real spacing, one authored motion moment per surface.
2. **design-taste-frontend** — anti-slop. The dials are already set per surface in `DESIGN.md`; do not re-roll them.
3. **emil-design-eng** — motion decisions. Ask "should this animate at all?" before animating. UI under 300ms, `ease-out`, never `scale(0)`, never `ease-in`.

If those skills are not available in your editor, say so to your human and keep going — `DESIGN.md` encodes the parts you must not get wrong.

**Instant fail:** it could be a Tailwind starter. If your screen would look at home in any SaaS template, you ignored `DESIGN.md`.

---

## 4. Ask the human — do not invent

You have authority over **implementation**. You do not have authority over **feeling**.

**Ask before you build** when the decision is:

- **Emotional copy** — the words on a gift page, a finale line, what someone says to their mother. Draft two options and ask which is closer.
- **Whose story this is** — real names, a real occasion, or the synthetic demo people (Nok, Pim, June). Never invent a real person's story.
- **A new visual move** not covered by `DESIGN.md` — a second accent color, a light theme, a new font, a big 3D idea.
- **Cutting a demo step** — if you are running out of time, ask which step to drop rather than silently shipping less.
- **A dependency** not in `docs/STACK.md`.
- **Anything that touches another lane's files.**

**Do not ask, just decide:** spacing, component internals, TypeScript shapes inside your lane, hover states, file naming, which existing token to use.

Use your editor's question tool with concrete options. One round, then build.

---

## 5. Ownership — the rule that protects the merge

Each lane owns a disjoint set of paths. **Editing a file you do not own is the one unrecoverable mistake**, because four branches merge under time pressure.

| Lane | Owns | Never touches |
|------|------|---------------|
| **A** Foundation | `src/lib/**`, `src/components/ui/**`, `src/components/chrome/**`, `src/app/layout.tsx`, `src/app/globals.css`, `src/app/not-found.tsx`, all root config, `public/**` | Any page under `app/` besides layout and not-found |
| **B** Arrival | `src/app/page.tsx`, `src/app/start/**`, `src/app/space/new/**`, `src/components/arrival/**` | `src/lib`, studio, gift, booth |
| **C** Studio | `src/app/space/[id]/**`, `src/components/studio/**` | `src/lib`, landing, gift, booth |
| **D** Gift | `src/app/g/**`, `src/app/booth/**`, `src/components/gift/**`, `src/components/booth/**` | `src/lib`, landing, studio |

Need something changed in a file you do not own? **Ask that lane's human in chat.** Lane A is the tiebreaker on all shared contracts.

Stub pages already exist for every route so nobody is blocked. **Replace your stubs; leave other lanes' stubs alone.**

---

## 6. The shared contracts you must import

Never re-implement these. Full signatures in `docs/INTEGRATION.md`.

```ts
import { demoSpace, sortMoments, circleLabels, modeLabels } from "@/lib/mock-space";
import { loadSpace, saveSpace, addMoment } from "@/lib/storage";
import { formatDay, formatMonth, daysBetween, groupByMonth } from "@/lib/format";
import { DUR, EASE_OUT, fadeUp, frameIn, stagger, inView } from "@/lib/motion";
import { buildGift, giftHref, giftKinds, slugToKind } from "@/lib/gift";
import { FilmButton } from "@/components/ui/film-button";
import { FilmFrame } from "@/components/ui/film-frame";
import { Wordmark } from "@/components/chrome/wordmark";
```

Three rules that keep the four screens looking like one product:

1. **Never hand-write a date string.** Use `@/lib/format`.
2. **Never hand-write a duration or easing.** Use `@/lib/motion`.
3. **Never hand-write a hex color.** Use the Tailwind tokens (`bg-umbra`, `text-filament`, `border-silver`).

---

## 7. Working loop

```bash
npm install      # once
npm run dev      # http://localhost:3000
```

1. Read your lane file. Confirm your lane's **Ask the human** list — resolve those first.
2. Build your surfaces, importing shared contracts.
3. Check your own work at **390px and 1440px**. Phone first: the gift gets opened on a phone.
4. Run `npx tsc --noEmit` before you push. A type error in your lane blocks the merge.
5. Commit on your branch only. Never reformat files you do not own.
6. Post in team chat when your lane's acceptance list is green.

---

## 8. Definition of done for the whole team

The demo is one continuous click-through:

1. `/` — the world lands; one click into the demo Space.
2. `/space/demo` — timeline and calendar of real-feeling moments; add one moment live.
3. Read as a gift → `/g/anniversary-demo` — a page that feels like a present.
4. Extras if time: reminders chip, `/booth`, replace a photo in a gift slot.

If your lane is done early, do not expand scope. Improve the craft of what you own, or ask what to help with.
