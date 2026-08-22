# Lane D — Gift and booth

**You are Lane D.** You own the payoff. The gift page is what a judge remembers, and it is the reason MomentUS is a product rather than a photo folder.

Prerequisites: read `AGENTS.md`, `PRODUCT.md`, `DESIGN.md`, `docs/CONTENT.md`, `docs/INTEGRATION.md`, `docs/FEASIBILITY.md` before editing. No other prompt is coming.

Impeccable mode: **Experience**. Dials 8 / 7 / 3. The artifact leads; the interface recedes. This screen should not look like the studio.

---

## You own

```
src/app/g/**
src/app/booth/**
src/components/gift/**
src/components/booth/**
```

## You never touch

`src/lib/**`, `src/app/page.tsx`, `src/app/start/**`, `src/app/space/[id]/**`.

---

## Ask the human first

1. **The finale line.** The last thing the recipient reads. Defaults live in `src/lib/gift.ts`; draft two alternatives per occasion and ask before overriding. This is the most emotional copy in the product.
2. **How far the scrollytelling should go** — a calm sequence of chapters, or a full cinematic reveal with masks and a 3D finale. Time is short; get the choice made rather than assumed.
3. **Whether `/booth` should request the real camera.** A live `getUserMedia` preview is more convincing but can fail on stage with a permission prompt. Recommend the staged version and let the human decide.

Everything else is yours.

---

## Tasks

**1. Gift pages — three slugs, one mapper**

Routes: `/g/birthday-demo`, `/g/anniversary-demo`, `/g/wedding-demo`.

- Get content with `buildGift(space, kind)` from `@/lib/gift`; resolve the kind via `slugToKind[slug]`.
- **Never** re-derive slots from the raw Space, and never read studio state. The payload is the contract.
- Render the payload: headline, dedication, `daysTogether` as a real number, `beats[]` as chapters, then `finale`.
- Each occasion should feel different — not one template with a swapped title. Different pacing, different first viewport, different finale weight.
- Phone first. This gets opened on a phone, in bed, at night.

**2. Scrollytelling**

- Lenis smooth scroll, guarded by `prefersReducedMotion()`.
- **One authored sequence per template.** The failure mode is every chapter doing the same fade-up.
- Reach past opacity and transform: `clip-path` reveals, masks, blur. `frameIn` and `stagger` from `@/lib/motion` for film frames.
- Optional R3F on the **finale only** — warm particles, a light bloom. Must degrade cleanly.

**3. Customize a slot**

- Click a photo slot → replace the image with a local file. Click text → edit it inline.
- Local state only; no persistence needed. It exists to prove "you can make it yours".
- Keep it lightweight. Do **not** install GrapesJS, Craft.js, or IMG.LY — see `docs/FEASIBILITY.md`.

**4. `/booth` — staged photobooth**

- Two frames side by side: "together, one phone" and "far apart, two phones".
- Shutter button, flash, a captured-still treatment, then a toast: saved to MomentUS.
- Copy must be honest that this is the next chapter, not a shipped feature.
- **No Daily, Whereby, LiveKit, or Agora.** The feasibility answer is documented; the demo does not need the SDK.
- Optional single local camera preview only if the human approves it.

---

## Acceptance

- [ ] All three gift slugs render distinct experiences from the same Space
- [ ] Content comes exclusively from `buildGift`
- [ ] Dates match Lane C's timeline exactly
- [ ] One authored motion sequence per template, not a uniform fade
- [ ] Reduced motion disables Lenis and any 3D
- [ ] A slot can be replaced live
- [ ] `/booth` is clickable theater with no broken permission wall
- [ ] Beautiful at 390px — this is the real test
- [ ] `npx tsc --noEmit` clean

## If you finish early

Add the fourth kind (`thankyou`) — the mapper already supports it — then polish the finale. Do not touch the studio.
