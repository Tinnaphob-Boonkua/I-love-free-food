# MomentUS — Moment of Us

A memory place for anyone you love. Add moments; they land on a timeline and a calendar. When the day comes, the same timeline is **read as a gift** you can send.

Not a couple-only journal. Not a website builder. For partners, friends, family, or a whole group.

> This round is a **frontend mockup for a live demo**: `localStorage` only, no backend, photobooth staged. Real-system feasibility is documented in [`docs/FEASIBILITY.md`](docs/FEASIBILITY.md).

## Run it

```bash
npm install
npm run dev
```

Next.js App Router · React 19 · Tailwind v4 · `motion` · Lenis · React Three Fiber. Deploys to Vercel on push to `main`.

## For agents and teammates

**Start at [`AGENTS.md`](AGENTS.md).** It routes you to your lane and everything you need to read.

| Doc | What it settles |
|-----|-----------------|
| [`PRODUCT.md`](PRODUCT.md) | Users, purpose, scope |
| [`DESIGN.md`](DESIGN.md) | The one visual world: color, type, spacing, motion, bans |
| [`docs/CONTENT.md`](docs/CONTENT.md) | Voice and fixed strings |
| [`docs/INTEGRATION.md`](docs/INTEGRATION.md) | Ownership matrix, shared APIs, merge protocol |
| [`docs/STACK.md`](docs/STACK.md) | Dependencies, and what not to install |
| [`docs/DEMO.md`](docs/DEMO.md) | The three-minute run |
| [`docs/lanes/`](docs/lanes/) | Four parallel work briefs |

## Routes

| Route | What |
|-------|------|
| `/` | Landing |
| `/start` | Choose circle and mode |
| `/space/demo` | Timeline, calendar, add a moment |
| `/g/[slug]` | Gift reading: birthday, anniversary, wedding |
| `/booth` | Photobooth (staged) |
