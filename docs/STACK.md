# Stack

Install this, nothing else. Lane A owns `package.json`; other lanes request a dependency rather than adding one.

## Runtime

- **Next.js 15** App Router, TypeScript, `src/` directory
- **React 19**
- **Tailwind CSS v4** — `@import "tailwindcss"` plus `@theme inline` in `src/app/globals.css`
- Deploy: **Vercel**, auto on push to `main` from the repo owner's project. No Render, no Supabase this round

## Dependencies

| Package | Use | Lanes |
|---------|-----|-------|
| `next` `react` `react-dom` | App | all |
| `motion` | All animation and orchestration | all |
| `lenis` | Smooth scroll on landing and gift only | B, D |
| `three` `@react-three/fiber` `@react-three/drei` | Decorative WebGL: landing hero, gift finale | B, D |

## Do not install

`gsap` (we use `motion`) · `framer-motion` (superseded by `motion`) · `shadcn/ui` · `grapesjs` · `@craftjs/core` · `@pagehub/sdk` · IMG.LY · `@daily-co/daily-js` · `livekit-client` · `@supabase/supabase-js` · any icon pack before asking Lane A · any date library — `src/lib/format.ts` covers what we need.

## Fonts

`next/font/google`: **Bodoni Moda** (display) and **Sora** (UI). No other font packages.

## Data

In-memory plus `localStorage` under the key `momentus-demo-v1`. Schema and helpers: `src/lib/mock-space.ts` and `src/lib/storage.ts`.

## Scripts

```bash
npm run dev     # next dev --turbopack
npm run build   # next build
npx tsc --noEmit  # must pass before you push
```

## Agent skills are not npm packages

`impeccable`, `design-taste-frontend`, and `emil-design-eng` are Cursor/Claude skills on each teammate's machine. They are never committed and never installed here. Point your agent at `AGENTS.md`.
