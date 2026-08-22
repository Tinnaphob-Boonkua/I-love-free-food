# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

delegated: Next.js App Router (TypeScript) on Vercel. Chosen because the GitHub repo already auto-deploys to the owner’s Vercel project. This hackathon build is **frontend / UX mockup only** — no Render, no Supabase, no real photobooth WebRTC.

## Users

People who love someone — partner, family, friendship, or a mixed group — and who lose the *feeling* of shared time because photos/videos sit disconnected in camera rolls. They are busy; they forget to save; later the pieces do not fit.

Two usage modes (same product):

- **Secret gift:** one person builds a Space for someone else and never invites them until a link is sent.
- **Shared memory place:** two or more people add to the same Space.

## Product Purpose

**MomentUS** (“Moment of Us”) is a memory place that turns scattered moments into one timeline, then can turn that timeline into a digital gift (birthday, anniversary, wedding, thank-you).

Success for the live demo: a judge can open a Space, add a moment, see it on timeline and calendar, then open a cinematic gift page that feels handmade — not a generic SaaS dashboard.

## Positioning

Not a website builder, not a couple-only journal, not a guest photo dump.

Mechanism: **one Space holds the feeling in order; the gift is a reading of that Space**, not a separate Canva file.

Name collision (research): Momentus (momentusmemories.com) and Play Store MomentUs already exist. Keep the wordmark **MomentUS** + line **Moment of Us** for the demo; do not claim trademark.

## Operating Context

- Live demo ~minutes on a laptop/phone; GitHub → Vercel auto-deploy.
- Synthetic demo Space ships in-repo (`src/lib/mock-space.ts`). Label demo content as demo; do not invent fake customers, press, or pricing.
- Four teammates work in parallel via Cursor agents. File ownership is in `docs/lanes/`.

## Capabilities and Constraints

**In the mockup (must exist in UI now):**

- Space type: couple / friends / family / other
- Mode: secret gift vs shared
- Add moment: photo, video, text, voice (voice = UI + fake waveform; no real STT)
- Timeline + calendar of the same data
- Reminders as UI (banners / calendar marks) — no push backend
- Generate gift from timeline (birthday, anniversary, wedding, thank-you)
- Light customize: replace slot media / edit copy
- Photobooth as **staged UX** (shutter, dual frames, “saved to timeline”) — not live WebRTC
- Invite / connect as **staged UX**

**Out of scope for implementation (document only, see `docs/FEASIBILITY.md`):**

- Real two-camera embed, Daily/Whereby/LiveKit
- GrapesJS / IMG.LY full editors
- Auth, payments, real storage

## Brand Commitments

- Name: **MomentUS**
- Line: **Moment of Us**
- Voice: intimate, specific, unhurried. Never “unlock productivity.” Never “AI-powered memories” as the headline.
- Binding craft skills for every agent: **impeccable**, **design-taste-frontend** (taste), **emil-design-eng** (motion).

## Evidence on Hand

- No real user photos in git. Use the bundled demo media under `public/demo/` or CSS/generated stills. Mark synthetic.
- Competitor/research notes in conversation; do not paste as testimonials.

## Product Principles

1. The timeline is the product; generation is a reading of it.
2. Works for any love, not only romance — mode is a first-class choice.
3. Demo quality is craft, not backend completeness.
4. Optional/later features appear as honest mock UI, not hidden.
5. One visual world across marketing, studio, and gift — not three templates.

## Accessibility & Inclusion

- `prefers-reduced-motion` disables Lenis smooth-scroll, R3F decorative loops, and long scrollytelling hijacks; keep opacity/transform UI under 300ms or skip.
- Body text contrast ≥ 4.5:1 on all surfaces.
- Gift pages must be usable on a phone in one hand.
