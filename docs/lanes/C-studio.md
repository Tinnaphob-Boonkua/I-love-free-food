# Lane C — Studio

**You are Lane C.** You own the core product: the timeline that turns scattered moments back into one story, plus the calendar and the add-moment flow. Steps 2 and 3 of the live demo are yours.

Prerequisites: read `AGENTS.md`, `PRODUCT.md`, `DESIGN.md`, `docs/CONTENT.md`, `docs/INTEGRATION.md` before editing. No other prompt is coming.

Impeccable mode: **Operate**. Dials 6 / 4 / 5. Scanable and precise, still fully in the darkroom world — an `Operate` surface is not permission to build a generic dashboard.

---

## You own

```
src/app/space/[id]/**
src/components/studio/**
```

## You never touch

`src/lib/**`, `src/app/page.tsx`, `src/app/start/**`, `src/app/g/**`, `src/app/booth/**`.

---

## Ask the human first

1. **Timeline shape.** Vertical film strip down one edge, or an alternating contact sheet? Both fit the world; the choice changes the whole screen. Show the trade-off and ask.
2. **What "feeling" looks like.** Each moment has an optional `feeling` word. Is it a quiet caption, a colored chip, or the loudest thing on the card? This is the emotional core of the timeline.
3. **Reminder wording.** "You haven't added anything in three weeks" can read as caring or as nagging. Draft two and ask.

Everything else — controls, spacing, transitions, internal components — is yours.

---

## Tasks

**1. Timeline (the hero of this lane)**

- Load with `loadSpace()` from `@/lib/storage`; order with `sortMoments`.
- Group by month using `groupByMonth` and `formatMonth`; every date through `@/lib/format`.
- Render all four moment kinds distinctly: **photo**, **video**, **text**, **voice** (show `formatDuration` and a static waveform — no real audio needed).
- Use `FilmFrame` with varied rotation. **Not a uniform card grid** — that is the single easiest way to make this look generic.
- The trip should read as a story when you scroll it. Dates, places, and feelings are the texture.

**2. Calendar**

- Same data, different lens. Month view; days with moments are marked; occasions from `space.occasions` are marked differently.
- Clicking a day reveals that day's moments.
- Switching timeline ↔ calendar must not feel like changing apps. Use `DUR.panel` and `EASE_OUT`.

**3. Add a moment (live on stage — must not fail)**

- A sheet or drawer, `DUR.sheet`, `EASE_OUT`, never from `scale(0)`.
- Fields: kind, date (default `todayIso()`), title, body, feeling, place, and a file input for photo/video.
- For media use `URL.createObjectURL` — no upload, no backend.
- Persist with `addMoment(space, moment)`; it returns the new Space for your state.
- The new moment must appear in **both** timeline and calendar with no reload.
- Real states: empty, invalid, and success. The presenter will do this in front of judges.

**4. Reminders — mock, but honest**

- "On this day", an upcoming occasion, and a quiet-week nudge, driven by `space.occasions` and moment dates.
- Presented as in-world chrome, not browser notifications. Nothing is scheduled server-side.

**5. Read as a gift**

- A clear action using `giftHref("anniversary")` from `@/lib/gift`. Also offer birthday and wedding.
- You **do not** build gift layout. You hand off via the URL — Lane D renders it.
- Also link `/booth`.

---

## Acceptance

- [ ] Timeline and calendar show the same 7 seeded moments
- [ ] All four moment kinds render distinctly
- [ ] Adding a photo + caption appears live in both views
- [ ] Dates match Lane D's gift page exactly (both use `@/lib/format`)
- [ ] Reminder chrome visible and honest
- [ ] `Read as a gift` reaches `/g/anniversary-demo`
- [ ] Usable at 390px; no horizontal scroll
- [ ] No motion over 300ms in this lane; no scroll hijack; no 3D
- [ ] `npx tsc --noEmit` clean

## If you finish early

Add a quiet reset control for rehearsal (`resetSpace()`), then polish the empty state for a brand-new Space. Do not build gift pages.
