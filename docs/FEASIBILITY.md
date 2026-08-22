# Later systems — feasible, not built this hour

Live demo is **frontend mock**. These are the real providers if we implement after the hackathon.

## Dual camera / photobooth

**Yes, it is real** with existing tools. Two people can appear on one page.

| Provider | What we’d use | Capture both faces into a still | Hackathon |
|----------|----------------|----------------------------------|-----------|
| **Daily.co Prebuilt** | `Daily.createFrame()` iframe | No (cross-origin). Switch to `createCallObject()` for canvas snapshot | Fastest embed |
| **Whereby** | `<whereby-embed>` | No in iframe; yes with Browser SDK `VideoView` | Fast UI |
| **LiveKit** | JS SDK + React components | Yes — best real booth (composite tracks) | Too much for 1 hour |
| **Jitsi** | External API iframe | No | Zero signup, flaky public server |

**This repo:** `/booth` is a **staged photobooth** (two video-shaped frames, shutter, toast “Saved to timeline”). Use `getUserMedia` on **one** local camera if a teammate has 20 minutes extra — still not remote two-phone.

## Gift drag-and-drop editor

| Tool | Verdict |
|------|---------|
| Template **slots** (React) | What we ship now |
| **PageHub** / **Craft.js** | Later layout DnD |
| **GrapesJS Studio / Unlayer** | Wrong product, paid |
| **IMG.LY CE.SDK** | Later photo/video edit inside a slot |

## Storage / auth / generation backend

| Need | Later |
|------|--------|
| Photos, voice, users | Supabase Auth + Storage |
| Long jobs (video, LLM) | Render **only if** Vercel time limits fail |
| Hosting the app + gift URLs | Stay on **Vercel** (`/g/[slug]`) — never one Vercel project per gift |

## Reminders

UI now. Later: Vercel Cron + email/push. Not required for demo.
