# Design — the one visual world

All four lanes inherit this. **Do not invent a second palette, a second font, or a second button.**
If something you need is not here, ask the human rather than improvising a new visual rule.

---

## Design read

Reading this as: a **premium consumer gift and memory place** for someone who misses a person, with a **darkroom / contact-sheet** language.

It is deliberately **not**: Linear-style SaaS minimalism, purple AI mesh gradients, cream-and-terracotta editorial, or a photo-grid social app.

### Use scene

Night. A phone in one hand, or a laptop under a warm lamp. It should feel like a contact sheet on a wooden table — physical, dim, warm — not like opening a productivity tool.

### Taste dials (design-taste-frontend)

| Surface | VARIANCE | MOTION | DENSITY |
|---------|----------|--------|---------|
| Landing `/`, gift `/g/*`, booth | 8 | 7 | 3 |
| Studio `/space/*`, onboarding `/start` | 6 | 4 | 5 |

Already rolled. Do not re-roll them per lane.

---

## Color

Defined in `src/app/globals.css`. Use the Tailwind token, never the hex.

| Token | Hex | Use |
|-------|-----|-----|
| `umbra` | `#140f0c` | Page ground everywhere |
| `umbra-2` | `#1e1712` | Raised surfaces: frames, sheets, inputs |
| `filament` | `#d4894a` | The committed field color. Primary actions, large warm regions |
| `filament-hot` | `#f0b27a` | Hover on filament only |
| `halide` | `#efe6d6` | Headlines, primary text |
| `silver` | `#c4b8a8` | Secondary text, frame borders at 30–40% opacity |
| `danger` | `#c45c4a` | Destructive, errors. Rare |

**Filament is a field, not a chip.** On landing and gift finale it should own a large region. A 4px accent border is a waste of it.

There is no light theme. Do not add one.

---

## Type

| Role | Face | Rules |
|------|------|-------|
| Display | **Bodoni Moda** — class `display` or `font-display` | Tracking `-0.03em`. Weight 500. Big: `clamp(3rem, 10vw, 8rem)` for hero lines |
| UI / body | **Sora** — default on `body` | Weight 300 for long copy, 400–500 for controls |

- Body measure **65–75ch** on any reading surface.
- **No kicker/eyebrow labels** above headings. The heading carries itself.
- No monospace unless it is genuinely data.
- No section numbers (01 / 02 / 03).

---

## Spacing, radius, elevation

Shared so four lanes produce one rhythm.

| Thing | Value |
|-------|-------|
| Page padding | `px-6 py-10` mobile, `px-16 py-16` desktop (`md:`) |
| Section gap, story surfaces | `mt-24` to `mt-32` |
| Section gap, studio | `mt-12` to `mt-16` |
| Related items | `gap-3` |
| Unrelated groups | `gap-8` or more |
| Heading spacing | More space **above** a heading than below it |
| Radius | `14px` controls, `12–16px` surfaces. Pills only for small chips |
| Elevation | Declare **once**: a border **or** a shadow, never both on the same element |
| Frame shadow | `shadow-[0_18px_40px_rgba(0,0,0,0.35)]` |

---

## Motion

Tokens live in `src/lib/motion.ts`. Import them; do not type durations by hand.

| Context | Duration | Easing |
|---------|----------|--------|
| Button press | `DUR.press` 120ms | `EASE_OUT` |
| Chip, tooltip | `DUR.control` 180ms | `EASE_OUT` |
| Tab, popover | `DUR.panel` 220ms | `EASE_OUT` |
| Sheet, drawer | `DUR.sheet` 300ms | `EASE_OUT` |
| Story beat (landing/gift only) | `DUR.story` 900ms | `EASE_OUT` |

Rules:

- **Never `ease-in`.** Never `transition: all`. Never animate from `scale(0)` — 0.96 is the floor.
- Buttons get `active:scale-[0.97]`.
- **One authored motion moment per surface.** Not the same fade on every section.
- Studio is `Operate`: motion is feedback, not decoration. No scroll hijacking, no 3D.
- Landing and gift may use **Lenis** smooth scroll and scroll-driven reveals.
- **R3F / three** only in two places: the landing hero atmosphere and the gift finale. Nowhere else.
- Everything decorative must be disabled under `prefers-reduced-motion` — use `prefersReducedMotion()` from `@/lib/motion`.
- **Do not add GSAP.** `motion` is the only orchestration library.

---

## Photography and media

- Photos sit in **uneven film frames** (`FilmFrame`, rotated 1–3°), never a uniform rounded-card grid.
- No stock-looking generic couple photos. Placeholder frames with real captions beat bad stock.
- Any placeholder must be recognizable as demo material — see `docs/CONTENT.md`.
- Icons are drawn SVG, one consistent stroke. **No emoji as icons.**

---

## Banned unless this file is amended

- Inter, Geist, default shadcn appearance
- Purple/blue AI gradients; glassmorphism as decoration
- Three equal feature cards with icons as a page structure
- A dashboard sidebar as the first impression
- Gradient text
- Nested cards
- `feTurbulence` grain overlays and sketch-style SVG illustration
- Hard offset shadows (`4px 4px 0`)
- Progress rings and sparklines standing in for content

---

## Component inventory

Lane A owns `src/components/ui/**` and `src/components/chrome/**`. Other lanes **compose** them.

| Component | Import | Props |
|-----------|--------|-------|
| `FilmButton` | `@/components/ui/film-button` | `href?`, `tone?: "filament" \| "ghost"`, plus button attrs |
| `FilmFrame` | `@/components/ui/film-frame` | `photo?`, `alt?`, `rotate?`, `caption?`, `aspect?`, children |
| `Chip` | `@/components/ui/chip` | `tone?: "quiet" \| "filament" \| "active"`, `onClick?`, `pressed?` |
| `Sheet` | `@/components/ui/sheet` | native `<dialog>`: `open`, `onClose`, `title`, `description?`, `footer?` |
| `Wordmark` | `@/components/chrome/wordmark` | `href?` |
| `RoomLight` | `@/components/chrome/room-light` | already in `layout.tsx` — do not add a second one |

Need another primitive that two lanes would use? Ask Lane A. Need something only your lane uses? Build it inside your own folder.

---

## Impeccable mode per route

| Route | Mode | Means |
|-------|------|-------|
| `/` | Persuade | Earn the click. The world sells it |
| `/start` | Operate | Fast, clear onboarding, still in-world |
| `/space/[id]` | Operate | Scanable. Task beats expression |
| `/g/[slug]` | Experience | The artifact leads. Interface recedes |
| `/booth` | Experience | Staged theater, honest about being a mock |
