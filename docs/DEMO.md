# Live demo — the three minutes that matter

Every lane should know which of its screens is on stage, and in what order.

---

## The run

| # | Screen | Owner | What the presenter says | What must work |
|---|--------|-------|-------------------------|----------------|
| 0 | — | — | "Photos and videos of the people we love sit in a camera roll and stop meaning anything." | — |
| 1 | `/` | **B** | "MomentUS is a memory place. For anyone you love, not only couples." | The world lands in the first viewport. One click onward |
| 2 | `/space/demo` | **C** | "This is a friendship's timeline. A trip, then the months after." | Timeline reads like a story. Calendar shows the same days |
| 3 | `/space/demo` | **C** | "Add a moment right now." | Photo + caption appears live in both views |
| 4 | `/g/anniversary-demo` | **D** | "When the day comes, the same timeline is read as a gift you send." | Feels like a present, on a phone |
| 5 | `/booth` or gift customize | **D** | "Next: a photobooth, so far-apart people still make a moment together." | Honest mock, no broken camera prompt |

**Total: about three minutes.** Screens 1–4 are non-negotiable. Screen 5 is the "what's next" beat.

---

## Presenter safety

- Present at **390px** width (phone frame) if possible. The product is a phone product.
- Have `/g/anniversary-demo` open in a second tab in case generation is slow.
- If `localStorage` is dirty from rehearsal, the studio has a quiet reset.
- Do not click into anything not on this list. Half-built screens exist.

## Honesty on stage

If asked, the true answers are:

- The photobooth is staged; two-camera-on-one-page is real with Daily, Whereby, or LiveKit (`docs/FEASIBILITY.md`).
- Data is in the browser; Supabase would take it to real storage.
- The demo Space is synthetic — Nok, Pim, and June are invented.

Never claim users, revenue, or a launch. The craft is the pitch.
