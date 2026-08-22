# Lane B — Arrival

**You are Lane B.** You own the first ten seconds. If the landing feels generic, nothing the other three lanes build will recover it.

Prerequisites: read `AGENTS.md`, `PRODUCT.md`, `DESIGN.md`, `docs/CONTENT.md`, `docs/INTEGRATION.md` before editing. No other prompt is coming.

Impeccable mode: **Persuade** on `/`, **Operate** on `/start`. Dials 8 / 7 / 3.

---

## You own

```
src/app/page.tsx
src/app/start/**
src/app/space/new/**
src/components/arrival/**
```

## You never touch

`src/lib/**`, `src/app/globals.css`, `src/components/ui/**`, and anything under `space/[id]`, `g/`, or `booth/`.

---

## Ask the human first

1. **The hero line.** Draft two or three options in the `docs/CONTENT.md` voice and ask which lands. This is the single most emotional sentence in the product. Current placeholder: *"The feeling does not live in the camera roll."*
2. **How literal the hero visual should be** — an abstract darkroom atmosphere, or recognizable photo frames of the demo trip.
3. **Whether the R3F hero is worth the time** given the deadline. Propose a CSS-only fallback and let the human choose.

Everything else — layout, spacing, section order, component internals — is yours.

---

## Tasks

**1. `/` landing**

- First viewport establishes the world: umbra ground, a large filament field, Bodoni display line. No feature cards, no dashboard screenshot.
- One clear primary action: **Open the Chiang Mai Space** → `/space/demo`. Secondary: **Start a Space** → `/start`.
- Explain the product in the visitor's terms, not in feature bullets: photos scatter → the feeling gets lost → MomentUS keeps it in order → it can be sent as a gift.
- **One authored motion moment.** Suggested: a contact sheet of film frames that assembles on scroll, using `frameIn` + `stagger` from `@/lib/motion`. Not the same fade on every section.
- Lenis for smooth scroll, guarded by `prefersReducedMotion()`.
- Optional R3F: a slow dust or warm-light field behind the hero. Decorative only, must degrade to a CSS gradient. Ask first (see above).

**2. `/start` — choose the Space**

- Choose **circle**: couple / friends / family / other. Use `circleLabels` from `@/lib/mock-space`.
- Choose **mode**: secret gift vs shared memory place. Use `modeLabels`. Explain the difference in one line each — this is the idea that makes MomentUS not-a-couples-app, so it deserves real copy.
- Optional third step: name the Space, name the person.
- Finish → `/space/demo`. Persist via `saveSpace` if you want; the demo Space is what loads either way.
- This is `Operate` mode: quick and legible. Do not turn it into a five-screen wizard.

**3. Invite mock**

- A "share a join code" affordance that is obviously staged and does not call a backend.
- Keep it small. It is a supporting beat, not a feature.

**4. `/space/new`**

- Redirects to `/start`. Leave it as a redirect unless you have a reason.

---

## Acceptance

- [ ] `/` reads as a gift/memory product, not a SaaS template, at 390px and 1440px
- [ ] Primary action reaches `/space/demo` in one click
- [ ] `/start` lets a visitor pick circle + mode and reach the Space
- [ ] Exactly one signature motion sequence; sections do not all animate identically
- [ ] Lenis and any 3D disabled under `prefers-reduced-motion`
- [ ] All copy passes the `docs/CONTENT.md` yes/no table
- [ ] No hardcoded hex, no hand-written durations, no `<Inter>`
- [ ] `npx tsc --noEmit` clean

## If you finish early

Polish the hero's type scale and the transition into `/space/demo`. Do not start building the studio.
