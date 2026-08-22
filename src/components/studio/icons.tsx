/**
 * Lane C studio icons. One consistent stroke, currentColor, no emoji.
 * Kept intentionally small — the timeline is the star, icons are quiet.
 */
import type { SVGProps } from "react";

function Base({ children, ...rest }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {children}
    </svg>
  );
}

export function PlusIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <path d="M12 5v14M5 12h14" />
    </Base>
  );
}

export function CloseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </Base>
  );
}

export function PlayIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props} fill="currentColor" stroke="none">
      <path d="M8 5.5v13l11-6.5-11-6.5Z" />
    </Base>
  );
}

export function MicIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M6 11a6 6 0 0 0 12 0M12 17v4M9 21h6" />
    </Base>
  );
}

export function TextIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <path d="M5 6h14M5 12h14M5 18h9" />
    </Base>
  );
}

export function CameraIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" />
      <circle cx="12" cy="13" r="3.2" />
    </Base>
  );
}

export function FilmIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="M7 5v14M17 5v14M3 9h4M3 15h4M17 9h4M17 15h4" />
    </Base>
  );
}

export function ChevronLeft(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <path d="M14 6l-6 6 6 6" />
    </Base>
  );
}

export function ChevronRight(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <path d="M10 6l6 6-6 6" />
    </Base>
  );
}

export function GiftIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <path d="M4 12v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-8M3 8h18v4H3zM12 8v13" />
      <path d="M12 8S10.5 4 8.5 4a2 2 0 0 0 0 4H12ZM12 8s1.5-4 3.5-4a2 2 0 0 1 0 4H12Z" />
    </Base>
  );
}
