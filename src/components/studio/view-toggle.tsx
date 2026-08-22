"use client";

export type StudioView = "timeline" | "calendar";

const TABS: { id: StudioView; label: string }[] = [
  { id: "timeline", label: "Timeline" },
  { id: "calendar", label: "Calendar" },
];

export function ViewToggle({
  view,
  onChange,
}: {
  view: StudioView;
  onChange: (v: StudioView) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="Timeline or calendar"
      className="inline-flex gap-1 rounded-[14px] border border-silver/20 bg-umbra-2 p-1"
    >
      {TABS.map(({ id, label }) => {
        const active = view === id;
        return (
          <button
            key={id}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(id)}
            className={[
              "rounded-[10px] px-4 py-2 text-sm transition-colors duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-filament focus-visible:ring-offset-2 focus-visible:ring-offset-umbra",
              active ? "bg-filament text-umbra" : "text-silver hover:text-halide",
            ].join(" ")}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
