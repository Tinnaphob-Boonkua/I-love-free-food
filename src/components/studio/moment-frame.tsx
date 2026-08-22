import { formatDay, formatDuration } from "@/lib/format";
import type { Moment } from "@/lib/mock-space";
import { FilmFrame } from "@/components/ui/film-frame";
import { Waveform } from "./waveform";
import { CameraIcon, FilmIcon, MicIcon, PlayIcon } from "./icons";

const kindLabel: Record<Moment["kind"], string> = {
  photo: "Photo",
  video: "Video",
  text: "Note",
  voice: "Voice",
};

/** A small drawn tag that sits on the media band, so kinds read at a glance. */
function KindTag({ kind, durationSec }: { kind: Moment["kind"]; durationSec?: number }) {
  const Icon = kind === "photo" ? CameraIcon : kind === "video" ? FilmIcon : MicIcon;
  const label =
    kind === "voice" && typeof durationSec === "number"
      ? `${kindLabel.voice} · ${formatDuration(durationSec)}`
      : kindLabel[kind];
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-umbra/80 px-2.5 py-1 text-[0.7rem] font-medium tracking-wide text-silver">
      <Icon className="h-3.5 w-3.5" />
      {label}
    </span>
  );
}

/** The visual band at the top of a photo/video/voice frame. */
function MediaBand({ moment }: { moment: Moment }) {
  const { kind, mediaUrl, title, durationSec } = moment;

  if (kind === "voice") {
    return (
      <div className="relative h-40 bg-umbra px-5 py-6">
        <Waveform seed={moment.id} />
        <span className="absolute left-3 top-3">
          <KindTag kind="voice" durationSec={durationSec} />
        </span>
      </div>
    );
  }

  return (
    <div className="relative h-56 bg-umbra">
      {mediaUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={mediaUrl} alt={title} className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          {/* Honest empty media — real photos land via Lane A's manifest */}
          <div className="flex flex-col items-center gap-2 text-silver/50">
            {kind === "video" ? (
              <FilmIcon className="h-7 w-7" />
            ) : (
              <CameraIcon className="h-7 w-7" />
            )}
            <span className="text-[0.7rem] tracking-[0.18em] uppercase">
              {kind === "video" ? "Clip" : "Frame"}
            </span>
          </div>
        </div>
      )}

      {kind === "video" ? (
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-halide/70 bg-umbra/55 text-halide">
            <PlayIcon className="ml-0.5 h-6 w-6" />
          </span>
        </span>
      ) : null}

      <span className="absolute left-3 top-3">
        <KindTag kind={kind} durationSec={durationSec} />
      </span>
    </div>
  );
}

export function MomentFrame({ moment, rotate }: { moment: Moment; rotate?: string }) {
  const isText = moment.kind === "text";

  return (
    <FilmFrame rotate={rotate}>
      {isText ? (
        <div className="relative px-6 py-6">
          <span className="absolute left-3 top-3">
            <KindTag kind="text" />
          </span>
          {/* Text moments lead with the words — a written note, not a picture */}
          <p className="display mt-6 border-l border-filament/50 pl-4 text-2xl leading-snug text-halide">
            {moment.body}
          </p>
        </div>
      ) : (
        <MediaBand moment={moment} />
      )}

      <div className="px-5 pb-5 pt-4">
        <div className="flex items-center justify-between gap-3 text-xs">
          <span className="text-filament">{formatDay(moment.occurredAt)}</span>
          {moment.place ? <span className="text-silver/80">{moment.place}</span> : null}
        </div>

        <h3 className="display mt-2 text-2xl leading-tight text-halide">{moment.title}</h3>

        {moment.feeling ? (
          <p className="mt-1.5 text-xs tracking-[0.14em] text-filament/85 lowercase">
            {moment.feeling}
          </p>
        ) : null}

        {!isText ? (
          <p className="mt-3 max-w-[62ch] text-sm font-light leading-relaxed text-silver">
            {moment.body}
          </p>
        ) : null}
      </div>
    </FilmFrame>
  );
}
