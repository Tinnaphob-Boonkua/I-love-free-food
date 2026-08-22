# Integration — how four branches become one demo

Read this before your first commit.

---

## 1. Ownership matrix

Disjoint by design. If two lanes both need a file, it belongs to Lane A.

| Path | Owner |
|------|-------|
| `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs` | **A** |
| `src/app/layout.tsx`, `src/app/globals.css`, `src/app/not-found.tsx` | **A** |
| `src/lib/**` | **A** |
| `src/components/ui/**`, `src/components/chrome/**` | **A** |
| `public/**` | **A** |
| `src/app/page.tsx`, `src/app/start/**`, `src/app/space/new/**` | **B** |
| `src/components/arrival/**` | **B** |
| `src/app/space/[id]/**` | **C** |
| `src/components/studio/**` | **C** |
| `src/app/g/**`, `src/app/booth/**` | **D** |
| `src/components/gift/**`, `src/components/booth/**` | **D** |
| `*.md`, `docs/**` | Whoever the doc names; ask before editing another lane's brief |

**Never** create a folder outside your lane. Need `src/components/shared/`? That is Lane A's call.

---

## 2. Shared API — exact signatures

These are stable. Lane A will not change them without telling everyone.

### `@/lib/mock-space`

```ts
type Circle = "couple" | "friends" | "family" | "other";
type SpaceMode = "secret" | "shared";
type MomentKind = "photo" | "video" | "text" | "voice";
type OccasionKind = "birthday" | "anniversary" | "wedding" | "thankyou";

type Moment = {
  id: string; occurredAt: string; kind: MomentKind;
  title: string; body: string;
  feeling?: string; place?: string; mediaUrl?: string; durationSec?: number;
};

type Occasion = { id: string; kind: OccasionKind; label: string; date: string; personId?: string };
type Person  = { id: string; name: string; role?: string };

type Space = {
  id: string; title: string; circle: Circle; mode: SpaceMode;
  people: Person[]; startedAt: string; moments: Moment[]; occasions: Occasion[];
};

demoSpace: Space              // seeded, id "demo", 7 moments, 3 occasions
sortMoments(moments): Moment[] // chronological, oldest first
circleLabels: Record<Circle, string>
modeLabels: Record<SpaceMode, string>
```

### `@/lib/storage` — client only

```ts
loadSpace(id?: string): Space            // never throws, falls back to demoSpace
saveSpace(space: Space): void
addMoment(space: Space, moment: Omit<Moment, "id">): Space   // returns the new Space
resetSpace(): Space
```

### `@/lib/format`

```ts
formatDay(iso): string          // "29 Dec 2024"
formatMonth(iso): string        // "December 2024"
formatMonthShort(iso): string   // "Dec"
daysBetween(fromIso, toIso): number
todayIso(): string
formatDuration(seconds): string // "0:14"
groupByMonth(items): [string, T[]][]
```

### `@/lib/motion`

```ts
EASE_OUT, EASE_IN_OUT, EASE_OUT_CSS
DUR: { press: .12, control: .18, panel: .22, sheet: .3, story: .9 }
STAGGER: 0.06
fadeUp, frameIn, stagger      // motion variants
inView: { once: true, amount: 0.35 }
prefersReducedMotion(): boolean
```

### `@/lib/gift` — the C ↔ D seam

```ts
type GiftKind = "birthday" | "anniversary" | "wedding" | "thankyou";
type GiftBeat = { id; dateLabel; title; body; feeling?; place?; mediaUrl?; kind };
type GiftPayload = {
  kind; slug; spaceTitle; headline; dedication;
  names: string[]; daysTogether: number; beats: GiftBeat[]; finale: string;
};

buildGift(space, kind): GiftPayload     // Lane D calls this
giftHref(kind, spaceId?): string        // Lane C links with this
giftSlugs, slugToKind, giftKinds
```

**Lane C never constructs slots. Lane D never reads studio state.** The payload is the whole conversation between them.

---

## 3. Route contract

| Route | Owner | Must link to |
|-------|-------|--------------|
| `/` | B | `/space/demo` (primary), `/start` (secondary) |
| `/start` | B | `/space/demo` after choosing circle + mode |
| `/space/demo` | C | `giftHref("anniversary")`, `/booth` |
| `/g/[slug]` | D | back to `/space/demo` |
| `/booth` | D | back to `/space/demo` |

Every page renders `<Wordmark />` linking home. Keep these links live even while your page is half-built — the click-through must never dead-end.

---

## 4. Merge protocol

1. Branch per lane: `lane-a`, `lane-b`, `lane-c`, `lane-d`.
2. **Lane A merges to `main` first**, and announces it. Everyone rebases on `main` before their own merge.
3. Then B, C, D in any order — their files do not overlap.
4. Before pushing: `npx tsc --noEmit` must pass for your files.
5. Never commit `node_modules`, `.next`, or `.env*`.
6. Never reformat, re-lint, or "clean up" a file you do not own. That is what creates conflicts.

A push to `main` auto-deploys to the owner's Vercel project. No Render or Supabase step exists.

---

## 5. Conflict rules

| Situation | What to do |
|-----------|-----------|
| You need a new field on `Moment` or `Space` | Ask Lane A. Do not edit `src/lib` |
| You need a new shared primitive | Ask Lane A |
| You need a package | Ask Lane A; it goes in `package.json` once |
| Two lanes want the same component | It belongs to Lane A, in `src/components/ui/` |
| A shared file has a bug and Lane A is unreachable | Report it, work around it locally, do not silently patch `src/lib` |

---

## 6. Integration smoke test

Run this after each merge. Every line must pass.

- [ ] `npm run dev` boots with no console errors
- [ ] `/` renders, primary action reaches `/space/demo`
- [ ] `/start` renders and reaches the Space
- [ ] `/space/demo` shows timeline **and** calendar of the same 7 moments
- [ ] Adding a moment shows it in both views without a reload
- [ ] `Read as a gift` opens `/g/anniversary-demo`
- [ ] All three gift slugs render: birthday, anniversary, wedding
- [ ] `/booth` renders and returns to the Space
- [ ] Every page is usable at **390px** wide
- [ ] Dates read identically on timeline, calendar, and gift
- [ ] `prefers-reduced-motion` kills smooth scroll and 3D
- [ ] `npx tsc --noEmit` is clean
