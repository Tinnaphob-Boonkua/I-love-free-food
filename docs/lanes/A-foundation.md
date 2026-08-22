# Lane A — Foundation

**You are Lane A.** You own the shared ground the other three lanes build on. Your work blocks theirs, so ship the contracts first and polish second.

Prerequisites: read `AGENTS.md`, `PRODUCT.md`, `DESIGN.md`, `docs/CONTENT.md`, `docs/INTEGRATION.md` before editing. No other prompt is coming.

---

## You own

```
package.json  tsconfig.json  next.config.ts  postcss.config.mjs  eslint.config.mjs  .gitignore
src/app/layout.tsx
src/app/globals.css
src/app/not-found.tsx
src/lib/**
src/components/ui/**
src/components/chrome/**
public/**
```

## You never touch

`src/app/page.tsx`, `src/app/start/**`, `src/app/space/[id]/**`, `src/app/g/**`, `src/app/booth/**`, or any `components/arrival|studio|gift|booth` folder. Those are B, C, and D.

---

## Ask the human first

1. **Font licensing / swap** — Bodoni Moda + Sora are chosen. Only raise it if a face fails to load.
2. **Any change to a shared type** after other lanes have started. Breaking `Moment` mid-build costs three agents their work.
3. **Any new dependency** beyond `docs/STACK.md`.

Otherwise: decide and build.

---

## Tasks, in order

**1. Boot integrity (do this first — everyone is blocked on it)**

- `npm install` completes, `npm run dev` serves without console errors.
- `npx tsc --noEmit` is clean.
- Confirm all five routes respond: `/`, `/start`, `/space/demo`, `/g/anniversary-demo`, `/booth`.

**2. Shared contracts (already scaffolded — verify and harden)**

- `src/lib/mock-space.ts` — types, `demoSpace`, `sortMoments`, label maps.
- `src/lib/format.ts` — every date helper the other lanes need.
- `src/lib/motion.ts` — durations, easings, variants.
- `src/lib/storage.ts` — `loadSpace`, `saveSpace`, `addMoment`, `resetSpace`.
- `src/lib/gift.ts` — `buildGift`, `giftHref`, slugs.

Signatures are published in `docs/INTEGRATION.md`. If you change one, update that file in the same commit and tell the team.

**3. Visual foundation**

- `globals.css`: the token set from `DESIGN.md`, `prefers-reduced-motion` block, Tailwind v4 `@theme inline` mapping.
- `layout.tsx`: fonts wired through `next/font`, direction contract comment retained, metadata correct.
- Verify contrast: `silver` on `umbra` must clear 4.5:1 for body copy. Fix the token if it does not.

**4. Primitives — make these good, they set the whole product's craft level**

| Component | Requirements |
|-----------|--------------|
| `FilmButton` | `filament` and `ghost` tones. `active:scale-[0.97]`, `DUR.press`, visible keyboard focus ring, disabled state |
| `FilmFrame` | Rotatable film border, caption slot, works with an image child or a text child, no nested cards |
| `Wordmark` | MomentUS + "Moment of Us", links home |

Add one more only if two lanes need it. Candidates: `Chip` (reminder/feeling labels), `Sheet` (add-moment container). Build them if C or D asks.

**5. Assets — landed**

- Seeded moments have `mediaUrl` pointing at `/demo/story/*`.
- Contributed photos are at `/demo/events/*` and `/demo/moments/*`, exposed as `demoPhotos` and `occasionPhotos`.
- Favicon and OG image are in-world.

---

## Acceptance

- [ ] `npm run dev` and `npx tsc --noEmit` both clean from a fresh clone
- [ ] All five routes render without errors
- [ ] Another lane can import every symbol listed in `docs/INTEGRATION.md`
- [ ] `FilmButton` has hover, active, focus-visible, and disabled states
- [ ] Body text clears 4.5:1 contrast
- [ ] `prefers-reduced-motion` is honored globally
- [ ] No hex colors outside `globals.css`

## If you finish early

Do not build other lanes' screens. Instead: audit merged branches for hardcoded hex, hand-written dates, and rogue easings, and report them to the owning lane.
